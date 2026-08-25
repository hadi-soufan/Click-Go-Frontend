import type { CategoryId, LocalizedText } from "@/types/product";
import { Tv, Laptop, Headphones, Gamepad2, Smartphone, Camera, Home, Cable } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Category {
  id: CategoryId;
  name: LocalizedText;
  icon: LucideIcon;
}

export const categories: Category[] = [
  { id: "tv-home-theater", name: { en: "TV & Home Theater", ar: "التلفزيونات والمسرح المنزلي" }, icon: Tv },
  { id: "computers", name: { en: "Computers & Tablets", ar: "أجهزة الكمبيوتر والأجهزة اللوحية" }, icon: Laptop },
  { id: "audio", name: { en: "Audio", ar: "الصوتيات" }, icon: Headphones },
  { id: "gaming", name: { en: "Gaming", ar: "الألعاب" }, icon: Gamepad2 },
  { id: "cell-phones", name: { en: "Cell Phones", ar: "الهواتف المحمولة" }, icon: Smartphone },
  { id: "cameras", name: { en: "Cameras & Drones", ar: "الكاميرات والطائرات المسيّرة" }, icon: Camera },
  { id: "smart-home", name: { en: "Smart Home", ar: "المنزل الذكي" }, icon: Home },
  { id: "accessories", name: { en: "Accessories", ar: "الإكسسوارات" }, icon: Cable },
];

export function getCategory(id: CategoryId) {
  return categories.find((category) => category.id === id);
}
