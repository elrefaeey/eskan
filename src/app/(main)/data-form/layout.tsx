import type { Metadata } from "next";

export const metadata: Metadata = {
  title:"استمارة البيانات - إسكان المنصورة",
  description:
    "أكمل بياناتك للتواصل مع فريق إسكان المنصورة - احجز وحدتك أو استفسر عن مشاريعنا العقارية.",
  alternates: { canonical: "/data-form" },
  openGraph: {
    title: "نموذج البيانات - إسكان المنصورة",
    description: "أكمل بياناتك للتواصل مع فريق إسكان المنصورة.",
    url: "https://eskanelmansoura.com/data-form",
  },
};

export default function DataFormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
