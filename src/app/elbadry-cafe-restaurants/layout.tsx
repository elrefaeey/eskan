import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "المطاعم والكافيهات - مول البدري",
  description:
    "أكبر مركز تجاري متعدد الاسواق بالمنصورة وعلى مسطحات بنائية تتجاوز ٢١ ألف متر والذي تنشئه حاليا مجموعة البدري للتجارة والمقاولات بالتعاون مع اسكان المنصورة",
  alternates: { canonical: "/elbadry-cafe-restaurants" },
  openGraph: {
    title: "المطاعم والكافيهات - أبراج البدري",
    description:
      "أكبر مركز تجاري متعدد الاسواق بالمنصورة وعلى مسطحات بنائية تتجاوز ٢١ ألف متر والذي تنشئه حاليا مجموعة البدري للتجارة والمقاولات بالتعاون مع اسكان المنصورة",
    url: "https://eskanelmansoura.com/elbadry-cafe-restaurants",
  },
};

export default function ElbadryCafeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
