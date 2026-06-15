import { readFileSync } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { Readable } from "stream";
import { google } from "googleapis";
import { createClient } from "@supabase/supabase-js";

function normalizePrivateKey(value: string) {
  return value.replace(/\\r\\n/g, "\n").replace(/\\n/g, "\n");
}

function parseServiceAccountCredentials(raw: string) {
  try {
    const parsed = JSON.parse(raw) as {
      client_email?: string;
      private_key?: string;
    };

    return {
      client_email: parsed.client_email || "",
      private_key: parsed.private_key ? normalizePrivateKey(parsed.private_key) : "",
    };
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const whatsapp = String(formData.get("whatsapp") || "");
    const project = String(formData.get("project") || "");
    const serviceType = String(formData.get("serviceType") || "");
    const notes = String(formData.get("notes") || "");
    const trackCount = Number(formData.get("trackCount") || 0);
    const files = Array.from(formData.getAll("files")).filter(
      (item): item is File => item instanceof File && item.size > 0
    );

    if (!email.trim() && !whatsapp.trim()) {
      return NextResponse.json(
        { error: "Preencha pelo menos um dos campos E-mail ou WhatsApp." },
        { status: 400 }
      );
    }

    if (!files.length) {
      return NextResponse.json(
        { error: "Selecione pelo menos um arquivo para envio." },
        { status: 400 }
      );
    }

    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY ? normalizePrivateKey(process.env.GOOGLE_PRIVATE_KEY) : "";
    const rawCredentials = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

    let credentials: { client_email?: string; private_key?: string } | null = null;

    if (serviceAccountEmail && privateKey) {
      credentials = { client_email: serviceAccountEmail, private_key: privateKey };
    } else if (rawCredentials) {
      credentials = parseServiceAccountCredentials(rawCredentials);
    } else if (credentialsPath) {
      try {
        const resolvedPath = path.resolve(process.cwd(), credentialsPath);
        const fileContents = readFileSync(resolvedPath, "utf8");
        credentials = parseServiceAccountCredentials(fileContents);
      } catch {
        credentials = null;
      }
    }

    const rawFolderId =
      process.env.GOOGLE_DRIVE_FOLDER_ID ||
      "1M2oXDMFiXNNapFtUdbNimtuGZeWWYyze";
    const folderId = rawFolderId.includes("drive.google.com/drive/folders/")
      ? rawFolderId.split("/folders/")[1]?.split("?")[0] || rawFolderId
      : rawFolderId;

    if (!credentials?.client_email || !credentials.private_key || !folderId) {
      return NextResponse.json(
        {
          error:
            "Credenciais do Google Drive ainda não estão configuradas no ambiente da hospedagem. Verifique GOOGLE_SERVICE_ACCOUNT_JSON ou GOOGLE_SERVICE_ACCOUNT_EMAIL + GOOGLE_PRIVATE_KEY, e faça um redeploy após salvar as variáveis no Vercel.",
        },
        { status: 500 }
      );
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: credentials.client_email,
        private_key: credentials.private_key,
      },
      scopes: ["https://www.googleapis.com/auth/drive"],
    });

    const drive = google.drive({ version: "v3", auth });

    const uploadedFiles = [] as Array<{ name: string; fileId: string; webViewLink?: string | null }>;

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const response = await drive.files.create({
        requestBody: {
          name: file.name,
          parents: [folderId],
        },
        media: {
          mimeType: file.type || "application/octet-stream",
          body: Readable.from(buffer),
        },
        fields: "id,name,webViewLink",
      });

      uploadedFiles.push({
        name: response.data.name || file.name,
        fileId: response.data.id || "",
        webViewLink: response.data.webViewLink,
      });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Credenciais do Supabase ainda não estão configuradas." },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false },
    });

    const { error } = await supabase.from("project_submissions").insert([
      {
        name,
        email,
        whatsapp,
        project,
        service_type: serviceType,
        notes,
        track_count: trackCount,
        file_count: uploadedFiles.length,
        uploaded_files: uploadedFiles,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, files: uploadedFiles });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro ao processar envio.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
