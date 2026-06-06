import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "اعمل معانا",
  description:
    "اعمل معانا في إسكان المنصورة.",
  alternates: { canonical: "/work-with-us" },
  openGraph: {
    title: "اعمل معانا - إسكان المنصورة",

    url: "https://eskanelmansoura.com/work-with-us",
  },
};

export default function WorkWithUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
