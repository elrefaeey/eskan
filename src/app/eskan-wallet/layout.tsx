import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "محفظة إسكان",
  description:
    "محفظة إسكان - تابع استثماراتك ووحداتك العقارية في مشاريع إسكان المنصورة. إدارة ذكية لممتلكاتك العقارية.",
  alternates: { canonical: "/eskan-wallet" },
  openGraph: {
    title: "محفظة إسكان - إسكان المنصورة",
    description: "تابع استثماراتك ووحداتك العقارية في مشاريع إسكان المنصورة.",
    url: "https://eskanelmansoura.com/eskan-wallet",
  },
};

export default function EskanWalletLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
