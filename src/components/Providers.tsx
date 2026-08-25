"use client";

import { useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { LocaleProvider } from "@/lib/i18n/LocaleProvider";
import { useCartStore } from "@/lib/cart-store";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <LocaleProvider>{children}</LocaleProvider>
    </ThemeProvider>
  );
}
