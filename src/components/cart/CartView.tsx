"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice, localize } from "@/lib/utils";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

const TAX_RATE = 0.07;

export function CartView() {
  const { locale, t } = useLocale();
  const lines = useCartStore((state) => state.lines);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const subtotal = lines.reduce((sum, line) => sum + line.quantity * line.product.price, 0);
  const totalItems = lines.reduce((sum, line) => sum + line.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const cartProductIds = new Set(lines.map((line) => line.product.id));
  const recommended = products.filter((product) => !cartProductIds.has(product.id)).slice(0, 4);

  return (
    <div className="mx-auto w-full max-w-full lg:max-w-container-max px-margin-mobile py-stack-lg md:px-margin-desktop">
      <h1 className="mb-stack-lg text-headline-xl-mobile font-headline-xl-mobile text-on-background md:text-headline-xl md:font-headline-xl">
        {t("cart.title")}
      </h1>

      {lines.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-sm border border-dashed border-outline-variant py-20 text-center">
          <ShoppingBag className="h-12 w-12 text-outline" />
          <h2 className="text-headline-md font-headline-md text-on-surface">{t("cart.empty")}</h2>
          <p className="max-w-sm text-body-md text-on-surface-variant">{t("cart.emptyMessage")}</p>
          <Link
            href="/products"
            className="mt-2 rounded-full bg-primary px-6 py-3 text-label-bold font-label-bold text-on-primary hover:bg-surface-tint"
          >
            {t("cart.continueShopping")}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12">
          <div className="flex flex-col gap-stack-md lg:col-span-8">
            {lines.map((line) => (
              <div
                key={line.product.id}
                className="flex flex-col gap-stack-md rounded-sm border border-surface-variant bg-surface-container-lowest p-stack-md sm:flex-row"
              >
                <Link
                  href={`/products/${line.product.slug}`}
                  className="h-32 w-full shrink-0 overflow-hidden rounded-sm bg-surface-container-low sm:w-32"
                >
                  <Image
                    src={line.product.image}
                    alt={localize(line.product.name, locale)}
                    width={200}
                    height={200}
                    className="h-full w-full object-contain mix-blend-multiply p-2 dark:mix-blend-normal"
                  />
                </Link>
                <div className="flex flex-grow flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link href={`/products/${line.product.slug}`}>
                        <h3 className="text-headline-sm font-headline-sm text-on-surface hover:underline">
                          {localize(line.product.name, locale)}
                        </h3>
                      </Link>
                      <p className="mt-1 text-body-sm text-on-surface-variant">{line.product.brand}</p>
                    </div>
                    <span className="shrink-0 text-price-display font-price-display text-primary">
                      {formatPrice(line.product.price)}
                    </span>
                  </div>
                  <div className="mt-stack-md flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center overflow-hidden rounded-full border border-outline-variant">
                      <button
                        type="button"
                        onClick={() => setQuantity(line.product.id, line.quantity - 1)}
                        className="px-3 py-1 text-on-surface transition-colors hover:bg-surface-container"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-10 text-center text-body-md text-on-surface">{line.quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(line.product.id, line.quantity + 1)}
                        className="px-3 py-1 text-on-surface transition-colors hover:bg-surface-container"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-stack-sm">
                      <button type="button" className="text-label-bold font-label-bold text-primary hover:underline">
                        {t("cart.saveForLater")}
                      </button>
                      <span className="text-outline-variant">|</span>
                      <button
                        type="button"
                        onClick={() => removeItem(line.product.id)}
                        className="text-label-bold font-label-bold text-error hover:underline"
                      >
                        {t("cart.remove")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-stack-lg rounded-sm border border-surface-variant bg-surface-container-lowest p-stack-lg shadow-sm">
              <h2 className="mb-stack-md text-headline-md font-headline-md">{t("cart.orderSummary")}</h2>
              <div className="mb-stack-md flex flex-col gap-stack-sm border-b border-surface-variant pb-stack-md text-body-md text-on-surface-variant">
                <div className="flex justify-between">
                  <span>
                    {t("cart.subtotal")} ({totalItems} {t("cart.items")})
                  </span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("cart.shipping")}</span>
                  <span className="font-bold text-green-600">{t("cart.free")}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("cart.estimatedTax")}</span>
                  <span>{formatPrice(tax)}</span>
                </div>
              </div>
              <div className="mb-stack-lg flex items-end justify-between">
                <span className="text-headline-sm font-headline-sm text-on-surface">{t("cart.total")}</span>
                <span className="text-headline-xl font-headline-xl text-primary">{formatPrice(total)}</span>
              </div>
              <button className="w-full rounded-full bg-primary py-3 text-label-bold font-label-bold text-on-primary shadow-sm transition-colors hover:bg-on-primary-fixed-variant">
                {t("cart.checkout")}
              </button>
              <p className="mt-stack-sm text-center text-body-sm text-on-surface-variant">{t("cart.secureCheckout")}</p>
            </div>
          </div>
        </div>
      )}

      {recommended.length > 0 && (
        <section className="mt-margin-desktop">
          <h2 className="mb-stack-md text-headline-md font-headline-md">{t("cart.recommended")}</h2>
          <div className="grid grid-cols-2 gap-stack-md md:grid-cols-4">
            {recommended.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
