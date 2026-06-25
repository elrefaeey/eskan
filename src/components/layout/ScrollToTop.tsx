"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function scrollWindowToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export default function ScrollToTop() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    scrollWindowToTop();
  }, [pathname, searchParams]);

  return null;
}
