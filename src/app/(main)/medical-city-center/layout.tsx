import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "   سيتي سنتر",
  description:
    "مركز طبي يوفر عيادات طبية متكاملة بأحدث التجهيزات في موقع استراتيجي وبأفضل سعر.",

  keywords: ["عيادات المنصورة", "مراكز طبية", " أبراج المدينة", "استثمار طبي"],
  alternates: { canonical: "/medical-city-center" },
  openGraph: {
    title: "المدينة الطبية - سيتي سنتر المنصورة",
    description:
      "مركز طبي يوفر عيادات طبية متكاملة بأحدث التجهيزات في موقع استراتيجي وبأفضل سعر.",
    url: "https://eskanelmansoura.com/medical-city-center",
  },
};

export default function MedicalCityCenterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
