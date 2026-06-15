"use client";

import Link from "next/link";
import { Fragment, useState } from "react";

export default function Home() {
  const [lang, setLang] = useState<"pt" | "en">("pt");
  const [activeWaPanel, setActiveWaPanel] = useState<"hero" | "contact" | null>(null);
  const [isEmailFormOpen, setIsEmailFormOpen] = useState(false);
  const [emailForm, setEmailForm] = useState({ name: "", email: "", message: "" });

  const whatsappNumber = "5511933405138";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;
  const whatsappWebLink = `https://web.whatsapp.com/send?phone=${whatsappNumber}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(whatsappLink)}`;

  const handleEmailSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent(`Contato Sound Temple - ${emailForm.name || "Projeto"}`);
    const body = encodeURIComponent(
      `Nome: ${emailForm.name || "-"}\nE-mail: ${emailForm.email || "-"}\n\nMensagem:\n${emailForm.message || "-"}`
    );

    window.location.href = `mailto:soundtemplemaster@gmail.com?subject=${subject}&body=${body}`;
  };

  const copy = {
    pt: {
      subtitle: "Mastering profissional",
      heroText:
        "Mastering online profissional para música eletrônica e gêneros modernos. Precisão, profundidade e tradução em qualquer sistema de reprodução.",
      ctaPrimary: "Enviar Projeto",
      ctaSecondary: "WhatsApp",
      years: "Anos de Experiência",
      tracks: "Tracks Masterizadas",
      services: "Serviços",
      humanTitle: "Masterização Humana",
      humanText:
        "Cada música é cuidadosamente analisada e masterizada por um engenheiro de áudio profissional. Nenhum serviço de masterização por IA ou processamento automatizado é utilizado na entrega final.",
      stereo: "Mastering Estéreo",
      stereoDesc:
        "Masterização profissional da mix final estéreo com foco em clareza, impacto e tradução em qualquer sistema.",
      stem: "Mastering Stem",
      stemDesc:
        "Até 8 grupos estéreo para maior controle e refinamento do resultado final.",
      prices: "Preços",
      priceStereo: "Mastering Estéreo",
      priceStereoSingle: "1 música",
      pricePack: "Pacotes Mastering Estéreo",
      pricePack2: "2 a 9 músicas",
      pricePack3: "10+ músicas",
      priceStem: "Mastering Stem",
      priceStemDesc: "Até 8 stems estéreo",
      how: "Como Funciona",
      steps: ["Upload", "Masterização", "Preview", "Pagamento", "Download"],
      stepTexts: [
        "Envie seus arquivos com segurança",
        "Trabalhamos sua música com precisão e cuidado",
        "Você recebe um preview com watermark",
        "Pagamento seguro",
        "Receba sua master em alta qualidade",
      ],
      recall: "Recall Incluso",
      recallText:
        "Ajustes ilimitados por até 10 dias após a entrega. Você também pode reenviar uma versão atualizada da mix dentro do prazo, sem gerar nova cobrança.",
      contact: "Contato",
      whatsappCard: "Fale direto comigo",
      whatsappText: "Resposta rápida para dúvidas, orçamentos e envio de projetos.",
      whatsappBtn: "Iniciar conversa",
      emailCard: "Enviar projeto",
      emailText: "Envie sua mix, detalhes do projeto e receba uma resposta personalizada.",
      emailBtn: "Abrir formulário",
      emailFormTitle: "Enviar e-mail",
      emailFormHint: "Preencha rapidamente e abra seu app de e-mail.",
      nameLabel: "Nome",
      emailLabel: "E-mail",
      messageLabel: "Mensagem",
      sendEmailBtn: "Enviar e-mail",
      closeBtn: "Fechar",
      footerLabel: "Mastering online profissional",
    },
    en: {
      subtitle: "Professional Mastering",
      heroText:
        "Professional online mastering for electronic music and modern genres. Precision, depth and translation across every playback system.",
      ctaPrimary: "Send Project",
      ctaSecondary: "WhatsApp",
      years: "Years of Experience",
      tracks: "Tracks Mastered",
      services: "Services",
      humanTitle: "Human Mastering",
      humanText:
        "Every track is carefully reviewed and mastered by a professional audio engineer. No AI mastering services or automated processing are used in the final delivery.",
      stereo: "Stereo Mastering",
      stereoDesc:
        "Professional mastering of the final stereo mix with focus on clarity, impact and translation across any playback system.",
      stem: "Stem Mastering",
      stemDesc: "Up to 8 stereo groups for greater control and refinement of the final result.",
      prices: "Prices",
      priceStereo: "Stereo Mastering",
      priceStereoSingle: "1 track",
      pricePack: "Stereo Mastering Packages",
      pricePack2: "2 to 9 tracks",
      pricePack3: "10+ tracks",
      priceStem: "Stem Mastering",
      priceStemDesc: "Up to 8 stereo stems",
      how: "How It Works",
      steps: ["Upload", "Mastering", "Preview", "Payment", "Download"],
      stepTexts: [
        "Send your files securely",
        "We work on your music with precision and care",
        "You receive a preview with watermark",
        "Secure payment",
        "Receive your master in high quality",
      ],
      recall: "Included Recall",
      recallText:
        "Unlimited revisions for up to 10 days after delivery. You can also resend an updated mix within the period without generating an additional charge.",
      contact: "Contact",
      whatsappCard: "Talk to me directly",
      whatsappText: "Fast answers for questions, quotes and project submission.",
      whatsappBtn: "Start conversation",
      emailCard: "Send your project",
      emailText: "Send your mix, project details and receive a personalized response.",
      emailBtn: "Open form",
      emailFormTitle: "Send an email",
      emailFormHint: "Fill this quickly and open your email app.",
      nameLabel: "Name",
      emailLabel: "Email",
      messageLabel: "Message",
      sendEmailBtn: "Send email",
      closeBtn: "Close",
      footerLabel: "Professional Online Mastering",
    },
  };

  const t = copy[lang];

  return (
    <main
      className="relative bg-black text-white min-h-screen overflow-hidden"
      style={{
        backgroundImage: "url('/circuit-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-black/35" />

      {/* HEADER */}

      <header className="relative z-50 fixed top-0 left-0 right-0 bg-black/70 backdrop-blur-md border-b border-red-900/40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-5 ml-1">
            <img
              src="/SOUNDTEMPLEMASTER%20LOGO.jpeg"
              alt="Sound Temple logo"
              className="h-16 w-auto max-w-[110px] rounded-md object-contain shrink-0"
            />
            <div className="leading-none ml-1">
              <h1 className="text-xl md:text-2xl font-bold tracking-[0.3em] text-white">
                SOUNDTEMPLE
              </h1>
              <p className="text-[10px] md:text-xs tracking-[0.45em] text-red-500 uppercase mt-1">
                MASTERING
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-center">

            <button
              type="button"
              onClick={() => setLang("pt")}
              className={`text-sm transition ${lang === "pt" ? "text-red-400" : "hover:text-red-400"}`}
            >
              🇧🇷 PT
            </button>

            <button
              type="button"
              onClick={() => setLang("en")}
              className={`text-sm transition ${lang === "en" ? "text-red-400" : "hover:text-red-400"}`}
            >
              🇺🇸 EN
            </button>

            <a
              href="#contato"
              className="bg-zinc-900 border border-zinc-700 px-5 py-2 rounded-md hover:border-red-500 hover:text-red-400 transition"
            >
              Contato
            </a>

          </div>

        </div>
      </header>

      {/* HERO */}

      <section className="relative z-10 min-h-[52vh] flex flex-col justify-center items-center text-center px-6 pb-0 pt-28 md:pt-32">

        <div className="absolute inset-0 bg-black/45"></div>

        <div className="relative z-10">

  <p className="text-zinc-400 text-[11px] md:text-xs uppercase tracking-[0.45em] mb-4">
    {t.subtitle}
  </p>

  <h1 className="text-5xl md:text-7xl font-bold tracking-wide">
    WHERE SOUND MEETS
  </h1>

  <h2 className="text-5xl md:text-7xl font-bold text-red-500 mt-2">
    PRECISION
  </h2>

  <p className="max-w-3xl mx-auto text-zinc-300 text-lg mt-10">
    {t.heroText}
  </p>

  <div className="flex flex-col md:flex-row gap-4 justify-center mt-10">

     <Link
  href={lang === "en" ? "/submit?lang=en" : "/submit"}
  className="bg-gradient-to-b from-red-500 to-red-800 border border-red-400 shadow-[0_0_20px_rgba(255,0,0,0.35)] px-10 py-4 rounded-md font-semibold tracking-wide hover:scale-105 transition inline-block"
>
  {t.ctaPrimary}
</Link>

    <button
      type="button"
      onClick={() => setActiveWaPanel("hero")}
      className="bg-zinc-900 border border-zinc-700 shadow-lg px-10 py-4 rounded-md hover:border-red-500 hover:text-red-400 transition"
    >
      {t.ctaSecondary}
    </button>

  </div>

  {activeWaPanel === "hero" && (
    <article className="mt-6 w-full max-w-md rounded-md border border-red-500/30 bg-black/80 p-5 text-left shadow-[0_0_30px_rgba(255,0,0,0.12)]">
      <p className="text-[11px] uppercase tracking-[0.35em] text-red-400">WhatsApp</p>
      <h3 className="mt-2 text-xl font-semibold text-white">+55 11 93340-5138</h3>
      <p className="mt-2 text-sm text-zinc-300">Escaneie o QR code ou use um dos atalhos abaixo.</p>
      <div className="mt-4 flex flex-col items-center gap-4 rounded-md border border-zinc-800 bg-zinc-950/80 p-4 md:flex-row md:items-start">
        <img src={qrCodeUrl} alt="QR code para WhatsApp" className="h-28 w-28 rounded-md border border-zinc-800 bg-white p-2" />
        <div className="flex flex-col gap-2 w-full">
          <a href={whatsappLink} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-md border border-green-500/40 bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-100 hover:bg-green-500/20 transition">Abrir no WhatsApp</a>
          <a href={whatsappWebLink} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-md border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-100 hover:bg-red-500/20 transition">Abrir no WhatsApp Web</a>
          <button type="button" onClick={() => setActiveWaPanel(null)} className="text-xs uppercase tracking-[0.25em] text-zinc-400 hover:text-red-300 transition">Fechar</button>
        </div>
      </div>
    </article>
  )}

  <div className="flex justify-center gap-20 mt-10">

    <div>
      <h2 className="text-5xl font-bold text-red-500">
        10+
      </h2>

      <p className="text-zinc-400 mt-2">
        {t.years}
      </p>
    </div>

    <div>
      <h2 className="text-5xl font-bold text-red-500">
        1000+
      </h2>

      <p className="text-zinc-400 mt-2">
        {t.tracks}
      </p>
    </div>

  </div>

</div>


      </section>

      {/* INTRO */}

      <section className="relative z-10 max-w-4xl mx-auto px-6 pt-8 pb-4 text-center">
        <article className="rounded-md border border-zinc-800 bg-black/70 p-6 shadow-[0_0_20px_rgba(255,0,0,0.05)] hover:border-red-500 transition">
          <h3 className="text-red-400 text-xl md:text-2xl font-semibold mb-3">{t.humanTitle}</h3>
          <p className="text-zinc-300 text-[15px] md:text-base leading-relaxed">{t.humanText}</p>
        </article>
      </section>

      {/* SERVIÇOS */}

      <section className="max-w-6xl mx-auto px-6 py-14">

        <h2 className="text-4xl font-bold text-center mb-12 relative">

          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-800 to-transparent"></div>

          <span className="relative px-6 bg-black">
            {t.services}
          </span>

        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-black/70 backdrop-blur-sm border border-zinc-800 rounded-md p-8 text-center hover:border-red-500 transition shadow-[0_0_30px_rgba(255,0,0,0.08)]">

            <div className="mb-4 flex justify-center">
              <img
                src="/stereo mastering.jpeg"
                alt="Stereo Mastering artwork"
                className="h-20 w-auto object-contain rounded-md"
              />
            </div>

            <h3 className="text-2xl font-bold mb-4 text-red-400 text-center">
              {t.stereo}
            </h3>

            <p className="text-zinc-400 text-center">
              {t.stereoDesc}
            </p>

          </div>

          <div className="bg-black/70 backdrop-blur-sm border border-zinc-800 rounded-md p-8 text-center hover:border-red-500 transition shadow-[0_0_30px_rgba(255,0,0,0.08)]">

            <div className="mb-4 flex justify-center">
              <img
                src="/stem mastering.jpeg"
                alt="Stem Mastering artwork"
                className="h-20 w-auto object-contain rounded-md"
              />
            </div>

            <h3 className="text-2xl font-bold mb-4 text-red-400 text-center">
              {t.stem}
            </h3>

            <p className="text-zinc-400 text-center">
              {t.stemDesc}
            </p>

          </div>

        </div>

      </section>

{/* PREÇOS */}

<section className="max-w-6xl mx-auto px-6 py-14">

  <h2 className="text-4xl font-bold text-center mb-12 relative">

    <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-800 to-transparent"></div>

    <span className="relative px-6 bg-black uppercase tracking-[0.25em]">
      {t.prices}
    </span>

  </h2>

  <div className="grid md:grid-cols-3 gap-8">

    <div className="bg-black/70 backdrop-blur-sm border border-zinc-800 rounded-md p-8 text-center hover:border-red-500 transition shadow-[0_0_30px_rgba(255,0,0,0.08)]">

      <h3 className="text-red-400 text-xl font-bold mb-4">
        {t.priceStereo}
      </h3>

      <div className="text-5xl font-bold text-red-500 mb-2">
        R$100
      </div>

      <p className="text-zinc-400">
        {t.priceStereoSingle}
      </p>

    </div>

    <div className="bg-black/70 backdrop-blur-sm border border-zinc-800 rounded-md p-8 text-center hover:border-red-500 transition shadow-[0_0_30px_rgba(255,0,0,0.08)]">

      <h3 className="text-red-400 text-xl font-bold mb-4">
        {t.pricePack}
      </h3>

      <div className="text-3xl font-bold text-red-500">
        R$90
      </div>

      <p className="text-zinc-400 mb-4">
        {t.pricePack2}
      </p>

      <div className="text-3xl font-bold text-red-500">
        R$80
      </div>

      <p className="text-zinc-400">
        {t.pricePack3}
      </p>

    </div>

    <div className="bg-black/70 backdrop-blur-sm border border-zinc-800 rounded-md p-8 text-center hover:border-red-500 transition shadow-[0_0_30px_rgba(255,0,0,0.08)]">

      <h3 className="text-red-400 text-xl font-bold mb-4">
        {t.priceStem}
      </h3>

      <div className="text-5xl font-bold text-red-500 mb-2">
        R$180
      </div>

      <p className="text-zinc-400">
        {t.priceStemDesc}
      </p>

    </div>

  </div>

</section>


      {/* COMO FUNCIONA */}

      <section className="max-w-6xl mx-auto px-6 py-14">

        <h2 className="text-4xl font-bold text-center mb-12 relative">

          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-800 to-transparent"></div>

          <span className="relative px-6 bg-black">
            {t.how}
          </span>

        </h2>

        <div className="hidden md:flex items-center justify-center gap-1">
          {t.steps.map((step, index) => {
            const artworkMap = [
              "/UPLOAD.jpeg",
              "/MASTERIZACAO.jpeg",
              "/PREVIEW.jpeg",
              "/PAGAMENTO.jpeg",
              "/DOWNLOAD.jpeg",
            ];

            return (
              <Fragment key={step}>
                <article className="w-[170px] h-[180px] flex flex-col justify-start items-center relative overflow-hidden bg-black/70 backdrop-blur-sm border border-zinc-800 rounded-md p-4 text-center shadow-[0_0_20px_rgba(255,0,0,0.05)] hover:border-red-500 transition">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent"></div>
                  <div className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-red-500/10 blur-xl"></div>
                  <div className="absolute top-2 left-2 text-red-500 text-xs font-bold tracking-[0.25em]">{index + 1}</div>
                  <div className="mb-3 flex justify-center pt-3">
                    <img
                      src={artworkMap[index]}
                      alt={`${step} artwork`}
                      className="h-10 w-auto object-contain rounded-md"
                    />
                  </div>
                  <div className="text-red-400 text-base md:text-lg font-semibold leading-tight -mt-1">{step}</div>
                  <div className="mt-2 text-zinc-300 text-[12px] md:text-sm leading-relaxed">{t.stepTexts[index]}</div>
                </article>

                {index < t.steps.length - 1 && (
                  <span className="text-red-500 text-sm leading-none -mx-1">▶</span>
                )}
              </Fragment>
            );
          })}
        </div>

        <div className="grid md:hidden gap-4">
          {t.steps.map((step, index) => {
            const artworkMap = [
              "/UPLOAD.jpeg",
              "/MASTERIZACAO.jpeg",
              "/PREVIEW.jpeg",
              "/PAGAMENTO.jpeg",
              "/DOWNLOAD.jpeg",
            ];

            return (
              <article key={step} className="relative overflow-hidden bg-black/70 backdrop-blur-sm border border-zinc-800 rounded-md p-6 text-center shadow-[0_0_20px_rgba(255,0,0,0.05)] hover:border-red-500 transition">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent"></div>
                <div className="absolute -top-3 -right-3 h-10 w-10 rounded-full bg-red-500/10 blur-xl"></div>
                <div className="absolute top-3 left-3 text-red-500 text-xs font-bold tracking-[0.25em]">{index + 1}</div>
                <div className="mb-4 flex justify-center pt-3">
                  <img src={artworkMap[index]} alt={`${step} artwork`} className="h-14 w-auto object-contain rounded-md" />
                </div>
                <div className="text-red-400 text-lg font-semibold leading-tight">{step}</div>
                <div className="mt-3 text-zinc-300 text-[12px] leading-relaxed">{t.stepTexts[index]}</div>
              </article>
            );
          })}

        </div>

      </section>

      {/* RECALL */}

      <section className="relative z-10 max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-4xl font-bold text-center mb-10 relative">
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-800 to-transparent"></div>
          <span className="relative px-6 bg-black">{t.recall}</span>
        </h2>

        <article className="mx-auto flex max-w-4xl items-center gap-8 rounded-md border border-zinc-800 bg-black/70 p-8 shadow-[0_0_30px_rgba(255,0,0,0.08)] hover:border-red-500 transition">
          <div className="flex-shrink-0">
            <img src="/RECALL.jpeg" alt="Recall artwork" className="h-28 w-auto object-contain rounded-md" />
          </div>
          <div className="text-left">
            <h3 className="text-red-400 text-xl font-semibold mb-3">{t.recall}</h3>
            <p className="text-zinc-300 text-[15px] leading-relaxed">{t.recallText}</p>
          </div>
        </article>
      </section>

      {/* CONTATO */}

      <section id="contato" className="relative z-10 max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-4xl font-bold text-center mb-10 relative">
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-800 to-transparent"></div>
          <span className="relative px-6 bg-black uppercase tracking-[0.25em]">{t.contact}</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <article className="relative overflow-hidden rounded-md border border-zinc-800 bg-black/70 p-8 shadow-[0_0_30px_rgba(255,0,0,0.08)] hover:border-red-500 transition">
            <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-red-500/10 blur-2xl"></div>
            <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.8)]"></div>
            <div className="mb-4 flex justify-center">
              <img src="/WHATSAPP.jpeg" alt="WhatsApp artwork" className="h-16 w-auto object-contain rounded-md" />
            </div>
            <p className="text-sm uppercase tracking-[0.35em] text-red-400">WhatsApp</p>
            <h3 className="mt-3 text-2xl font-bold text-white">{t.whatsappCard}</h3>
            <p className="mt-4 text-zinc-400">{t.whatsappText}</p>
            <button
              type="button"
              onClick={() => setActiveWaPanel("contact")}
              className="mt-6 inline-flex items-center rounded-md border border-red-500/40 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-200 hover:bg-red-500/20 transition"
            >
              {t.whatsappBtn}
            </button>

            {activeWaPanel === "contact" && (
              <div className="mt-4 rounded-md border border-red-500/30 bg-black/90 p-4 text-left shadow-[0_0_30px_rgba(255,0,0,0.12)]">
                <p className="text-[11px] uppercase tracking-[0.35em] text-red-400">WhatsApp</p>
                <h4 className="mt-2 text-lg font-semibold text-white">+55 11 93340-5138</h4>
                <p className="mt-2 text-sm text-zinc-300">Escaneie o QR code ou abra no navegador.</p>
                <div className="mt-4 flex flex-col items-center gap-4 rounded-md border border-zinc-800 bg-zinc-950/80 p-4 md:flex-row md:items-start">
                  <img src={qrCodeUrl} alt="QR code para WhatsApp" className="h-24 w-24 rounded-md border border-zinc-800 bg-white p-2" />
                  <div className="flex flex-col gap-2 w-full">
                    <a href={whatsappLink} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-md border border-green-500/40 bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-100 hover:bg-green-500/20 transition">Abrir no WhatsApp</a>
                    <a href={whatsappWebLink} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-md border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-100 hover:bg-red-500/20 transition">Abrir no WhatsApp Web</a>
                    <button type="button" onClick={() => setActiveWaPanel(null)} className="text-xs uppercase tracking-[0.25em] text-zinc-400 hover:text-red-300 transition">Fechar</button>
                  </div>
                </div>
              </div>
            )}
          </article>

          <article className="relative overflow-hidden rounded-md border border-zinc-800 bg-black/70 p-8 shadow-[0_0_30px_rgba(255,0,0,0.08)] hover:border-red-500 transition">
            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-red-500/10 blur-2xl"></div>
            <div className="absolute top-4 left-4 h-2 w-2 rounded-full bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.8)]"></div>
            <div className="mb-4 flex justify-center">
              <img src="/MAIL.jpeg" alt="Email artwork" className="h-16 w-auto object-contain rounded-md" />
            </div>
            <p className="text-sm uppercase tracking-[0.35em] text-red-400">Email</p>
            <h3 className="mt-3 text-2xl font-bold text-white">{t.emailCard}</h3>
            <p className="mt-4 text-zinc-400">{t.emailText}</p>
            <button
              type="button"
              onClick={() => setIsEmailFormOpen((prev) => !prev)}
              className="mt-6 inline-flex items-center rounded-md border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm font-semibold text-zinc-100 hover:border-red-500 hover:text-red-300 transition"
            >
              {t.emailBtn}
            </button>

            {isEmailFormOpen && (
              <form onSubmit={handleEmailSubmit} className="mt-4 rounded-md border border-red-500/30 bg-black/95 p-4 text-left shadow-[0_0_30px_rgba(255,0,0,0.12)]">
                <p className="text-[11px] uppercase tracking-[0.35em] text-red-400">{t.emailFormTitle}</p>
                <p className="mt-2 text-sm text-zinc-300">{t.emailFormHint}</p>
                <div className="mt-4 space-y-3">
                  <label className="block text-sm text-zinc-200">
                    <span className="mb-1 block text-xs uppercase tracking-[0.25em] text-zinc-400">{t.nameLabel}</span>
                    <input
                      type="text"
                      value={emailForm.name}
                      onChange={(event) => setEmailForm((prev) => ({ ...prev, name: event.target.value }))}
                      className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white outline-none ring-0 placeholder:text-zinc-500 focus:border-red-500"
                      placeholder="Marcelo"
                    />
                  </label>
                  <label className="block text-sm text-zinc-200">
                    <span className="mb-1 block text-xs uppercase tracking-[0.25em] text-zinc-400">{t.emailLabel}</span>
                    <input
                      type="email"
                      value={emailForm.email}
                      onChange={(event) => setEmailForm((prev) => ({ ...prev, email: event.target.value }))}
                      className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white outline-none ring-0 placeholder:text-zinc-500 focus:border-red-500"
                      placeholder="seu@email.com"
                    />
                  </label>
                  <label className="block text-sm text-zinc-200">
                    <span className="mb-1 block text-xs uppercase tracking-[0.25em] text-zinc-400">{t.messageLabel}</span>
                    <textarea
                      rows={4}
                      value={emailForm.message}
                      onChange={(event) => setEmailForm((prev) => ({ ...prev, message: event.target.value }))}
                      className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white outline-none ring-0 placeholder:text-zinc-500 focus:border-red-500"
                      placeholder="Descreva seu projeto..."
                    />
                  </label>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button type="submit" className="inline-flex items-center rounded-md border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-100 hover:bg-red-500/20 transition">{t.sendEmailBtn}</button>
                  <button type="button" onClick={() => setIsEmailFormOpen(false)} className="inline-flex items-center rounded-md border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-100 hover:border-red-500 hover:text-red-300 transition">{t.closeBtn}</button>
                </div>
              </form>
            )}
          </article>

          <article className="relative overflow-hidden rounded-md border border-zinc-800 bg-black/70 p-8 shadow-[0_0_30px_rgba(255,0,0,0.08)] hover:border-red-500 transition">
            <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-red-500/10 blur-2xl"></div>
            <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.8)]"></div>
            <div className="mb-4 flex justify-center">
              <img src="/INSTA.jpeg" alt="Instagram artwork" className="h-16 w-auto object-contain rounded-md" />
            </div>
            <p className="text-sm uppercase tracking-[0.35em] text-red-400">Instagram</p>
            <h3 className="mt-3 text-2xl font-bold text-white">@marcelodubianchi_st</h3>
            <a href="https://www.instagram.com/marcelodubianchi_st" target="_blank" rel="noreferrer" className="mt-2 inline-flex text-sm text-red-300 hover:text-red-200">Acessar perfil</a>
            <h3 className="mt-4 text-xl font-bold text-white">@soundtemplestudio</h3>
            <a href="https://www.instagram.com/soundtemplestudio" target="_blank" rel="noreferrer" className="mt-2 inline-flex text-sm text-red-300 hover:text-red-200">Acessar perfil</a>
          </article>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="relative z-10 border-t border-red-900/30 bg-black/70 py-12 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 text-left md:flex-row md:items-start md:justify-between">
          <div className="md:max-w-sm">
            <h3 className="text-white font-bold tracking-[0.3em] mb-4">
              SOUNDTEMPLE
            </h3>
            <p className="text-zinc-500">
              {t.footerLabel}
            </p>
          </div>

          <div className="text-sm text-zinc-300 md:text-right">
            <p className="text-[11px] uppercase tracking-[0.35em] text-red-400 mb-3">Contato</p>
            <p className="mb-1">WhatsApp: +55 11 93340-5138</p>
            <a href="mailto:soundtemplemaster@gmail.com" className="mb-1 inline-block text-zinc-200 hover:text-red-300 transition">Email: soundtemplemaster@gmail.com</a>
            <p className="mt-2">Instagram:</p>
            <a href="https://www.instagram.com/marcelodubianchi_st" target="_blank" rel="noreferrer" className="block text-zinc-200 hover:text-red-300 transition">@marcelodubianchi_st</a>
            <a href="https://www.instagram.com/soundtemplestudio" target="_blank" rel="noreferrer" className="block text-zinc-200 hover:text-red-300 transition">@soundtemplestudio</a>
          </div>
        </div>
      </footer>

    </main>
  );
}