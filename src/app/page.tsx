import { Hero } from "@/components/home/Hero";
import { PromoGrid } from "@/components/home/PromoGrid";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ProductRail } from "@/components/home/ProductRail";
import { ValueProps } from "@/components/home/ValueProps";
import { BrandStrip } from "@/components/home/BrandStrip";
import { Newsletter } from "@/components/home/Newsletter";
import { products } from "@/data/products";

export default function HomePage() {
  const flashDeals = products.filter((p) => p.originalPrice).slice(0, 8);
  const bestSellers = products.filter((p) => p.badge === "bestSeller" || p.rating >= 4.6).slice(0, 8);

  return (
    <div className="mx-auto flex w-full max-w-full lg:max-w-container-max flex-col gap-stack-lg px-margin-mobile py-stack-lg md:gap-margin-desktop md:px-margin-desktop">
      <Hero />
      <PromoGrid />
      <CategoryGrid />
      <ProductRail titleKey="home.flashDeals" subtitleKey="home.flashDealsSubtitle" products={flashDeals} viewAllHref="/products" />
      <ValueProps />
      <ProductRail titleKey="home.bestSellers" subtitleKey="home.bestSellersSubtitle" products={bestSellers} viewAllHref="/products" />
      <BrandStrip />
      <Newsletter />
    </div>
  );
}
