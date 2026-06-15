import { Suspense } from "react";
import SubmitClient from "./SubmitClient";

export default function SubmitPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-black text-white px-6 py-20">Carregando...</main>}>
      <SubmitClient />
    </Suspense>
  );
}
