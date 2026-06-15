This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Google Drive setup for file uploads

The submit form uploads files to Google Drive through the API route in `app/api/submit/route.ts`.

### 1. Create a Google Cloud service account
1. Open Google Cloud Console.
2. Create or select a project.
3. Enable the Google Drive API.
4. Go to IAM & Admin > Service Accounts.
5. Create a service account and copy the generated email address.

### 2. Generate a private key
1. In the service account, open Keys.
2. Add Key > Create new key > JSON.
3. Download the JSON file.
4. Copy:
   - `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `private_key` → `GOOGLE_PRIVATE_KEY`

### 3. Share the target folder
1. Open the shared folder:
   https://drive.google.com/drive/folders/1M2oXDMFiXNNapFtUdbNimtuGZeWWYyze
2. Click Share.
3. Add the service account email as Editor.
4. Save permissions.

### 4. Add the environment variables
You can choose one of these options:

A. Use separate variables:
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_PRIVATE_KEY`

B. Use the downloaded JSON directly:
- `GOOGLE_SERVICE_ACCOUNT_JSON="{...conteúdo completo do arquivo JSON...}"`

C. Point to the JSON file path:
- `GOOGLE_APPLICATION_CREDENTIALS="./service-account.json"`

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

Then set:
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_PRIVATE_KEY`
- `GOOGLE_DRIVE_FOLDER_ID` (optional, the shared folder ID is already used as fallback)

### 5. Run the app
```bash
npm run dev
```

If the credentials are missing, the submit route will return a clear error telling you to configure them.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Add the Drive credentials in Vercel
1. Open your Vercel project.
2. Go to Settings → Environment Variables.
3. Add these variables for Production (and Preview if you want to test there too):
   - `GOOGLE_SERVICE_ACCOUNT_JSON` → paste the full content of the downloaded JSON file.
   - `GOOGLE_DRIVE_FOLDER_ID` → use `1M2oXDMFiXNNapFtUdbNimtuGZeWWYyze` or your own folder ID.
4. Save each variable.
5. Go to Deployments → select the latest deployment → click Redeploy.

If you prefer separate variables instead of `GOOGLE_SERVICE_ACCOUNT_JSON`, you can use:
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_PRIVATE_KEY`

The app will use the JSON or the separate variables automatically.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
