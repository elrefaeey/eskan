import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "معهد إعداد الخريجين (GPI)",
  description:
    "مشروع تعليمي تدريبي بعائد شهري مستقر — برامج تدريب عملية تساعد الخريجين على اكتساب مهارات مطلوبة في سوق العمل.",
  alternates: { canonical: "/gpi" },
  openGraph: {
    title: "معهد إعداد الخريجين (GPI) - إسكان المنصورة",
    description:
      "استثمار مستدام بعائد يتضاعف مع النمو — مركز تدريب مهني متخصص يخدم أكثر من مليون خريج في الدقهلية والدلتا.",
    url: "https://eskanelmansoura.com/gpi",
  },
};

export default function GpiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
