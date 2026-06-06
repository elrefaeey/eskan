import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "فرص الاستثمار",
  description:
    "اكتشف فرص الاستثمار العقاري مع إسكان المنصورة - عوائد مضمونة وأنظمة سداد مرنة في أفضل المشاريع العقارية بالمنصورة.",
  keywords: [
    "استثمار عقاري",
    "استثمار المنصورة",
    "عوائد عقارية",
    "فرص استثمار",
  ],
  alternates: { canonical: "/investment" },
  openGraph: {
    title: "فرص الاستثمار - إسكان المنصورة",
    description:
      "عوائد مضمونة وأنظمة سداد مرنة في أفضل المشاريع العقارية بالمنصورة.",
    url: "https://eskanelmansoura.com/investment",
  },
};

export default function InvestmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
