import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "دور الالكترونيات - سيتي سنتر",
  description:
    "دور الالكترونيات في سيتي سنتر المنصورة - أكبر مجمع متخصص في تجارة وصيانة وبيع الموبايلات وأجهزة الكمبيوتر واللابتوب وماكينات الطباعة.",
  keywords: ["الكترونيات سيتي سنتر", "محلات الكترونيات المنصورة"],
  alternates: { canonical: "/electronics-level" },
  openGraph: {
    title: "دور الالكترونيات - سيتي سنتر المنصورة",
    description:
      "دور الالكترونيات في سيتي سنتر المنصورة - أكبر مجمع متخصص في تجارة وصيانة وبيع الموبايلات وأجهزة الكمبيوتر واللابتوب وماكينات الطباعة.",
    url: "https://eskanelmansoura.com/electronics-level",
  },
};

export default function ElectronicsLevelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
