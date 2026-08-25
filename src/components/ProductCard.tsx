"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Truck, Store, Plus, Check } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/types/product";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { formatPrice, localize } from "@/lib/utils";
import { StarRating } from "./StarRating";
import { useCartStore } from "@/lib/cart-store";

const badgeStyles: Record<NonNullable<Product["badge"]>, string> = {
  bestseller: "bg-error text-on-error",
  bestSeller: "bg-deep-navy text-on-primary",
  rollback: "bg-error text-on-error",
  sale: "bg-tertiary-container text-on-tertiary",
  newRelease: "bg-tertiary-container text-on-tertiary",
};

export function ProductCard({ product }: { product: Product }) {
  const { locale, t } = useLocale();
  const addItem = useCartStore((state) => state.addItem);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    addItem(product, 1);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div className="group relative flex flex-col rounded-sm border border-surface-gray bg-surface-container-lowest p-4 transition-shadow duration-300 hover:shadow-lg">
      {product.badge && (
        <span
          className={`absolute start-4 top-4 z-10 rounded-full px-2 py-1 text-[12px] font-bold uppercase tracking-wider shadow-sm ${badgeStyles[product.badge]}`}
        >
          {t(`product.${product.badge}`)}
        </span>
      )}
      <button
        type="button"
        aria-label={t("common.addToWishlist")}
        className="absolute end-4 top-4 z-10 rounded-full bg-surface-container-lowest p-1 text-outline shadow-sm transition-colors hover:text-primary"
      >
        <Heart className="h-5 w-5" />
      </button>
      <Link href={`/products/${product.slug}`} className="mb-4 flex aspect-square items-center justify-center overflow-hidden rounded-sm bg-surface-bright p-4">
        <Image
          src={product.image}
          alt={localize(product.name, locale)}
          width={300}
          height={300}
          className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105 dark:mix-blend-normal"
        />
      </Link>
      <div className="flex flex-1 flex-col">
        <Link href={`/products/${product.slug}`}>
          <h3 className="mb-1 line-clamp-2 text-body-md font-semibold leading-tight text-on-surface hover:underline">
            {localize(product.name, locale)}
          </h3>
        </Link>
        <div className="mb-2 flex items-center gap-1">
          <StarRating rating={product.rating} size={14} />
          <span className="text-body-sm text-on-surface-variant">({product.reviewCount.toLocaleString(locale === "ar" ? "ar-EG" : "en-US")})</span>
        </div>
        <div className="mt-auto">
          <div className="mb-2 flex items-end gap-2">
            <span className="text-price-display font-price-display text-primary">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="mb-1 text-body-sm text-on-surface-variant line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          <div className="mb-4 flex items-center gap-2 text-body-sm text-on-surface-variant">
            {product.fulfillment.freeShipping && (
              <>
                <Truck className="h-[18px] w-[18px] text-primary" />
                {t("product.freeShipping")}
              </>
            )}
            {!product.fulfillment.freeShipping && product.fulfillment.twoDayShipping && (
              <>
                <Truck className="h-[18px] w-[18px] text-primary" />
                {t("product.twoDayShipping")}
              </>
            )}
            {!product.fulfillment.freeShipping && !product.fulfillment.twoDayShipping && product.fulfillment.pickupToday && (
              <>
                <Store className="h-[18px] w-[18px] text-secondary-container" />
                {t("product.pickupToday")}
              </>
            )}
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className="flex w-full items-center justify-center gap-1 rounded-full bg-primary py-3 text-label-bold font-label-bold text-on-primary transition-colors hover:bg-surface-tint"
          >
            {justAdded ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {justAdded ? t("product.added") : t("product.addToCart")}
          </button>
        </div>
      </div>
    </div>
  );
}
