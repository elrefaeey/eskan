import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "مشاريعنا",
  description:
    "تصفح مشاريع إسكان المنصورة - سيتي سنتر، أبراج البدري، أبراج المدينة وغيرها من المشاريع العقارية المتميزة.",
  keywords: [
    "مشاريع إسكان",
    "مشاريع المنصورة",
    "عقارات المنصورة",
    "سيتي سنتر",
    "أبراج البدري",
  ],
  alternates: { canonical: "/our-projects" },
  openGraph: {
    title: "مشاريعنا - إسكان المنصورة",
    description:
      "سيتي سنتر، أبراج البدري، أبراج المدينة وغيرها من المشاريع العقارية المتميزة.",
    url: "https://eskanelmansoura.com/our-projects",
  },
};

export default function OurProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
