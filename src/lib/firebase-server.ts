import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  writeBatch
} from "firebase/firestore";
import fs from "fs";
import path from "path";

// Find and load firebase-applet-config.json
const loadConfig = () => {
  const p = path.join(process.cwd(), "firebase-applet-config.json");
  if (fs.existsSync(p)) {
    try {
      return JSON.parse(fs.readFileSync(p, "utf-8"));
    } catch (e) {
      console.error("Error parsing Firebase config:", e);
    }
  }
  return null;
};

const config = loadConfig();
if (!config) {
  console.warn("WARNING: firebase-applet-config.json not found! Running in local fallback mode.");
}

export const app = config ? (getApps().length === 0 ? initializeApp(config) : getApp()) : null;
export const db = app ? (config.firestoreDatabaseId ? getFirestore(app, config.firestoreDatabaseId) : getFirestore(app)) : null;

// Category Interface
export interface Category {
  id: string;
  label: string;
  desc: string;
  image: string;
  href: string;
  imageScale?: string;
}

// Product Interface
export interface Product {
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

// Default seed categories (including the 5 original ones and 6 requested ones)
export const DEFAULT_CATEGORIES: Category[] = [
  {
    id: "decorativos",
    label: "Decorativos",
    desc: "Esculturas e arte 3D para cada ambiente",
    image: "art-sculpture.jpg",
    href: "#decorativos",
    imageScale: "center 30%",
  },
  {
    id: "lustres",
    label: "Lustres",
    desc: "Iluminação artesanal única",
    image: "lustres.jpg",
    href: "#lustres",
    imageScale: "center center",
  },
  {
    id: "aquario",
    label: "Aquário",
    desc: "Decorações exclusivas para aquarismo",
    image: "aquario.jpg",
    href: "#aquario",
    imageScale: "center top",
  },
  {
    id: "brinquedos",
    label: "Brinquedos",
    desc: "Articulados e colecionáveis",
    image: "dragon-3d.jpg",
    href: "#brinquedos",
    imageScale: "center 20%",
  },
  {
    id: "personalizados",
    label: "Personalizados",
    desc: "Festas, empresas e presentes únicos",
    image: "figurine-3d.jpg",
    href: "#personalizados",
    imageScale: "center 10%",
  },
  {
    id: "pets",
    label: "Pets",
    desc: "Acessórios e comedouros personalizados para o seu pet",
    image: "pet-3d.jpg",
    href: "#pets",
    imageScale: "center center",
  },
  {
    id: "suportes",
    label: "Suportes",
    desc: "Suportes para fones, controles, celulares e paredes",
    image: "support-3d.jpg",
    href: "#suportes",
    imageScale: "center center",
  },
  {
    id: "organizacao",
    label: "Organização",
    desc: "Organizadores modulares e práticos para sua rotina",
    image: "organizer-3d.jpg",
    href: "#organizacao",
    imageScale: "center center",
  },
  {
    id: "datas-festivas",
    label: "Datas Festivas",
    desc: "Decorações temáticas para Natal, Páscoa e datas festivas",
    image: "festive-3d.jpg",
    href: "#datas-festivas",
    imageScale: "center center",
  },
  {
    id: "eventos",
    label: "Eventos",
    desc: "Troféus, lembrancinhas e itens sob medida para eventos",
    image: "event-3d.jpg",
    href: "#eventos",
    imageScale: "center center",
  },
  {
    id: "utilidades",
    label: "Utilidades",
    desc: "Utensílios e soluções inteligentes para o dia a dia",
    image: "utility-3d.jpg",
    href: "#utilidades",
    imageScale: "center center",
  },
  {
    id: "profissionais",
    label: "Profissionais",
    desc: "Gabaritos, suportes técnicos e organizadores de ferramentas",
    image: "profissionais.jpg",
    href: "#profissionais",
    imageScale: "center center",
  },
  {
    id: "saude-dia-a-dia",
    label: "Saúde e Dia a Dia",
    desc: "Adaptadores ergonômicos e acessórios práticos de saúde",
    image: "saude.jpg",
    href: "#saude-dia-a-dia",
    imageScale: "center center",
  },
  {
    id: "automotivas",
    label: "Automotivas",
    desc: "Suportes veiculares, organizadores e peças customizadas",
    image: "automotivas.jpg",
    href: "#automotivas",
    imageScale: "center center",
  }
];export const DEFAULT_PRODUCTS: Product[] = [
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
    shopeeUrl: "https://shopee.com.br/inovastudio",
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
    shopeeUrl: "https://shopee.com.br/inovastudio",
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
    shopeeUrl: "https://shopee.com.br/inovastudio",
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
    shopeeUrl: "https://shopee.com.br/inovastudio",
    desc: "Miniatura detalhada de mago em resina de alta resolução.",
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
    shopeeUrl: "https://shopee.com.br/inovastudio",
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
    shopeeUrl: "https://shopee.com.br/inovastudio",
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
    shopeeUrl: "https://shopee.com.br/inovastudio",
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
    shopeeUrl: "https://shopee.com.br/inovastudio",
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
    shopeeUrl: "https://shopee.com.br/inovastudio",
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
    shopeeUrl: "https://shopee.com.br/inovastudio",
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
    shopeeUrl: "https://shopee.com.br/inovastudio",
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
    shopeeUrl: "https://shopee.com.br/inovastudio",
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
    shopeeUrl: "https://shopee.com.br/inovastudio",
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
    shopeeUrl: "https://shopee.com.br/inovastudio",
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
    shopeeUrl: "https://shopee.com.br/inovastudio",
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
    shopeeUrl: "https://shopee.com.br/inovastudio",
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
    shopeeUrl: "https://shopee.com.br/inovastudio",
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
    shopeeUrl: "https://shopee.com.br/inovastudio",
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
    shopeeUrl: "https://shopee.com.br/inovastudio",
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
    shopeeUrl: "https://shopee.com.br/inovastudio",
    desc: "Apoio inteligente para celular enquanto carrega direto na tomada, evitando fios soltos."
  }
];

// Helper functions for Firestore operations
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
      email: null,
      emailVerified: null,
      isAnonymous: null,
      tenantId: null,
      providerInfo: []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export async function getCategories(): Promise<Category[]> {
  if (!db) {
    console.warn("Firebase not configured. Returning DEFAULT_CATEGORIES fallback.");
    return DEFAULT_CATEGORIES;
  }
  try {
    const colRef = collection(db, "categories");
    const snapshot = await getDocs(colRef);
    if (snapshot.empty) {
      return [];
    }
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category));
  } catch (e: any) {
    if (e?.code === "permission-denied" || String(e).includes("permission")) {
      handleFirestoreError(e, OperationType.GET, "categories");
    }
    console.error("Error fetching categories from Firestore:", e);
    return [];
  }
}

export async function getProducts(): Promise<Product[]> {
  if (!db) {
    console.warn("Firebase not configured. Returning DEFAULT_PRODUCTS fallback.");
    return DEFAULT_PRODUCTS;
  }
  try {
    const colRef = collection(db, "products");
    const snapshot = await getDocs(colRef);
    if (snapshot.empty) {
      return [];
    }
    // Parse and sort by id
    const prods = snapshot.docs.map(doc => doc.data() as Product);
    return prods.sort((a, b) => Number(a.id) - Number(b.id));
  } catch (e: any) {
    if (e?.code === "permission-denied" || String(e).includes("permission")) {
      handleFirestoreError(e, OperationType.GET, "products");
    }
    console.error("Error fetching products from Firestore:", e);
    return [];
  }
}

// Product Write operations
export async function addProduct(prod: Product): Promise<void> {
  if (!db) {
    throw new Error("Firebase não configurado. Não é possível adicionar produtos no modo de fallback local.");
  }
  try {
    const docRef = doc(db, "products", String(prod.id));
    await setDoc(docRef, prod);
  } catch (e: any) {
    if (e?.code === "permission-denied" || String(e).includes("permission")) {
      handleFirestoreError(e, OperationType.WRITE, `products/${prod.id}`);
    }
    console.error("Error adding product to Firestore:", e);
    throw e;
  }
}

export async function deleteProduct(id: number): Promise<void> {
  if (!db) {
    throw new Error("Firebase não configurado. Não é possível remover produtos no modo de fallback local.");
  }
  try {
    const { deleteDoc } = await import("firebase/firestore");
    const docRef = doc(db, "products", String(id));
    await deleteDoc(docRef);
  } catch (e: any) {
    if (e?.code === "permission-denied" || String(e).includes("permission")) {
      handleFirestoreError(e, OperationType.DELETE, `products/${id}`);
    }
    console.error("Error deleting product from Firestore:", e);
    throw e;
  }
}

// Settings structures
export interface AppSettings {
  storeName: string;
  storeDescription: string;
  shopeeStoreUrl: string;
  whatsAppPhone: string;
  whatsAppMessage: string;
  whatsAppEnabled: boolean;
  socialInstagram?: string;
  socialFacebook?: string;
  socialYoutube?: string;
  socialTelegram?: string;
  wholesaleWhatsApp?: string;
  wholesaleTelegram?: string;
  logoUrl?: string;
  adminPassword?: string;
  isAdminOnline?: boolean;
  contactEmail?: string;
}

const DEFAULT_SETTINGS: AppSettings = {
  storeName: "InovaStudio",
  storeDescription: "Peças decorativas, colecionáveis e utilidades premium impressas em 3D de alta precisão. Traga sua ideia para o mundo real!",
  shopeeStoreUrl: "https://shopee.com.br/inovastudio",
  whatsAppPhone: "5511999999999",
  whatsAppMessage: "Olá! Quero fazer um pedido personalizado na InovaStudio!",
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
  contactEmail: "contato@inovastudio3d.com.br"
};

export interface Message {
  id?: string;
  name: string;
  email: string;
  phone: string;
  messageText: string;
  createdAt: string;
  read: boolean;
  replied: boolean;
}

export async function getMessages(): Promise<Message[]> {
  if (!db) {
    console.warn("Firebase not configured. Returning empty messages list.");
    return [];
  }
  try {
    const colRef = collection(db, "messages");
    const snapshot = await getDocs(colRef);
    if (snapshot.empty) {
      return [];
    }
    const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
    return msgs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (e: any) {
    if (e?.code === "permission-denied" || String(e).includes("permission")) {
      handleFirestoreError(e, OperationType.GET, "messages");
    }
    console.error("Error fetching messages from Firestore:", e);
    return [];
  }
}

export async function addMessage(msg: Omit<Message, "id" | "createdAt" | "read" | "replied">): Promise<void> {
  if (!db) {
    console.warn("Firebase not configured. Simulated sending message:", msg);
    return;
  }
  try {
    const colRef = collection(db, "messages");
    const docRef = doc(colRef);
    await setDoc(docRef, { ...msg, read: false, replied: false, createdAt: new Date().toISOString() });
  } catch (e: any) {
    if (e?.code === "permission-denied" || String(e).includes("permission")) {
      handleFirestoreError(e, OperationType.WRITE, "messages");
    }
    console.error("Error adding message to Firestore:", e);
    throw e;
  }
}

export async function deleteMessage(id: string): Promise<void> {
  if (!db) {
    throw new Error("Firebase não configurado. Não é possível excluir mensagens no modo de fallback local.");
  }
  try {
    const { deleteDoc } = await import("firebase/firestore");
    const docRef = doc(db, "messages", id);
    await deleteDoc(docRef);
  } catch (e: any) {
    if (e?.code === "permission-denied" || String(e).includes("permission")) {
      handleFirestoreError(e, OperationType.DELETE, `messages/${id}`);
    }
    console.error("Error deleting message from Firestore:", e);
    throw e;
  }
}

export async function updateMessageStatus(id: string, updates: Partial<Message>): Promise<void> {
  if (!db) {
    throw new Error("Firebase não configurado. Não é possível atualizar mensagens no modo de fallback local.");
  }
  try {
    const docRef = doc(db, "messages", id);
    await setDoc(docRef, updates, { merge: true });
  } catch (e: any) {
    if (e?.code === "permission-denied" || String(e).includes("permission")) {
      handleFirestoreError(e, OperationType.WRITE, `messages/${id}`);
    }
    console.error("Error updating message in Firestore:", e);
    throw e;
  }
}

export async function getSettings(): Promise<AppSettings> {
  if (!db) {
    console.warn("Firebase not configured. Returning DEFAULT_SETTINGS fallback.");
    return DEFAULT_SETTINGS;
  }
  try {
    const snapshot = await getDocs(collection(db, "settings"));
    const generalDoc = snapshot.docs.find(d => d.id === "general");
    if (!generalDoc) {
      return DEFAULT_SETTINGS;
    }
    return { ...DEFAULT_SETTINGS, ...generalDoc.data() } as AppSettings;
  } catch (e: any) {
    if (e?.code === "permission-denied" || String(e).includes("permission")) {
      handleFirestoreError(e, OperationType.GET, "settings");
    }
    console.error("Error fetching settings from Firestore:", e);
    return DEFAULT_SETTINGS;
  }
}

export async function saveSettings(settings: AppSettings): Promise<void> {
  if (!db) {
    throw new Error("Firebase não configurado. Não é possível salvar configurações no modo de fallback local.");
  }
  try {
    const docRef = doc(db, "settings", "general");
    await setDoc(docRef, settings);
  } catch (e: any) {
    if (e?.code === "permission-denied" || String(e).includes("permission")) {
      handleFirestoreError(e, OperationType.WRITE, "settings/general");
    }
    console.error("Error saving settings to Firestore:", e);
    throw e;
  }
}

export async function seedDatabaseIfEmpty() {
  if (!db) {
    console.warn("[Firebase Seeder] Firebase not configured. Skipping seeder.");
    return;
  }
  try {
    console.log("[Firebase Seeder] Checking database status...");
    
    // Seed settings
    const settingsCol = collection(db, "settings");
    const settingsSnapshot = await getDocs(settingsCol);
    if (settingsSnapshot.empty) {
      console.log("[Firebase Seeder] Settings collection is empty. Seeding DEFAULT_SETTINGS...");
      const docRef = doc(db, "settings", "general");
      await setDoc(docRef, DEFAULT_SETTINGS);
    }

    console.log("[Firebase Seeder] Synchronizing DEFAULT_CATEGORIES to Firestore...");
    const catBatch = writeBatch(db);
    for (const cat of DEFAULT_CATEGORIES) {
      const docRef = doc(db, "categories", cat.id);
      catBatch.set(docRef, cat, { merge: true });
    }
    await catBatch.commit();
    console.log("[Firebase Seeder] Categories synced successfully.");
    
    console.log("[Firebase Seeder] Synchronizing DEFAULT_PRODUCTS to Firestore...");
    const prodBatch = writeBatch(db);
    for (const prod of DEFAULT_PRODUCTS) {
      const docRef = doc(db, "products", String(prod.id));
      prodBatch.set(docRef, prod, { merge: true });
    }
    await prodBatch.commit();
    console.log("[Firebase Seeder] Products synced successfully.");
  } catch (e: any) {
    if (e?.code === "permission-denied" || String(e).includes("permission")) {
      handleFirestoreError(e, OperationType.WRITE, "seed");
    }
    console.error("[Firebase Seeder] Error seeding database:", e);
  }
}

