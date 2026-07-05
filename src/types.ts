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

export interface Category {
  id: string;
  label: string;
  desc: string;
  image: string;
  href: string;
  imageScale?: string;
}
