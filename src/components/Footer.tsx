import { useState, useEffect } from "react";
import { MessageCircle, Instagram, Facebook, Youtube, Send } from "lucide-react";
import { GlowingWaves } from "./GlowingWaves";

const BASE = import.meta.env.BASE_URL;

interface FooterProps {
  settings?: {
    storeName: string;
    storeDescription: string;
    shopeeStoreUrl: string;
    whatsAppPhone: string;
    whatsAppMessage: string;
    socialInstagram?: string;
    socialFacebook?: string;
    socialYoutube?: string;
    socialTelegram?: string;
    wholesaleWhatsApp?: string;
    wholesaleTelegram?: string;
    logoUrl?: string;
  };
}

export function Footer({ settings }: FooterProps) {
  const [logoFailed, setLogoFailed] = useState(false);

  useEffect(() => {
    setLogoFailed(false);
  }, [settings?.logoUrl]);

  const shopeeUrl = settings?.shopeeStoreUrl || "https://shopee.com.br/inovastudio";
  const whatsAppPhone = settings?.whatsAppPhone || "5511999999999";
  const whatsAppMessage = settings?.whatsAppMessage || "Olá! Quero fazer um pedido!";
  const whatsAppUrl = `https://wa.me/${whatsAppPhone}?text=${encodeURIComponent(whatsAppMessage)}`;
  const storeName = settings?.storeName || "InovaStudio";
  const storeDescription = settings?.storeDescription || "Peças decorativas, colecionáveis e utilidades premium impressas em 3D de alta precisão.";

  const instagramUser = settings?.socialInstagram || "inovastudio3d";
  const instagramUrl = instagramUser 
    ? (instagramUser.startsWith("http") ? instagramUser : `https://instagram.com/${instagramUser}`)
    : "#";

  const facebookUser = settings?.socialFacebook;
  const facebookUrl = facebookUser 
    ? (facebookUser.startsWith("http") ? facebookUser : `https://facebook.com/${facebookUser}`)
    : "#";

  const youtubeUser = settings?.socialYoutube;
  const youtubeUrl = youtubeUser 
    ? (youtubeUser.startsWith("http") ? youtubeUser : `https://youtube.com/${youtubeUser}`)
    : "#";

  const telegramUser = settings?.socialTelegram;
  const telegramUrl = telegramUser 
    ? (telegramUser.startsWith("http") ? telegramUser : `https://t.me/${telegramUser}`)
    : "#";

  return (
    <footer
      style={{
        position: "relative",
        background: "linear-gradient(to bottom, #070708 0%, #030408 100%)",
        overflow: "hidden",
      }}
    >
      {/* Interactive glowing wave particles background - shifted lower to avoid overlapping texts */}
      <GlowingWaves yOffsets={[0.72, 0.82, 0.76, 0.68]} />

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12"
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1360,
          margin: "0 auto",
          padding: "4rem 2rem",
        }}
      >
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-4 flex flex-col items-start">
          <a
            href="#"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              marginTop: "-1.2rem",
              marginBottom: "0.5rem",
            }}
          >
            {!logoFailed ? (
              <img 
                src={settings?.logoUrl || `${BASE.endsWith("/") ? BASE.slice(0, -1) : BASE}/images/logo-inova-transparent.svg`} 
                alt={storeName} 
                onError={() => setLogoFailed(true)}
                style={{ 
                  height: 110, 
                  width: "auto", 
                  objectFit: "contain",
                  filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.4))",
                  marginBottom: "0.25rem"
                }} 
              />
            ) : (
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontSize: "1.2rem",
                  color: "var(--color-fg)",
                  letterSpacing: "-0.03em",
                }}
              >
                {storeName.includes(" ") ? (
                  <>
                    {storeName.split(" ")[0]}
                    <span style={{ color: "var(--color-accent)" }}> {storeName.split(" ").slice(1).join(" ")}</span>
                  </>
                ) : (
                  <>
                    Inova<span style={{ color: "var(--color-accent)" }}>Studio</span>
                  </>
                )}
              </span>
            )}
          </a>

          <p
            style={{
              fontSize: "0.82rem",
              color: "var(--color-fg-muted)",
              lineHeight: 1.7,
              marginBottom: "1.25rem",
              maxWidth: 320,
            }}
          >
            {storeDescription}
          </p>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            {[
              { Icon: Instagram, label: "Instagram", url: instagramUrl },
              { Icon: Facebook,  label: "Facebook", url: facebookUrl },
              { Icon: Youtube,   label: "YouTube", url: youtubeUrl },
              { Icon: Send,      label: "Telegram", url: telegramUrl },
            ].filter(social => social.url !== "#").map(({ Icon, label, url }) => (
              <a
                key={label}
                href={url}
                target={url !== "#" ? "_blank" : undefined}
                rel={url !== "#" ? "noopener noreferrer" : undefined}
                aria-label={label}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  border: "1px solid var(--color-border)",
                  background: "var(--color-card)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-fg-muted)",
                  textDecoration: "none",
                  transition: "color 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--color-accent)";
                  e.currentTarget.style.borderColor = "rgba(196,147,58,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--color-fg-muted)";
                  e.currentTarget.style.borderColor = "var(--color-border)";
                }}
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Categorias */}
        <div className="sm:col-span-1 lg:col-span-2">
          <h4
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--color-fg-muted)",
              marginBottom: "1rem",
            }}
          >
            Categorias
          </h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {[
              { label: "Decorativos",   href: "#decorativos" },
              { label: "Lustres",       href: "#lustres" },
              { label: "Aquário",       href: "#aquario" },
              { label: "Brinquedos",    href: "#brinquedos" },
              { label: "Festas",        href: "#personalizados" },
              { label: "Corporativo",   href: "#personalizados" },
            ].map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--color-fg-muted)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-fg)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-fg-muted)")}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Informações */}
        <div className="sm:col-span-1 lg:col-span-2">
          <h4
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--color-fg-muted)",
              marginBottom: "1rem",
            }}
          >
            Informações
          </h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {[
              { label: "Nossa Loja Shopee",   href: shopeeUrl, ext: true },
              { label: "Como Comprar",         href: "#" },
              { label: "Prazos e Envio",       href: "#" },
              { label: "Política de Troca",    href: "#" },
              { label: "Perguntas Frequentes", href: "#" },
            ].map(({ label, href, ext }) => (
              <li key={label}>
                <a
                  href={href}
                  target={ext ? "_blank" : undefined}
                  rel={ext ? "noopener noreferrer" : undefined}
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--color-fg-muted)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-fg)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-fg-muted)")}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contato */}
        <div className="sm:col-span-2 lg:col-span-4 flex flex-col">
          <h4
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--color-fg-muted)",
              marginBottom: "1rem",
            }}
          >
            Contato
          </h4>
          <p
            style={{
              fontSize: "0.82rem",
              color: "var(--color-fg-muted)",
              lineHeight: 1.7,
              marginBottom: "1rem",
            }}
          >
            Dúvidas, orçamentos e pedidos personalizados — fale conosco!
          </p>
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
            style={{ fontSize: "0.82rem", padding: "0.6rem 1.2rem", justifyContent: "center", display: "flex" }}
          >
            <MessageCircle size={14} />
            WhatsApp
          </a>
          <p style={{ fontSize: "0.72rem", color: "var(--color-muted)", marginTop: "0.6rem", textAlign: "center" }}>
            Respondemos em até 2 horas
          </p>

          {/* Wholesale Section */}
          <div style={{ marginTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1rem" }}>
            <h5 style={{ fontFamily: "var(--font-display)", fontSize: "0.78rem", fontWeight: 700, color: "var(--color-fg)", marginBottom: "0.4rem" }}>
              Atacado & Parcerias:
            </h5>
            <p style={{ fontSize: "0.75rem", color: "var(--color-fg-muted)", lineHeight: 1.5, marginBottom: "0.75rem" }}>
              Entre em contato para condições de atacado via WhatsApp ou Telegram:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <a
                href={`https://wa.me/${settings?.wholesaleWhatsApp || "5511999999999"}?text=Olá!%20Quero%20saber%20mais%20sobre%20as%20condições%20de%20atacado%20da%20InovaStudio.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
                style={{ fontSize: "0.74rem", padding: "0.45rem 0.8rem", justifyContent: "center", display: "flex" }}
              >
                <MessageCircle size={12} />
                WhatsApp Atacado
              </a>
              {settings?.wholesaleTelegram && (
                <a
                  href={settings.wholesaleTelegram.startsWith("http") ? settings.wholesaleTelegram : `https://t.me/${settings.wholesaleTelegram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shopee"
                  style={{ fontSize: "0.74rem", padding: "0.45rem 0.8rem", justifyContent: "center", display: "flex", background: "#0088cc", borderColor: "#0088cc", color: "#ffffff" }}
                >
                  <Send size={12} />
                  Telegram Atacado
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.04)", position: "relative", zIndex: 2 }}>
        <div
          style={{
            maxWidth: 1360,
            margin: "0 auto",
            padding: "1.25rem 2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontSize: "0.75rem", color: "var(--color-muted)" }}>
            © {new Date().getFullYear()} {storeName}. Todos os direitos reservados.
          </span>
          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
            {["Shopee", "Pix", "Cartão", "Boleto"].map((item) => (
              <span key={item} style={{ fontSize: "0.75rem", color: "var(--color-muted)" }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
