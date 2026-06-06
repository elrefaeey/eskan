import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "دور الملابس - سيتي سنتر",
  description:
    "محلات ملابس بمساحات متنوعة وفرص استثمارية مميزة في سيتي سنتر المنصورة.",
  keywords: [
    "دور الملابس سيتي سنتر",
    "محلات ملابس المنصورة",
    "دور الملابس المنصورة",
  ],
  alternates: { canonical: "/clothes-level" },
  openGraph: {
    title: "دور الملابس - سيتي سنتر المنصورة",
    description:
      "محلات ملابس بمساحات متنوعة وفرص استثمارية مميزة في سيتي سنتر المنصورة.",
    url: "https://eskanelmansoura.com/clothes-level",
  },
};

export default function ClothesLevelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
