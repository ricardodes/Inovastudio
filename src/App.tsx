import { useState, useEffect, lazy, Suspense } from "react";
import { NavHeader } from "@/components/NavHeader";
import { Hero } from "@/components/Hero";
import { CategoryFloat } from "@/components/CategoryFloat";
import { ProductGrid } from "@/components/ProductGrid";
import { WhyUs } from "@/components/WhyUs";
import { Testimonials } from "@/components/Testimonials";
import { ContactBanner } from "@/components/ContactBanner";
import { Footer } from "@/components/Footer";
import { GlowingWaves } from "@/components/GlowingWaves";
import { MessageCircle } from "lucide-react";
import { AppSettings } from "@/types";

const AdminPanel = lazy(() =>
  import("@/components/AdminPanel").then((module) => ({ default: module.AdminPanel }))
);

const DEFAULT_SETTINGS: AppSettings = {
  storeName: "InovaStudio",
  storeDescription: "Peças decorativas, colecionáveis e utilidades premium impressas em 3D de alta precisão. Traga sua ideia para o mundo real!",
  shopeeStoreUrl: "https://shopee.com.br/inovastudio",
  whatsAppPhone: "5511999999999",
  whatsAppMessage: "Olá! Quero fazer um pedido!",
  whatsAppEnabled: true,
  socialInstagram: "inovastudio3d",
  socialFacebook: "",
  socialYoutube: "",
  socialTelegram: "",
  wholesaleWhatsApp: "5511999999999",
  wholesaleTelegram: "https://t.me/inovastudio",
  logoUrl: "",
  adminPassword: "admin123",
  isAdminOnline: true,
  contactEmail: ""
};

const DAMASK_WALLPAPER = `data:image/svg+xml,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320">
    <defs>
      <!-- Premium 3D Satin Cyan/Teal Gradient -->
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#00b4d8" stop-opacity="0.85" />
        <stop offset="35%" stop-color="#0077b6" stop-opacity="0.65" />
        <stop offset="75%" stop-color="#03045e" stop-opacity="0.4" />
        <stop offset="100%" stop-color="#02050c" stop-opacity="0.15" />
      </linearGradient>

      <!-- Glossy 3D Highlight for that beautiful shine -->
      <linearGradient id="h" x1="100%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stop-color="#90e0ef" stop-opacity="0.4" />
        <stop offset="60%" stop-color="#0096c7" stop-opacity="0.1" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </linearGradient>

      <!-- Strong 3D Drop Shadow to elevate elements from the dark background -->
      <filter id="ds" x="-20%" y="-20%" width="150%" height="150%">
        <feDropShadow dx="3" dy="6" stdDeviation="6" flood-color="#000000" flood-opacity="0.95" />
        <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="#000000" flood-opacity="0.8" />
      </filter>
    </defs>

    <g filter="url(#ds)">
      <!-- Symmetrical Center Baroque Medallion -->
      <path d="M160 30 C170 65, 195 90, 225 80 C205 115, 180 135, 160 175 C140 135, 115 115, 95 80 C125 90, 150 65, 160 30 Z" fill="url(#g)" stroke="rgba(0, 180, 216, 0.25)" stroke-width="1" />
      <path d="M160 70 C166 90, 185 100, 195 100 C178 118, 172 135, 160 150 C148 135, 142 118, 125 100 C135 100, 154 90, 160 70 Z" fill="url(#h)" />

      <!-- Ornate Foliage / Curly Scrolls Left -->
      <path d="M25 25 C55 35, 70 65, 50 90 C80 85, 110 105, 95 140 C75 130, 60 155, 75 185 C55 165, 30 170, 10 155" fill="none" stroke="url(#g)" stroke-width="8" stroke-linecap="round" />
      <path d="M25 25 C55 35, 70 65, 50 90" fill="url(#g)" />
      
      <!-- Ornate Foliage / Curly Scrolls Right -->
      <path d="M295 25 C265 35, 250 65, 270 90 C240 85, 210 105, 225 140 C245 130, 260 155, 245 185 C265 165, 290 170, 310 155" fill="none" stroke="url(#g)" stroke-width="8" stroke-linecap="round" />
      <path d="M295 25 C265 35, 250 65, 270 90" fill="url(#g)" />

      <!-- Bottom Ornate Leaves Left -->
      <path d="M25 295 C55 285, 70 255, 50 230 C80 235, 110 215, 95 180 C75 190, 60 165, 75 135 C55 155, 30 150, 10 165" fill="none" stroke="url(#g)" stroke-width="7" stroke-linecap="round" />
      <path d="M25 295 C55 285, 70 255, 50 230" fill="url(#g)" />

      <!-- Bottom Ornate Leaves Right -->
      <path d="M295 295 C265 285, 250 255, 270 230 C240 235, 210 215, 225 180 C245 190, 260 165, 245 135 C265 155, 290 150, 310 165" fill="none" stroke="url(#g)" stroke-width="7" stroke-linecap="round" />
      <path d="M295 295 C265 285, 250 255, 270 230" fill="url(#g)" />

      <!-- Seamless Connecting Waves -->
      <path d="M0 160 C55 175, 105 195, 160 195 C215 195, 265 175, 320 160" fill="none" stroke="url(#g)" stroke-width="4.5" stroke-linecap="round" />
      <path d="M0 0 C55 10, 105 35, 160 35 C215 35, 265 10, 320 0" fill="none" stroke="url(#g)" stroke-width="4.5" stroke-linecap="round" />
      <path d="M0 320 C55 310, 105 285, 160 285 C215 285, 265 310, 320 320" fill="none" stroke="url(#g)" stroke-width="4.5" stroke-linecap="round" />

      <!-- Aesthetic Accents and Dots -->
      <circle cx="160" cy="220" r="6" fill="url(#h)" stroke="rgba(0, 180, 216, 0.3)" />
      <circle cx="160" cy="242" r="4" fill="url(#h)" />
      <circle cx="90" cy="155" r="5" fill="url(#h)" />
      <circle cx="230" cy="155" r="5" fill="url(#h)" />
    </g>
  </svg>
`)}`;

function App() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem("app_settings");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.storeName && parsed.storeName.toLowerCase().includes("bambuzau")) {
          localStorage.removeItem("app_settings");
          return DEFAULT_SETTINGS;
        }
        return parsed;
      }
    } catch (e) {
      console.error("Error reading cached settings:", e);
    }
    return DEFAULT_SETTINGS;
  });

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      if (!res.ok) throw new Error("API settings response not ok");
      const data = await res.json();
      if (data.success && data.settings) {
        setSettings(data.settings);
        try {
          localStorage.setItem("app_settings", JSON.stringify(data.settings));
        } catch (e) {}
        return;
      }
    } catch (err) {
      console.warn("API settings fetch failed, falling back to direct Firestore:", err);
      try {
        const { getSettingsClient } = await import("@/lib/firebase-client");
        const clientSettings = await getSettingsClient();
        if (clientSettings) {
          setSettings(clientSettings);
          try {
            localStorage.setItem("app_settings", JSON.stringify(clientSettings));
          } catch (e) {}
        }
      } catch (clientErr) {
        console.error("Client Firestore fallback failed:", clientErr);
      }
    }
  };

  useEffect(() => {
    fetchSettings();
    
    const handleLocation = () => {
      const isParamAdmin = 
        window.location.hash === "#admin" || 
        window.location.pathname === "/admin" || 
        window.location.pathname === "/admin/";
      setIsAdminMode(isParamAdmin);
    };

    window.addEventListener("hashchange", handleLocation);
    window.addEventListener("popstate", handleLocation);
    handleLocation();

    return () => {
      window.removeEventListener("hashchange", handleLocation);
      window.removeEventListener("popstate", handleLocation);
    };
  }, []);

  // Refresh settings when returning from admin mode
  useEffect(() => {
    if (!isAdminMode) {
      fetchSettings();
    }
  }, [isAdminMode]);

  // Synchronize document title and description dynamically for optimal SEO
  useEffect(() => {
    if (settings) {
      const storeName = settings.storeName || "InovaStudio";
      const storeDesc = settings.storeDescription || "Peças decorativas, colecionáveis e utilidades premium impressas em 3D de alta precisão.";
      
      document.title = `${storeName} - Impressão 3D de Alta Precisão`;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", storeDesc);
      }
      
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute("content", `${storeName} - Impressão 3D de Alta Precisão`);
      }

      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute("content", storeDesc);
      }

      // Dynamically update favicon link to the current logo with cache-busting only if custom logo is configured
      const customLogo = settings.logoUrl;
      if (customLogo) {
        const faviconLinks = document.querySelectorAll('link[rel*="icon"]');
        if (faviconLinks.length > 0) {
          faviconLinks.forEach(link => {
            link.setAttribute("href", `${customLogo}?v=${new Date().getTime()}`);
            if (customLogo.endsWith(".png") || customLogo.includes("logo-inova-transparent")) {
              link.setAttribute("type", "image/png");
            }
          });
        } else {
          const link = document.createElement('link');
          link.rel = 'icon';
          link.type = 'image/png';
          link.href = `${customLogo}?v=${new Date().getTime()}`;
          document.getElementsByTagName('head')[0].appendChild(link);
        }
      }
    }
  }, [settings]);

  const whatsAppUrl = `https://wa.me/${settings.whatsAppPhone}?text=${encodeURIComponent(settings.whatsAppMessage)}`;

  if (isAdminMode) {
    return (
      <Suspense fallback={
        <div style={{
          minHeight: "100vh",
          background: "#070708",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontFamily: "var(--font-display)",
          fontSize: "1rem"
        }}>
          Carregando painel administrativo...
        </div>
      }>
        <AdminPanel 
          onClose={() => {
            if (window.location.hash === "#admin") {
              window.location.hash = "";
            }
            if (window.location.pathname === "/admin" || window.location.pathname === "/admin/") {
              window.history.pushState({}, "", "/");
            }
            setIsAdminMode(false);
          }} 
        />
      </Suspense>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg)" }}>
      {/* Fixed nav overlays the hero */}
      <NavHeader settings={settings} />

      <main>
        <Hero settings={settings} />

        <CategoryFloat />

        {/* Animated blue and gold moving wave effect between categories and catalog */}
        <div style={{ position: "relative", height: "130px", overflow: "hidden", pointerEvents: "none", width: "100%", margin: "0 auto", background: "var(--color-bg)" }}>
          <GlowingWaves theme="cyan" yOffsets={[0.42, 0.52, 0.46, 0.5]} />
          {/* Subtle smooth mask so the waves fade out horizontally and vertically */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, var(--color-bg) 0%, transparent 12%, transparent 88%, var(--color-bg) 100%), linear-gradient(to bottom, var(--color-bg) 0%, transparent 15%, transparent 85%, var(--color-bg) 100%)",
            zIndex: 2
          }} />
        </div>

        {/* Anchor targets for nav deep-links */}
        <span id="lustres"        style={{ display: "block", marginTop: "-80px", paddingTop: "80px" }} />
        <span id="aquario"        style={{ display: "block" }} />
        <span id="brinquedos"     style={{ display: "block" }} />
        <span id="personalizados" style={{ display: "block" }} />

        <ProductGrid settings={settings} />

        {/* Seamless high-end 3D embossed dark wallpaper section encompassing WhyUs and Testimonials up to before the final header/banner */}
        <div
          style={{
            position: "relative",
            background: `
              radial-gradient(circle at center, rgba(0, 120, 180, 0.14) 0%, #070708 100%),
              url("${DAMASK_WALLPAPER}"),
              #070708
            `,
            backgroundSize: "auto, 280px 280px, auto",
            backgroundRepeat: "no-repeat, repeat, no-repeat",
          }}
        >
          {/* Gentle, seamless transition with absolutely no banding lines and lighter at the bottom to avoid darkening testimonials */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, #070708 0%, transparent 10%, transparent 90%, #070708 100%)",
            pointerEvents: "none"
          }} />
          
          <WhyUs />
          <Testimonials />
        </div>

        <ContactBanner settings={settings} />
      </main>

      <Footer settings={settings} />

      {/* WhatsApp FAB */}
      {settings.whatsAppEnabled && (
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Fale conosco pelo WhatsApp"
          style={{
            position: "fixed",
            bottom: "1.75rem",
            right: "1.75rem",
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "#25D366",
            color: "#fff",
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "0.82rem",
            padding: "0.75rem 1.25rem",
            borderRadius: "2rem",
            textDecoration: "none",
            boxShadow: "0 8px 28px rgba(37,211,102,0.4)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.04)";
            e.currentTarget.style.boxShadow = "0 12px 36px rgba(37,211,102,0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 8px 28px rgba(37,211,102,0.4)";
          }}
        >
          <MessageCircle size={17} />
          <span className="hidden sm:inline">Fale conosco</span>
        </a>
      )}
    </div>
  );
}

export default App;
