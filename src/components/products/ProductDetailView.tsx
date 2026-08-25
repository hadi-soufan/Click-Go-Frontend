"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, CreditCard, Store, Car, Shield, BookmarkPlus, Check, ZoomIn } from "lucide-react";
import type { Product } from "@/types/product";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { formatPrice, localize } from "@/lib/utils";
import { getCategory } from "@/data/categories";
import { StarRating } from "@/components/StarRating";
import { ProductCard } from "@/components/ProductCard";
import { useCartStore } from "@/lib/cart-store";

type FulfillmentOption = "pickup" | "delivery";

export function ProductDetailView({ product, related }: { product: Product; related: Product[] }) {
  const { locale, t } = useLocale();
  const addItem = useCartStore((state) => state.addItem);
  const category = getCategory(product.category);
  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  const [activeImage, setActiveImage] = useState(gallery[0]);
  const [fulfillment, setFulfillment] = useState<FulfillmentOption>(
    product.fulfillment.pickupToday ? "pickup" : "delivery"
  );
  const [added, setAdded] = useState(false);

  const monthly = Math.max(1, Math.round(product.price / 24));

  const handleAdd = () => {
    addItem(product, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="mx-auto flex w-full max-w-full lg:max-w-container-max flex-col gap-margin-desktop px-margin-mobile py-stack-lg md:px-margin-desktop">
    <div className="flex w-full flex-col gap-gutter md:flex-row">
      {/* Gallery */}
      <section className="flex max-w-3xl flex-1 flex-col gap-stack-md">
        <nav className="mb-4 flex items-center gap-2 text-body-sm text-on-surface-variant">
          <Link href="/" className="hover:underline">
            {t("product.breadcrumbHome")}
          </Link>
          <ChevronRight className="h-4 w-4 rtl:rotate-180" />
          {category && (
            <>
              <Link href={`/products?category=${category.id}`} className="hover:underline">
                {localize(category.name, locale)}
              </Link>
              <ChevronRight className="h-4 w-4 rtl:rotate-180" />
            </>
          )}
          <span className="text-on-surface">{localize(product.name, locale)}</span>
        </nav>

        <ZoomableImage src={activeImage} alt={localize(product.name, locale)}>
          {product.badge === "newRelease" && (
            <div className="absolute start-4 top-4 rounded-full bg-tertiary-container px-3 py-1 text-label-bold font-label-bold text-on-tertiary shadow-sm">
              {t("product.newRelease")}
            </div>
          )}
        </ZoomableImage>

        {gallery.length > 1 && (
          <div className="hide-scrollbar flex gap-stack-sm overflow-x-auto pb-2">
            {gallery.map((image) => (
              <button
                key={image}
                onClick={() => setActiveImage(image)}
                className={`h-20 w-20 shrink-0 rounded-sm border-2 bg-surface-container-lowest p-2 transition-colors ${
                  activeImage === image ? "border-primary" : "border-surface-variant hover:border-outline"
                }`}
              >
                <Image src={image} alt="" width={80} height={80} className="h-full w-full object-contain mix-blend-multiply dark:mix-blend-normal" />
              </button>
            ))}
          </div>
        )}

        <div className="hidden md:block">
          <h2 className="mb-2 text-headline-sm font-headline-sm text-on-surface">{t("product.description")}</h2>
          <p className="text-body-md text-on-surface-variant">{localize(product.description, locale)}</p>
        </div>
      </section>

      {/* Buying panel */}
      <section className="flex w-full shrink-0 flex-col gap-stack-lg md:w-[400px] lg:w-[480px]">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-label-bold font-label-bold text-primary">{product.brand}</span>
            <span className="text-body-sm text-on-surface-variant">
              | {t("productDetail.model")}: {product.id.toUpperCase()}
            </span>
          </div>
          <h1 className="text-headline-xl-mobile font-headline-xl-mobile text-on-surface md:text-headline-xl md:font-headline-xl">
            {localize(product.name, locale)}
          </h1>
          <div className="mt-2 flex items-center gap-2">
            <StarRating rating={product.rating} size={20} />
            <span className="text-body-sm text-on-surface-variant">
              ({product.rating}) {product.reviewCount.toLocaleString(locale === "ar" ? "ar-EG" : "en-US")} {t("product.reviews")}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-sm border border-surface-variant bg-surface-container-lowest p-stack-md">
          <div className="flex items-baseline gap-2">
            <span className="text-price-display font-price-display text-on-surface">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-body-md text-on-surface-variant line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          <div className="flex items-start gap-3 rounded-md bg-soft-blue-bg p-3">
            <CreditCard className="mt-0.5 h-5 w-5 text-primary" />
            <div>
              <p className="text-body-md font-semibold text-on-surface">
                {t("productDetail.financingPrefix")} ${monthly}
                {t("productDetail.financingSuffix")}
              </p>
              <p className="text-body-sm text-on-surface-variant">
                {t("productDetail.financingTerms")} <span className="cursor-pointer text-primary hover:underline">{t("productDetail.learnHow")}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-stack-md">
          <h3 className="text-headline-sm font-headline-sm text-on-surface">{t("productDetail.howToGetItem")}</h3>
          <div className="grid grid-cols-2 gap-3">
            <FulfillmentTile
              icon={Store}
              label={t("productDetail.pickupOption")}
              detail={product.fulfillment.pickupToday ? t("product.pickupToday") : t("productDetail.pickupOutOfStock")}
              active={fulfillment === "pickup"}
              disabled={!product.fulfillment.pickupToday}
              onClick={() => product.fulfillment.pickupToday && setFulfillment("pickup")}
            />
            <FulfillmentTile
              icon={Car}
              label={t("productDetail.deliveryOption")}
              detail={t("productDetail.deliveryFromStore")}
              active={fulfillment === "delivery"}
              disabled={false}
              onClick={() => setFulfillment("delivery")}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={handleAdd}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 px-6 text-label-bold font-label-bold text-on-primary transition-colors hover:bg-on-primary-fixed-variant"
          >
            {added ? <Check className="h-4 w-4" /> : null}
            {added ? t("product.added") : t("product.addToCart")}
          </button>
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-full border border-primary bg-surface-container-lowest py-3 px-6 text-label-bold font-label-bold text-primary transition-colors hover:bg-primary-fixed/20"
          >
            <BookmarkPlus className="h-4 w-4" />
            {t("productDetail.addToList")}
          </button>
        </div>

        <div className="flex items-start gap-4 rounded-sm border border-surface-variant bg-surface-container-lowest p-4">
          <Shield className="h-8 w-8 shrink-0 text-secondary-fixed-dim" />
          <div className="flex-1">
            <h4 className="text-label-bold font-label-bold text-on-surface">{t("productDetail.protectionPlan")}</h4>
            <p className="mt-1 text-body-sm text-on-surface-variant">{t("productDetail.protectionPlanDesc")}</p>
          </div>
          <button type="button" className="shrink-0 text-label-bold font-label-bold text-primary hover:underline">
            {t("productDetail.protectionAdd")}
          </button>
        </div>

        <div className="md:hidden">
          <h2 className="mb-2 text-headline-sm font-headline-sm text-on-surface">{t("product.description")}</h2>
          <p className="text-body-md text-on-surface-variant">{localize(product.description, locale)}</p>
        </div>

        <div>
          <h2 className="mb-2 text-headline-sm font-headline-sm text-on-surface">{t("productDetail.keyFeatures")}</h2>
          <ul className="flex flex-col gap-2">
            {product.specs.map((spec, index) => (
              <li key={index} className="flex items-start gap-2 text-body-md text-on-surface-variant">
                <Check className="mt-1 h-4 w-4 shrink-0 text-primary" />
                {localize(spec, locale)}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>

      {related.length > 0 && (
        <section className="w-full">
          <h2 className="mb-4 text-headline-md font-headline-md text-on-background">{t("product.relatedProducts")}</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function ZoomableImage({ src, alt, children }: { src: string; alt: string; children?: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoomed, setZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setPosition({ x: Math.min(100, Math.max(0, x)), y: Math.min(100, Math.max(0, y)) });
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setZoomed(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setZoomed(false)}
      className="group relative flex aspect-square w-full cursor-zoom-in items-center justify-center overflow-hidden rounded-sm border border-surface-variant bg-surface-container-lowest p-stack-lg"
    >
      <Image
        src={src}
        alt={alt}
        width={600}
        height={600}
        priority
        className="h-full w-full object-contain mix-blend-multiply dark:mix-blend-normal"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-surface-container-lowest bg-no-repeat opacity-0 mix-blend-multiply transition-opacity duration-150 dark:mix-blend-normal"
        style={{
          opacity: zoomed ? 1 : 0,
          backgroundImage: `url(${src})`,
          backgroundPosition: `${position.x}% ${position.y}%`,
          backgroundSize: "220%",
        }}
      />
      <div className="pointer-events-none absolute bottom-4 end-4 flex items-center gap-1 rounded-full bg-surface-container-lowest/90 px-3 py-1.5 text-body-sm text-on-surface-variant opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
        <ZoomIn className="h-4 w-4" />
      </div>
      {children}
    </div>
  );
}

function FulfillmentTile({
  icon: Icon,
  label,
  detail,
  active,
  disabled,
  onClick,
}: {
  icon: typeof Store;
  label: string;
  detail: string;
  active: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex h-full flex-col items-center gap-2 rounded-sm border-2 p-3 text-center transition-colors ${
        active ? "border-primary bg-primary-fixed/20" : "border-outline-variant hover:bg-surface-container-low"
      } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
    >
      <Icon className={`h-6 w-6 ${active ? "text-primary" : "text-on-surface-variant"}`} />
      <span className="text-label-bold font-label-bold text-on-surface">{label}</span>
      <span className={`text-body-sm ${disabled ? "text-error" : "text-on-surface-variant"}`}>{detail}</span>
    </button>
  );
}
