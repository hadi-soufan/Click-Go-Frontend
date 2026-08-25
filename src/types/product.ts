export type CategoryId =
  | "tv-home-theater"
  | "computers"
  | "audio"
  | "gaming"
  | "cell-phones"
  | "cameras"
  | "smart-home"
  | "accessories";

export interface LocalizedText {
  en: string;
  ar: string;
}

export interface Product {
  id: string;
  slug: string;
  name: LocalizedText;
  shortDescription: LocalizedText;
  description: LocalizedText;
  brand: string;
  category: CategoryId;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: "bestseller" | "bestSeller" | "rollback" | "sale" | "newRelease";
  image: string;
  gallery?: string[];
  specs: LocalizedText[];
  fulfillment: {
    freeShipping?: boolean;
    twoDayShipping?: boolean;
    pickupToday?: boolean;
  };
  inStock: boolean;
}
