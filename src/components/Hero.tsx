import { useState, useEffect } from "react";
import { ShoppingBag, ChevronDown, Star } from "lucide-react";

const BASE = import.meta.env.BASE_URL;
interface HeroProps {
  settings?: {
    shopeeStoreUrl: string;
    storeName: string;
    storeDescription: string;
  };
}

const HERO_OPTIONS = [
  { id: "atelie.jpg", name: "Ateliê do Criador", desc: "Cores criativas e figuras low-poly" },
  { id: "espaco-kids.jpg", name: "Espaço Kids & Dragões", desc: "Cores pastéis e articulados divertidos" },
  { id: "maker-workspace.jpg", name: "Maker Workspace", desc: "O coração da impressão 3D profissional" },
  { id: "clean-scandi.jpg", name: "Clean & Escandinavo", desc: "Claro, moderno, minimalista" },
  { id: "hero-room.jpg", name: "Sala Clássica InovaStudio", desc: "A sala original aconchegante" }
];

export function Hero({ settings }: HeroProps) {
  const [activeHero, setActiveHero] = useState<string>(() => {
    return localStorage.getItem("active_hero_image") || "atelie.jpg";
  });
  const shopeeStoreUrl = settings?.shopeeStoreUrl || "https://shopee.com.br/inovastudio";

  // Preload other high-res hero images to avoid white flash during transition, deferred by 2.5s to prevent network contention
  useEffect(() => {
    const timer = setTimeout(() => {
      const cleanBase = BASE.endsWith("/") ? BASE.slice(0, -1) : BASE;
      HERO_OPTIONS.forEach((opt) => {
        if (opt.id === activeHero) return;
        const img = new Image();
        img.src = `${cleanBase}/images/${opt.id}`;
      });
    }, 2500);
    return () => clearTimeout(timer);
  }, [activeHero]);

  // Auto-slide carousel effect (rotates background every 6.5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHero((prev) => {
        const currentIndex = HERO_OPTIONS.findIndex((opt) => opt.id === prev);
        const nextIndex = (currentIndex + 1) % HERO_OPTIONS.length;
        const nextHeroId = HERO_OPTIONS[nextIndex].id;
        localStorage.setItem("active_hero_image", nextHeroId);
        return nextHeroId;
      });
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        height: "100vh",
        minHeight: 640,
        display: "flex",
        alignItems: "flex-start",
        overflow: "hidden",
      }}
    >
      {/* Background image */}
      <img
        src={activeHero.startsWith("http") ? activeHero : `${BASE.endsWith("/") ? BASE.slice(0, -1) : BASE}/images/${activeHero}`}
        alt="Sala decorada com peças InovaStudio"
        onError={(e) => {
          const cleanBase = BASE.endsWith("/") ? BASE.slice(0, -1) : BASE;
          e.currentTarget.src = `${cleanBase}/images/hero-room.jpg`;
        }}
        loading="eager"
        fetchPriority="high"
        referrerPolicy="no-referrer"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          zIndex: 0,
          transition: "filter 0.6s ease, opacity 0.5s ease-in-out",
          filter: "brightness(0.9)",
        }}
      />

      {/* Top-left gradient for text legibility — fades away fast */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(125deg, rgba(7,7,8,0.88) 0%, rgba(7,7,8,0.60) 30%, rgba(7,7,8,0.15) 58%, rgba(7,7,8,0) 80%)",
        }}
      />
      {/* Subtle overall veil so hotspot labels read well */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: "rgba(7,7,8,0.18)",
        }}
      />

      {/* Bottom fade to page bg */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 180,
          zIndex: 2,
          background: "linear-gradient(to top, var(--color-bg) 0%, transparent 100%)",
        }}
      />

      {/* Hero content */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          maxWidth: 1360,
          margin: "0 auto",
          padding: "0 2rem",
          paddingTop: 160,
          width: "100%",
        }}
      >
        <div style={{ maxWidth: 580 }}>
          {/* Eyebrow */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1.5rem",
            }}
          >
            <span
              style={{
                width: 28,
                height: 1,
                background: "var(--color-accent)",
                display: "block",
              }}
            />
            <span
              className="section-label"
              style={{ color: "var(--color-accent)", letterSpacing: "0.15em" }}
            >
              Impressão 3D Premium · Entregamos para todo Brasil
            </span>
          </div>

          <h1
            className="fade-up"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              marginBottom: "1.5rem",
            }}
          >
            Peças únicas que
            <br />
            <span style={{ color: "var(--color-accent)" }}>encantam</span> e
            <br />
            personalizam
          </h1>

          <p
            className="fade-up fade-up-d1"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.05rem",
              lineHeight: 1.75,
              color: "rgba(244,244,248,0.72)",
              marginBottom: "2rem",
              maxWidth: 480,
            }}
          >
            Peças exclusivas produzidas com tecnologia de impressão 3D premium.
            Decorativos, lustres, aquário, brinquedos e personalizados.
          </p>

          <div
            className="fade-up fade-up-d2"
            style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap", marginBottom: "2.25rem" }}
          >
            <a href={shopeeStoreUrl} target="_blank" rel="noopener noreferrer" className="btn-shopee">
              <ShoppingBag size={17} />
              Comprar na Shopee
            </a>
            <a href="#categorias" className="btn-ghost">
              Ver Categorias
            </a>
          </div>

          <div
            className="fade-up fade-up-d3"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={13} style={{ fill: "#FACC15", color: "#FACC15" }} />
              ))}
              <span style={{ fontSize: "0.82rem", color: "rgba(244,244,248,0.65)", marginLeft: "0.25rem" }}>
                <strong style={{ color: "#fff" }}>4.9</strong>/5 na Shopee
              </span>
            </div>
            <span style={{ fontSize: "0.82rem", color: "rgba(244,244,248,0.65)" }}>
              <strong style={{ color: "#fff" }}>+2.400</strong> clientes
            </span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#categorias"
        className="bounce-soft"
        style={{
          position: "absolute",
          bottom: 36,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 5,
          color: "rgba(244,244,248,0.45)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          textDecoration: "none",
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(244,244,248,0.85)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(244,244,248,0.45)")}
      >
        <span
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
            fontFamily: "var(--font-display)",
            textTransform: "uppercase",
          }}
        >
          Explorar
        </span>
        <ChevronDown size={18} />
      </a>
    </section>
  );
}
