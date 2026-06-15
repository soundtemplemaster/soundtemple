"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SubmitClient() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") === "en" ? "en" : "pt";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [project, setProject] = useState("");
  const [serviceType, setServiceType] = useState("Stereo Mastering");
  const [notes, setNotes] = useState("");
  const [trackCount, setTrackCount] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const copy = {
    pt: {
      title: "Enviar Projeto",
      subtitle: "Envie suas músicas para masterização profissional.",
      notice: "Preencha pelo menos um dos campos abaixo — e-mail ou WhatsApp — para receber o link de download quando seus arquivos estiverem prontos.",
      name: "Nome",
      namePlaceholder: "Seu nome",
      email: "E-mail",
      emailPlaceholder: "seu@email.com",
      whatsapp: "WhatsApp",
      whatsappPlaceholder: "+55 (11) 99999-9999",
      project: "Artista / Projeto",
      projectPlaceholder: "Nome do artista ou projeto",
      service: "Tipo de Serviço",
      serviceStereo: "Stereo Mastering",
      serviceStem: "Stem Mastering",
      uploadLabel: "Upload das Tracks / Stems",
      uploadHint: "WAV, AIFF ou ZIP. Você pode selecionar vários arquivos.",
      deliveryTitle: "Formato de Entrega",
      deliveryText: "Escolha até 2 formatos de entrega inclusos. Formatos adicionais serão calculados automaticamente.",
      wav24: "WAV 24-bit",
      wav16: "WAV 16-bit",
      mp3: "MP3 320kbps",
      quantity: "Quantidade de músicas:",
      quantityValue: "Será calculada automaticamente",
      estimated: "Valor estimado:",
      estimatedValue: "Será calculado automaticamente",
      notes: "Observações",
      notesPlaceholder: "Referências, instruções, links privados, etc.",
      submitBtn: "Enviar Projeto",
    },
    en: {
      title: "Send Project",
      subtitle: "Send your tracks for professional mastering.",
      notice: "Fill at least one of the fields below — email or WhatsApp — so you can be notified with the download link when your files are ready.",
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "you@email.com",
      whatsapp: "WhatsApp",
      whatsappPlaceholder: "+1 (555) 123-4567",
      project: "Artist / Project",
      projectPlaceholder: "Artist or project name",
      service: "Service Type",
      serviceStereo: "Stereo Mastering",
      serviceStem: "Stem Mastering",
      uploadLabel: "Upload Tracks / Stems",
      uploadHint: "WAV, AIFF or ZIP. You can select multiple files.",
      deliveryTitle: "Delivery Format",
      deliveryText: "Choose up to 2 included delivery formats. Additional formats will be calculated automatically.",
      wav24: "WAV 24-bit",
      wav16: "WAV 16-bit",
      mp3: "MP3 320kbps",
      quantity: "Number of tracks:",
      quantityValue: "Will be calculated automatically",
      estimated: "Estimated value:",
      estimatedValue: "Will be calculated automatically",
      notes: "Notes",
      notesPlaceholder: "References, instructions, private links, etc.",
      submitBtn: "Send Project",
    },
  };

  const t = copy[lang];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() && !whatsapp.trim()) {
      setErrorMessage(
        lang === "en"
          ? "Please fill in at least one of Email or WhatsApp to receive the download link."
          : "Preencha pelo menos um dos campos E-mail ou WhatsApp para receber o link de download."
      );
      setSuccessMessage("");
      return;
    }

    if (!files.length) {
      setErrorMessage(lang === "en" ? "Select at least one file to upload." : "Selecione pelo menos um arquivo para envio.");
      setSuccessMessage("");
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("whatsapp", whatsapp);
      formData.append("project", project);
      formData.append("serviceType", serviceType);
      formData.append("notes", notes);
      formData.append("trackCount", String(trackCount || files.length));

      files.forEach((file) => formData.append("files", file));

      const response = await fetch("/api/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || (lang === "en" ? "Submission failed." : "Falha ao enviar o projeto."));
      }

      setSuccessMessage(lang === "en" ? "Project sent successfully. We will contact you soon." : "Projeto enviado com sucesso. Em breve entraremos em contato.");
      setName("");
      setEmail("");
      setWhatsapp("");
      setProject("");
      setServiceType("Stereo Mastering");
      setNotes("");
      setFiles([]);
      setTrackCount(0);
      (event.currentTarget as HTMLFormElement).reset();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : (lang === "en" ? "Unexpected submission error." : "Erro inesperado ao enviar."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-4">{t.title}</h1>
        <p className="text-zinc-400 text-center mb-12">{t.subtitle}</p>
        <p className="text-sm text-red-200 text-center mb-6">{t.notice}</p>

        <div className="bg-zinc-900/70 border border-zinc-800 rounded-xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 text-zinc-300">{t.name}</label>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder={t.namePlaceholder}
                className="w-full bg-black border border-zinc-700 rounded-md p-3"
              />
            </div>

            <div>
              <label className="block mb-2 text-zinc-300">{t.email}</label>
              <input
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (errorMessage) setErrorMessage("");
                }}
                placeholder={t.emailPlaceholder}
                className="w-full bg-black border border-zinc-700 rounded-md p-3"
              />
            </div>

            <div>
              <label className="block mb-2 text-zinc-300">{t.whatsapp}</label>
              <input
                type="text"
                value={whatsapp}
                onChange={(event) => {
                  setWhatsapp(event.target.value);
                  if (errorMessage) setErrorMessage("");
                }}
                placeholder={t.whatsappPlaceholder}
                className="w-full bg-black border border-zinc-700 rounded-md p-3"
              />
            </div>

            <div>
              <label className="block mb-2 text-zinc-300">{t.project}</label>
              <input
                type="text"
                value={project}
                onChange={(event) => setProject(event.target.value)}
                placeholder={t.projectPlaceholder}
                className="w-full bg-black border border-zinc-700 rounded-md p-3"
              />
            </div>

            <div>
              <label className="block mb-2 text-zinc-300">{t.service}</label>
              <select
                value={serviceType}
                onChange={(event) => setServiceType(event.target.value)}
                className="w-full bg-black border border-zinc-700 rounded-md p-3"
              >
                <option>{t.serviceStereo}</option>
                <option>{t.serviceStem}</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-zinc-300">{t.uploadLabel}</label>
              <input
                type="file"
                multiple
                onChange={(event) => {
                  const selectedFiles = event.target.files ? Array.from(event.target.files) : [];
                  setFiles(selectedFiles);
                  setTrackCount(selectedFiles.length || 0);
                }}
                className="w-full bg-black border border-zinc-700 rounded-md p-3"
              />
              <p className="text-zinc-500 text-sm mt-2">{t.uploadHint}</p>
            </div>

            <div className="bg-black border border-zinc-800 rounded-md p-5">
              <h3 className="font-semibold text-white mb-2">{t.deliveryTitle}</h3>
              <p className="text-zinc-400 text-sm mb-4">{t.deliveryText}</p>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" /><span>{t.wav24}</span></label>
                <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" /><span>{t.wav16}</span></label>
                <label className="flex items-center gap-3 cursor-pointer"><input type="checkbox" /><span>{t.mp3}</span></label>
              </div>
            </div>

            <div className="bg-black border border-zinc-800 rounded-md p-4">
              <p className="text-zinc-400 mb-3">{t.quantity}</p>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setTrackCount((prev) => Math.max(0, prev - 1))} className="h-10 w-10 rounded-md border border-zinc-700 bg-zinc-950 text-xl text-zinc-100 hover:border-red-500 hover:text-red-300" aria-label="Decrease track count">−</button>
                <input
                  type="number"
                  min="0"
                  value={trackCount}
                  onChange={(event) => setTrackCount(Number(event.target.value) || 0)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-md p-3 text-center text-xl font-semibold text-white outline-none focus:border-red-500"
                />
                <button type="button" onClick={() => setTrackCount((prev) => prev + 1)} className="h-10 w-10 rounded-md border border-zinc-700 bg-zinc-950 text-xl text-zinc-100 hover:border-red-500 hover:text-red-300" aria-label="Increase track count">+</button>
              </div>
              <p className="text-zinc-500 text-sm mt-2">{trackCount > 0 ? `${trackCount} ${lang === "en" ? "tracks selected" : "músicas selecionadas"}` : t.quantityValue}</p>
            </div>

            <div className="bg-black border border-zinc-800 rounded-md p-4">
              <p className="text-zinc-400">{t.estimated}</p>
              <p className="text-3xl font-bold text-red-500 mt-2">{t.estimatedValue}</p>
            </div>

            <div>
              <label className="block mb-2 text-zinc-300">{t.notes}</label>
              <textarea
                rows={6}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder={t.notesPlaceholder}
                className="w-full bg-black border border-zinc-700 rounded-md p-3"
              />
            </div>

            {errorMessage && <p className="text-sm text-red-300">{errorMessage}</p>}
            {successMessage && <p className="text-sm text-emerald-300">{successMessage}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-b from-red-500 to-red-800 border border-red-400 shadow-[0_0_20px_rgba(255,0,0,0.35)] p-4 rounded-md font-bold hover:scale-[1.01] transition disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? (lang === "en" ? "Sending..." : "Enviando...") : t.submitBtn}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
