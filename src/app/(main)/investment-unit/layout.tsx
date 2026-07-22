import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تفاصيل الوحدة الاستثمارية",
  description:
    "تفاصيل الوحدة الاستثمارية في مشاريع إسكان المنصورة - المساحة والسعر ونظام السداد.",
  openGraph: {
    title: "تفاصيل الوحدة الاستثمارية - إسكان المنصورة",
    description: "تفاصيل الوحدة الاستثمارية - المساحة والسعر ونظام السداد.",
  },
};

export default function InvestmentUnitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
