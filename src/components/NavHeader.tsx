import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";

const BASE = import.meta.env.BASE_URL;

const NAV_LINKS = [
  { label: "Decorativos",   href: "#decorativos" },
  { label: "Lustres",       href: "#lustres" },
  { label: "Aquário",       href: "#aquario" },
  { label: "Brinquedos",    href: "#brinquedos" },
  { label: "Personalizados",href: "#personalizados" },
  { label: "Depoimentos",   href: "#depoimentos" },
];

interface NavHeaderProps {
  settings: {
    storeName: string;
    shopeeStoreUrl: string;
    logoUrl?: string;
  };
}

export function NavHeader({ settings }: NavHeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setLogoFailed(false);
  }, [settings?.logoUrl]);

  const shopeeUrl = settings?.shopeeStoreUrl || "https://shopee.com.br/inovastudio";
  const storeName = settings?.storeName || "InovaStudio";

  return (
    <>
      {/* Top Banner: Frete Grátis */}
      <div
        id="top-frete-gratis-banner"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 36,
          background: "#000000",
          color: "#FF6600",
          zIndex: 101,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.75rem",
          fontWeight: 700,
          fontFamily: "var(--font-display)",
          letterSpacing: "0.06em",
          borderBottom: "1px solid rgba(255,102,0,0.15)",
          textTransform: "uppercase",
        }}
      >
        <span>🚚 FRETE GRÁTIS SEM VALOR MÍNIMO EM QUALQUER COMPRA VIA SHOPEE!</span>
      </div>

      <header
        style={{
          position: "fixed",
          top: scrolled ? 0 : 36,
          left: 0,
          right: 0,
          zIndex: 100,
          background: scrolled ? "rgba(7,7,8,0.96)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(196,147,58,0.15)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          transition: "background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease, top 0.3s ease",
        }}
    >
      <div
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          padding: "0 2rem",
          height: 88,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        {/* Logo image or text fallback */}
        <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center", flexShrink: 0 }}>
          {!logoFailed ? (
            <img
              src={settings?.logoUrl || `${BASE.endsWith("/") ? BASE.slice(0, -1) : BASE}/images/logo-inova-transparent.svg`}
              alt={storeName}
              onError={() => setLogoFailed(true)}
              style={{
                height: 148,
                width: "auto",
                objectFit: "contain",
                margin: "-28px 0",
                display: "block",
                filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.5))",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
          ) : (
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "1.45rem",
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

        {/* Desktop nav */}
        <nav className="hidden lg:flex" style={{ alignItems: "center", gap: "2rem" }}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.83rem",
                fontWeight: 500,
                color: "rgba(242,242,244,0.72)",
                textDecoration: "none",
                letterSpacing: "0.01em",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(242,242,244,0.72)")}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <a
            href={shopeeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex btn-shopee"
            style={{ padding: "0.55rem 1.25rem", fontSize: "0.825rem" }}
          >
            <ShoppingBag size={15} />
            Ver Loja Shopee
          </a>

          <button
            className="lg:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            style={{
              background: "none",
              border: "none",
              color: "var(--color-fg)",
              cursor: "pointer",
              padding: "0.4rem",
              display: "flex",
            }}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            background: "rgba(7,7,8,0.98)",
            borderTop: "1px solid var(--color-border)",
          }}
        >
          <nav style={{ padding: "1rem 2rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  color: "rgba(242,242,244,0.8)",
                  textDecoration: "none",
                  padding: "0.75rem 0",
                  borderBottom: "1px solid var(--color-border)",
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href={shopeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shopee"
              style={{ marginTop: "1rem", justifyContent: "center" }}
            >
              <ShoppingBag size={16} />
              Ver Loja na Shopee
            </a>
          </nav>
        </div>
      )}
    </header>
  </>
  );
}
