import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "مركز إتقان للتدريب المتقدم",
  description:
    "مشروع تعليمي تدريبي بعائد شهري مستقر — برامج تدريب عملية تساعد الخريجين على اكتساب مهارات مطلوبة في سوق العمل.",
  alternates: { canonical: "/vocational-center" },
  openGraph: {
    title: "مركز إتقان للتدريب المتقدم - إسكان المنصورة",
    description:
      "استثمار مستدام بعائد يتضاعف مع النمو — مركز تدريب مهني متخصص يخدم أكثر من مليون خريج في الدقهلية والدلتا.",
    url: "https://eskanelmansoura.com/vocational-center",
  },
};

export default function VocationalCenterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
