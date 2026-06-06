import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "سوق اسطنبول - مول البدري",
  description:
    "أكبر مركز تجاري متعدد الاسواق بالمنصورة وعلى مسطحات بنائية تتجاوز ٢١ ألف متر والذي تنشئه حاليا مجموعة البدري للتجارة والمقاولات بالتعاون مع اسكان المنصورة",
  alternates: { canonical: "/elbadry-souq-istanbul" },
  openGraph: {
    title: "سوق اسطنبول - أبراج البدري",
    description:
      "أكبر مركز تجاري متعدد الاسواق بالمنصورة وعلى مسطحات بنائية تتجاوز ٢١ ألف متر والذي تنشئه حاليا مجموعة البدري للتجارة والمقاولات بالتعاون مع اسكان المنصورة",
    url: "https://eskanelmansoura.com/elbadry-souq-istanbul",
  },
};

export default function SouqIstanbulLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
