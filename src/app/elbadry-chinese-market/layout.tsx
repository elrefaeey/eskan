import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "سوق الصين العظيم - مول البدري",
  description:
    "سوق الصين العظيم داخل مول البدري — أكبر تجمع متخصص للمنتجات الصينية في قلب الدلتا على مساحة تتجاوز 6000 متر مربع.",
  alternates: { canonical: "/elbadry-chinese-market" },
  openGraph: {
    title: "سوق الصين العظيم - مول البدري",
    description:
      "سوق الصين العظيم داخل مول البدري — أكبر تجمع متخصص للمنتجات الصينية في قلب الدلتا على مساحة تتجاوز 6000 متر مربع.",
    url: "https://eskanelmansoura.com/elbadry-chinese-market",
  },
};

export default function ChineseMarketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
