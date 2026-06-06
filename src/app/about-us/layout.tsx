import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "من نحن",
  description:
    "تعرف على شركة إسكان المنصورة العقارية - رؤيتنا ورسالتنا وفريق العمل. نقدم أفضل الوحدات السكنية والتجارية بنظام إتحاد الملاك في المنصورة.",
  alternates: { canonical: "/about-us" },
  openGraph: {
    title: "من نحن - إسكان المنصورة",
    description:
      "تعرف على شركة إسكان المنصورة العقارية - رؤيتنا ورسالتنا وفريق العمل.",
    url: "https://eskanelmansoura.com/about-us",
  },
};

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
