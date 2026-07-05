import { Shield, Truck, Sparkles, Headphones, Award, RefreshCw } from "lucide-react";

import img3dPrint from "@/assets/images/real_3d_print_1783221943779.jpg";
import imgGarantia from "@/assets/images/real_garantia_1783221955976.jpg";
import imgEntrega from "@/assets/images/real_entrega_1783221966432.jpg";
import imgSuporte from "@/assets/images/real_suporte_1783221980008.jpg";
import imgPersonalizado from "@/assets/images/real_personalizacao_1783221990741.jpg";
import imgPronto from "@/assets/images/real_pronto_1783222003479.jpg";

const FEATURES = [
  {
    icon: Sparkles,
    title: "Qualidade Premium",
    desc: "Filamentos de alta qualidade e impressoras de última geração para acabamento perfeito.",
    image: img3dPrint,
  },
  {
    icon: Shield,
    title: "Garantia Total",
    desc: "Cada peça é inspecionada antes de sair. Se não ficou perfeita, refazemos sem custo.",
    image: imgGarantia,
  },
  {
    icon: Truck,
    title: "Entrega Nacional",
    desc: "Enviamos para todo o Brasil com embalagem reforçada para que sua peça chegue intacta.",
    image: imgEntrega,
  },
  {
    icon: Headphones,
    title: "Suporte via WhatsApp",
    desc: "Nossa equipe está disponível para tirar dúvidas e acompanhar seu pedido em tempo real.",
    image: imgSuporte,
  },
  {
    icon: Award,
    title: "Personalização Total",
    desc: "Criamos peças com seu logo, nome, tema ou design. Cada projeto é único.",
    image: imgPersonalizado,
  },
  {
    icon: RefreshCw,
    title: "Pronto em 48–72h",
    desc: "Produção ágil sem abrir mão da qualidade. Urgências atendidas mediante consulta.",
    image: imgPronto,
  },
];

const STATS = [
  { value: "+2.400", label: "Clientes satisfeitos" },
  { value: "4.9★",  label: "Avaliação na Shopee" },
  { value: "+200",  label: "Produtos no catálogo" },
  { value: "100%",  label: "Garantia de qualidade" },
];

export function WhyUs() {
  return (
    <section
      style={{
        padding: "6rem 2rem",
        position: "relative",
        background: "transparent",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1360, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Header */}
        <div style={{ maxWidth: 520, marginBottom: "3rem" }}>
          <span className="section-label">Por que nos escolher</span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              color: "var(--color-fg)",
              marginTop: "0.625rem",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
            }}
          >
            Qualidade que você sente em cada peça
          </h2>
        </div>

        {/* Feature grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{ gap: "1.25rem", marginBottom: "3rem" }}
        >
          {FEATURES.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div
                key={i}
                className="card group"
                style={{
                  padding: "1.25rem",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                }}
              >
                {/* Image Container with Hover zoom */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "16/9",
                    borderRadius: "0.75rem",
                    overflow: "hidden",
                    marginBottom: "1.25rem",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                  }}
                >
                  <img
                    src={feat.image}
                    alt={feat.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.5s ease, filter 0.5s ease",
                    }}
                    className="group-hover:scale-105 group-hover:brightness-110"
                  />
                  {/* Floating badge for Icon */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "0.75rem",
                      right: "0.75rem",
                      width: 38,
                      height: 38,
                      borderRadius: "50%",
                      background: "rgba(10, 10, 15, 0.88)",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                      border: "1px solid rgba(196, 147, 58, 0.45)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                      zIndex: 2,
                    }}
                  >
                    <Icon size={16} style={{ color: "var(--color-accent)" }} />
                  </div>
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    color: "var(--color-fg)",
                    marginBottom: "0.5rem",
                    transition: "color 0.3s ease",
                  }}
                  className="group-hover:text-[var(--color-accent)]"
                >
                  {feat.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--color-fg-muted)",
                    lineHeight: 1.65,
                  }}
                >
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats bar */}
        <div
          style={{
            borderRadius: "0.875rem",
            border: "1px solid var(--color-border)",
            background: "var(--color-card)",
            padding: "2rem 2.5rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: "1.5rem",
            textAlign: "center",
          }}
        >
          {STATS.map((stat, i) => (
            <div key={i}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "1.75rem",
                  letterSpacing: "-0.03em",
                  color: "var(--color-accent)",
                  marginBottom: "0.25rem",
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--color-fg-muted)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
