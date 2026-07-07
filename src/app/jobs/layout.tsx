import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الوظائف المتاحة",
  description:'تصفح الوظائف المتاحة في شركة إسكان المنصورة وانضم لفريق عمل متميز في قطاع العقارات والتطوير.',
  keywords: ["وظائف", "وظائف المنصورة", "فرص عمل", "توظيف"],
  alternates: { canonical: "/jobs" },
  openGraph: {
    title: "الوظائف المتاحة - إسكان المنصورة",
    description:"تصفح الوظائف المتاحة في شركة إسكان المنصورة وانضم لفريق عمل متميز في قطاع العقارات والتطوير.",
    url: "https://eskanelmansoura.com/jobs",
  },
};

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
