import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "صفحة المبيعات",
  description: "تواصل مع مسؤول المبيعات واعرف تفاصيل المشروع",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SalesPageUserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
