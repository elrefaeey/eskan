import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "مول البدري",
  description:"مول البدري طفرة واضافة كبيرة للاسواق التجارية بالمنصورة، والذي تنشئه حاليا مجموعة البدري للتجارة والمقاولات بالتعاون مع اسكان المنصورة",
  alternates: { canonical: "/elbadry-trade" },
  openGraph: {
    title: "مول البدري",
    description:"مول البدري طفرة واضافة كبيرة للاسواق التجارية بالمنصورة، والذي تنشئه حاليا مجموعة البدري للتجارة والمقاولات بالتعاون مع اسكان المنصورة",
    url: "https://eskanelmansoura.com/elbadry-trade",
  },
};

export default function ElbadryTradeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
