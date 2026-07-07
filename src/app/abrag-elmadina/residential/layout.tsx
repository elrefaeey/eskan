import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الوحدات السكنية - أبراج المدينة",
  description:
    "وحدات سكنية في أبراج المدينة بمساحات تبدأ من 58 متر حتى 159 متر، 3 غرف وصالة، بمقدم يبدأ من 25% وتقسيط حتى 6 سنوات بدون فوايد.",
  keywords: ["أبراج المدينة سكني", "شقق للبيع المنصورة", "وحدات سكنية بالتقسيط"],
  alternates: { canonical: "/abrag-elmadina/residential" },
  openGraph: {
    title: "الوحدات السكنية - أبراج المدينة",
    description:
      "وحدات سكنية في أبراج المدينة بمساحات تبدأ من 58 متر حتى 159 متر بمقدم 25% وتقسيط 6 سنوات.",
    url: "https://eskanelmansoura.com/abrag-elmadina/residential",
  },
};

export default function ResidentialLayout({ children }: { children: React.ReactNode }) {
  return children;
}
