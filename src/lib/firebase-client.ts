import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  deleteDoc
} from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";
import { AppSettings, Product } from "../types";

// Initialize Firebase App client-side
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = firebaseConfig.firestoreDatabaseId 
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId) 
  : getFirestore(app);

// Get settings directly from Firestore (client fallback)
export async function getSettingsClient(): Promise<AppSettings | null> {
  try {
    const snapshot = await getDocs(collection(db, "settings"));
    const generalDoc = snapshot.docs.find(d => d.id === "general");
    if (!generalDoc) {
      return null;
    }
    return generalDoc.data() as AppSettings;
  } catch (err) {
    console.error("Error fetching settings directly from Firestore client:", err);
    return null;
  }
}

// Save settings directly to Firestore (client fallback)
export async function saveSettingsClient(settings: AppSettings): Promise<void> {
  const docRef = doc(db, "settings", "general");
  await setDoc(docRef, settings);
}

// Get categories directly from Firestore (client fallback)
export async function getCategoriesClient(): Promise<any[]> {
  try {
    const snapshot = await getDocs(collection(db, "categories"));
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (err) {
    console.error("Error fetching categories directly from Firestore client:", err);
    return [];
  }
}

// Get products directly from Firestore (client fallback)
export async function getProductsClient(): Promise<Product[]> {
  try {
    const snapshot = await getDocs(collection(db, "products"));
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        id: typeof data.id === "number" ? data.id : Number(doc.id) || 0
      } as Product;
    });
  } catch (err) {
    console.error("Error fetching products directly from Firestore client:", err);
    return [];
  }
}

// Save or update product directly in Firestore
export async function saveProductClient(product: Product): Promise<void> {
  const docRef = doc(db, "products", String(product.id));
  await setDoc(docRef, product);
}

// Delete product directly in Firestore
export async function deleteProductClient(productId: number): Promise<void> {
  const docRef = doc(db, "products", String(productId));
  await deleteDoc(docRef);
}

// Get messages directly from Firestore
export async function getMessagesClient(): Promise<any[]> {
  try {
    const snapshot = await getDocs(collection(db, "messages"));
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (err) {
    console.error("Error fetching messages directly from Firestore client:", err);
    return [];
  }
}

// Update a message directly in Firestore
export async function updateMessageClient(id: string, updates: any): Promise<void> {
  const docRef = doc(db, "messages", id);
  await setDoc(docRef, updates, { merge: true });
}

// Save a new message directly in Firestore
export async function addMessageClient(message: any): Promise<void> {
  const docRef = doc(collection(db, "messages"));
  await setDoc(docRef, message);
}

// Delete a message directly in Firestore
export async function deleteMessageClient(id: string): Promise<void> {
  const docRef = doc(db, "messages", id);
  await deleteDoc(docRef);
}
