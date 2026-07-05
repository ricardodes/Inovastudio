import { useState, useEffect } from "react";
import { ShoppingCart, Star, Heart, ExternalLink } from "lucide-react";
import { getSafeProductImage } from "@/lib/safe-images";

const SHOPEE_STORE = "https://shopee.com.br/inovastudio";

interface Product {
  id: number;
  name: string;
  category: string;
  categoryId: string;
  price: string;
  oldPrice?: string;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  shopeeUrl: string;
  desc: string;
}

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Dragão Articulado",
    category: "Brinquedos",
    categoryId: "brinquedos",
    price: "R$ 149,90",
    oldPrice: "R$ 199,90",
    rating: 4.9,
    reviews: 128,
    image: "dragon-3d.jpg",
    badge: "Mais Vendido",
    shopeeUrl: SHOPEE_STORE,
    desc: "Dragão articulado em PLA premium, totalmente flexível e colecionável.",
  },
  {
    id: 2,
    name: "Vaso Geométrico",
    category: "Decorativos",
    categoryId: "decorativos",
    price: "R$ 89,90",
    rating: 4.8,
    reviews: 74,
    image: "vase-3d.jpg",
    badge: "Novo",
    shopeeUrl: SHOPEE_STORE,
    desc: "Vaso decorativo geométrico em filamento silk metálico.",
  },
  {
    id: 3,
    name: "Organizador Hexagonal",
    category: "Decorativos",
    categoryId: "decorativos",
    price: "R$ 119,90",
    oldPrice: "R$ 139,90",
    rating: 5.0,
    reviews: 56,
    image: "organizer-3d.webp",
    badge: "Promoção",
    shopeeUrl: SHOPEE_STORE,
    desc: "Conjunto organizador modular com design hexagonal premiado.",
  },
  {
    id: 4,
    name: "Mago Colecionável",
    category: "Decorativos",
    categoryId: "decorativos",
    price: "R$ 199,90",
    rating: 4.9,
    reviews: 43,
    image: "figurine-3d.jpg",
    badge: "Ed. Limitada",
    shopeeUrl: SHOPEE_STORE,
    desc: "Miniatura detalhada de mago in resina de alta resolução.",
  },
  {
    id: 5,
    name: "Escultura Abstrata",
    category: "Decorativos",
    categoryId: "decorativos",
    price: "R$ 259,90",
    oldPrice: "R$ 299,90",
    rating: 4.7,
    reviews: 31,
    image: "art-sculpture.jpg",
    badge: "Premium",
    shopeeUrl: SHOPEE_STORE,
    desc: "Escultura abstrata em filamento silk ouro e rose gold.",
  },
  {
    id: 6,
    name: "Decoração de Aquário",
    category: "Aquário",
    categoryId: "aquario",
    price: "R$ 79,90",
    rating: 4.8,
    reviews: 89,
    image: "vase-3d.jpg",
    badge: "Destaque",
    shopeeUrl: SHOPEE_STORE,
    desc: "Decoração resistente à água, segura para peixes e plantas.",
  },
  {
    id: 7,
    name: "Lustre Geométrico",
    category: "Lustres",
    categoryId: "lustres",
    price: "R$ 349,90",
    oldPrice: "R$ 449,90",
    rating: 4.9,
    reviews: 22,
    image: "organizer-3d.webp",
    badge: "Exclusivo",
    shopeeUrl: SHOPEE_STORE,
    desc: "Lustre geométrico artesanal, encaixe E27. Sem fio incluso.",
  },
  {
    id: 8,
    name: "Kit Festa Personalizado",
    category: "Personalizados",
    categoryId: "personalizados",
    price: "Sob encomenda",
    rating: 5.0,
    reviews: 115,
    image: "figurine-3d.jpg",
    badge: "Personalizado",
    shopeeUrl: SHOPEE_STORE,
    desc: "Topos de bolo, lembranças e decoração temática personalizada.",
  },
  {
    id: 9,
    name: "Comedouro Elevado Ergonômico",
    category: "Pets",
    categoryId: "pets",
    price: "R$ 129,90",
    oldPrice: "R$ 159,90",
    rating: 4.9,
    reviews: 42,
    image: "pet-3d.jpg",
    badge: "Ergonômico",
    shopeeUrl: SHOPEE_STORE,
    desc: "Comedouro elevado impresso em 3D com design moderno, reduz tensão no pescoço do seu pet. Acompanha tigelas inox.",
  },
  {
    id: 10,
    name: "Identificador de Coleira Personalizado",
    category: "Pets",
    categoryId: "pets",
    price: "R$ 29,90",
    rating: 5.0,
    reviews: 118,
    image: "pet-3d.jpg",
    badge: "Sucesso",
    shopeeUrl: SHOPEE_STORE,
    desc: "Plaquinha de identificação em PLA ultra resistente com nome e telefone gravados em alto relevo.",
  },
  {
    id: 11,
    name: "Suporte de Headset Wave",
    category: "Suportes",
    categoryId: "suportes",
    price: "R$ 79,90",
    oldPrice: "R$ 99,90",
    rating: 4.8,
    reviews: 67,
    image: "support-3d.jpg",
    badge: "Destaque",
    shopeeUrl: SHOPEE_STORE,
    desc: "Suporte de fone de ouvido com design geométrico orgânico, perfeito para o seu setup gamer.",
  },
  {
    id: 12,
    name: "Suporte Articulado de Parede para Controle",
    category: "Suportes",
    categoryId: "suportes",
    price: "R$ 49,90",
    rating: 4.9,
    reviews: 88,
    image: "support-3d.jpg",
    badge: "Novo",
    shopeeUrl: SHOPEE_STORE,
    desc: "Suporte resistente para controles de PS5/Xbox, fixação fácil e visual clean na parede.",
  },
  {
    id: 13,
    name: "Organizador de Cabos Modular",
    category: "Organização",
    categoryId: "organizacao",
    price: "R$ 39,90",
    rating: 4.7,
    reviews: 93,
    image: "organizer-3d.webp",
    badge: "Prático",
    shopeeUrl: SHOPEE_STORE,
    desc: "Kit com 5 organizadores de cabos magnéticos para manter sua mesa de trabalho sempre limpa.",
  },
  {
    id: 14,
    name: "Gaveteiro Modular Colmeia",
    category: "Organização",
    categoryId: "organizacao",
    price: "R$ 119,90",
    oldPrice: "R$ 149,90",
    rating: 5.0,
    reviews: 34,
    image: "organizer-3d.webp",
    badge: "Campeão",
    shopeeUrl: SHOPEE_STORE,
    desc: "Organizador em formato hexagonal com encaixe modular infinito para ferramentas ou maquiagem.",
  },
  {
    id: 15,
    name: "Árvore de Natal Origami",
    category: "Datas Festivas",
    categoryId: "datas-festivas",
    price: "R$ 99,90",
    oldPrice: "R$ 129,90",
    rating: 4.9,
    reviews: 54,
    image: "festive-3d.jpg",
    badge: "Natal",
    shopeeUrl: SHOPEE_STORE,
    desc: "Árvore de Natal com design minimalista estilo origami e iluminação interna por LED.",
  },
  {
    id: 16,
    name: "Coelho de Páscoa Geométrico",
    category: "Datas Festivas",
    categoryId: "datas-festivas",
    price: "R$ 59,90",
    rating: 4.8,
    reviews: 29,
    image: "festive-3d.jpg",
    badge: "Páscoa",
    shopeeUrl: SHOPEE_STORE,
    desc: "Escultura decorativa de coelho em estilo low-poly, perfeita para a decoração de Páscoa.",
  },
  {
    id: 17,
    name: "Troféu Vitória Personalizado",
    category: "Eventos",
    categoryId: "eventos",
    price: "Sob consulta",
    rating: 5.0,
    reviews: 21,
    image: "event-3d.jpg",
    badge: "Corporativo",
    shopeeUrl: SHOPEE_STORE,
    desc: "Troféus e medalhas personalizadas em filamentos metálicos nobres para premiações e campeonatos.",
  },
  {
    id: 18,
    name: "Lembrancinhas de Casamento Geométricas",
    category: "Eventos",
    categoryId: "eventos",
    price: "A partir de R$ 9,90",
    rating: 5.0,
    reviews: 72,
    image: "event-3d.jpg",
    badge: "Eventos",
    shopeeUrl: SHOPEE_STORE,
    desc: "Mini vasinhos e chaveiros personalizados sob medida para o tema e paleta de cores do seu evento.",
  },
  {
    id: 19,
    name: "Espremedor de Tubo de Pasta Smart",
    category: "Utilidades",
    categoryId: "utilidades",
    price: "R$ 19,90",
    rating: 4.6,
    reviews: 145,
    image: "utility-3d.jpg",
    badge: "Útil",
    shopeeUrl: SHOPEE_STORE,
    desc: "Espremedor giratório super prático para aproveitar 100% de cremes, pastas e pomadas em tubo.",
  },
  {
    id: 20,
    name: "Suporte de Celular Flexível para Tomada",
    category: "Utilidades",
    categoryId: "utilidades",
    price: "R$ 29,90",
    rating: 4.8,
    reviews: 82,
    image: "utility-3d.jpg",
    badge: "Inovador",
    shopeeUrl: SHOPEE_STORE,
    desc: "Apoio inteligente para celular enquanto carrega direto na tomada, evitando fios soltos."
  }
];

interface ProductGridProps {
  settings?: {
    shopeeStoreUrl: string;
  };
}

export function ProductGrid({ settings }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>(FALLBACK_PRODUCTS);
  const shopeeStoreUrl = settings?.shopeeStoreUrl || "https://shopee.com.br/inovastudio";

  const getProductShopeeUrl = (prodUrl: string) => {
    if (!prodUrl || prodUrl === "https://shopee.com.br/inovastudio" || prodUrl.trim() === "") {
      return shopeeStoreUrl;
    }
    return prodUrl;
  };
  const [filters, setFilters] = useState<{ id: string; label: string }[]>([
    { id: "all", label: "Todos os produtos" },
    { id: "decorativos", label: "Decorativos" },
    { id: "brinquedos", label: "Brinquedos" },
    { id: "aquario", label: "Aquário" },
    { id: "lustres", label: "Lustres" },
    { id: "personalizados", label: "Personalizados" },
    { id: "pets", label: "Pets" },
    { id: "suportes", label: "Suportes" },
    { id: "organizacao", label: "Organização" },
    { id: "datas-festivas", label: "Datas Festivas" },
    { id: "eventos", label: "Eventos" },
    { id: "utilidades", label: "Utilidades" },
    { id: "profissionais", label: "Profissionais" },
    { id: "saude-dia-a-dia", label: "Saúde e Dia a Dia" },
    { id: "automotivas", label: "Automotivas" }
  ]);
  const [active, setActive] = useState("all");
  const [liked, setLiked] = useState<number[]>([]);

  // Fetch products and categories dynamically from Firestore API
  useEffect(() => {
    // Fetch Categories to build dynamic filters
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.categories && data.categories.length > 0) {
          const dynamicFilters = [
            { id: "all", label: "Todos os produtos" },
            ...data.categories.map((cat: any) => ({
              id: cat.id,
              label: cat.label
            }))
          ];
          setFilters(dynamicFilters);
        }
      })
      .catch((err) => console.error("Error loading categories for filters:", err));

    // Fetch Products
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.products && data.products.length > 0) {
          setProducts(data.products);
        }
      })
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  // Helper to identify best sellers (mais vendidos)
  const isBestSeller = (p: Product) => {
    const badgeLower = (p.badge || "").toLowerCase();
    return (
      badgeLower.includes("vendido") ||
      badgeLower.includes("campeão") ||
      badgeLower.includes("sucesso") ||
      badgeLower.includes("destaque") ||
      p.rating >= 4.9 && p.reviews >= 40
    );
  };

  // Sort: Best sellers first, then sort by reviews count descend
  const sortedProducts = [...products].sort((a, b) => {
    const aBest = isBestSeller(a) ? 1 : 0;
    const bBest = isBestSeller(b) ? 1 : 0;
    if (aBest !== bBest) return bBest - aBest;
    return b.reviews - a.reviews;
  });

  // Calculate ranks of each best-seller in the sorted products
  const bestSellerRanks: Record<number, number> = {};
  let bestSellerCount = 0;
  sortedProducts.forEach((p) => {
    if (isBestSeller(p)) {
      bestSellerCount++;
      bestSellerRanks[p.id] = bestSellerCount;
    }
  });

  // Listen to hash change to support smooth scrolling but KEEP "Todos" active in the catalog
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        // Find if there is an anchored element for smooth scrolling
        const targetElement = document.getElementById(hash);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
        // Always reset active to "all" (Todos) when externally navigating so catalog never leaves Todos
        setActive("all");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    // Call once on mount
    handleHashChange();

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const filtered =
    active === "all" ? sortedProducts : products.filter((p) => p.categoryId === active);

  return (
    <section
      id="catalogo"
      style={{ padding: "6rem 2rem", background: "var(--color-bg)" }}
    >
      <div style={{ maxWidth: 1360, margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "1rem",
            flexWrap: "wrap",
            marginBottom: "2.5rem",
          }}
        >
          <div>
            <span className="section-label">Catálogo</span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.025em",
                color: "var(--color-fg)",
                marginTop: "0.625rem",
              }}
            >
              Peças que você vai amar
            </h2>
          </div>
          <a
            href={SHOPEE_STORE}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shopee"
            style={{ fontSize: "0.825rem", padding: "0.6rem 1.2rem" }}
          >
            <ExternalLink size={14} />
            Ver todos na Shopee
          </a>
        </div>

        {/* Filter tabs */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
            marginBottom: "2.5rem",
          }}
        >
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => {
                setActive(f.id);
                // Also update the hash for seamless navigation sharing
                if (f.id === "all") {
                  window.history.pushState(null, "", window.location.pathname);
                } else {
                  window.location.hash = f.id;
                }
              }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.8rem",
                fontWeight: 600,
                padding: "0.5rem 1.1rem",
                borderRadius: "2rem",
                border: active === f.id ? "1px solid var(--color-accent)" : "1px solid var(--color-border)",
                background: active === f.id ? "var(--color-accent-soft)" : "transparent",
                color: active === f.id ? "var(--color-accent)" : "var(--color-fg-muted)",
                cursor: "pointer",
                transition: "all 0.2s",
                letterSpacing: "0.01em",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          style={{ gap: "1.125rem" }}
        >
          {filtered.map((product) => (
            <div key={product.id} className="card" style={{ display: "flex", flexDirection: "column" }}>
              {/* Image */}
              <div
                className="group"
                style={{
                  position: "relative",
                  aspectRatio: "1/1",
                  overflow: "hidden",
                  borderRadius: "0.875rem 0.875rem 0 0",
                }}
              >
                <img
                  src={getSafeProductImage(product.id, product.image)}
                  alt={product.name}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.45s cubic-bezier(0.22,1,0.36,1)",
                  }}
                  className="group-hover:scale-105"
                />

                 {/* Golden Rank Badge for Best Sellers, or fallback standard badge */}
                {active === "all" && bestSellerRanks[product.id] ? (
                  <span
                    style={{
                      position: "absolute",
                      top: "0.75rem",
                      left: "0.75rem",
                      background: "linear-gradient(135deg, #DFB35A 0%, #B5893D 50%, #906B2E 100%)",
                      border: "1px solid rgba(255, 255, 255, 0.45)",
                      color: "#121214",
                      fontFamily: "var(--font-display)",
                      fontSize: "0.7rem",
                      fontWeight: 850,
                      letterSpacing: "0.02em",
                      padding: "0.35rem 0.7rem",
                      borderRadius: "0.5rem",
                      boxShadow: "0 4px 12px rgba(223, 179, 90, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.1) inset",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      zIndex: 10,
                      textTransform: "uppercase",
                    }}
                  >
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", fontWeight: 900 }}>#{bestSellerRanks[product.id]}</span>
                    <span>Mais Vendido</span>
                  </span>
                ) : (
                  product.badge && (
                    <span
                      style={{
                        position: "absolute",
                        top: "0.75rem",
                        left: "0.75rem",
                        background: "rgba(9,9,14,0.82)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "#F4F4F8",
                        fontFamily: "var(--font-display)",
                        fontSize: "0.68rem",
                        fontWeight: 600,
                        letterSpacing: "0.04em",
                        padding: "0.3rem 0.65rem",
                        borderRadius: "2rem",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      {product.badge}
                    </span>
                  )
                )}

                {/* Wishlist */}
                <button
                  aria-label="Favoritar"
                  onClick={() =>
                    setLiked((prev) =>
                      prev.includes(product.id)
                        ? prev.filter((id) => id !== product.id)
                        : [...prev, product.id]
                    )
                  }
                  style={{
                    position: "absolute",
                    top: "0.75rem",
                    right: "0.75rem",
                    background: "rgba(9,9,14,0.72)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "50%",
                    width: 32,
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    backdropFilter: "blur(8px)",
                    transition: "background 0.2s",
                  }}
                >
                  <Heart
                    size={14}
                    style={{
                      color: liked.includes(product.id) ? "#F472B6" : "rgba(244,244,248,0.7)",
                      fill: liked.includes(product.id) ? "#F472B6" : "none",
                    }}
                  />
                </button>

                {/* Quick buy on hover */}
                <div
                  className="group-hover:translate-y-0"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "0.75rem",
                    transform: "translateY(100%)",
                    transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)",
                  }}
                >
                  <a
                    href={getProductShopeeUrl(product.shopeeUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-shopee"
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      fontSize: "0.8rem",
                      padding: "0.65rem 1rem",
                    }}
                  >
                    <ShoppingCart size={14} />
                    Comprar na Shopee
                  </a>
                </div>
              </div>

              {/* Info */}
              <div
                style={{
                  padding: "1rem 1.125rem 1.125rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  flex: 1,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--color-accent)",
                  }}
                >
                  {product.category}
                </span>

                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "0.975rem",
                    color: "var(--color-fg)",
                    lineHeight: 1.3,
                  }}
                >
                  {product.name}
                </h3>

                <p
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--color-fg-muted)",
                    lineHeight: 1.55,
                    flex: 1,
                  }}
                >
                  {product.desc}
                </p>

                {/* Rating */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  {[1,2,3,4,5].map((i) => (
                    <Star
                      key={i}
                      size={11}
                      style={{
                        fill: i <= Math.floor(product.rating) ? "#FACC15" : "none",
                        color: i <= Math.floor(product.rating) ? "#FACC15" : "var(--color-muted)",
                      }}
                    />
                  ))}
                  <span style={{ fontSize: "0.73rem", color: "var(--color-fg-muted)", marginLeft: 2 }}>
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Price row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "0.625rem",
                    borderTop: "1px solid var(--color-border)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: "1rem",
                        color: "var(--color-fg)",
                      }}
                    >
                      {product.price}
                    </span>
                    {product.oldPrice && (
                      <span
                        style={{
                          fontSize: "0.73rem",
                          textDecoration: "line-through",
                          color: "var(--color-muted)",
                        }}
                      >
                        {product.oldPrice}
                      </span>
                    )}
                  </div>

                  <a
                    href={getProductShopeeUrl(product.shopeeUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "0.73rem",
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      color: "var(--color-shopee)",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.2rem",
                      opacity: 0.85,
                      transition: "opacity 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.85")}
                  >
                    Shopee <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
