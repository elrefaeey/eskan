import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "أرض المعارض",
  description:' المركز التجاري الأول من نوعه في الدقهلية والدلتا، والمتخصص في كل ما يتعلق بمجالات البناء، التشطيب، والديكور',
  alternates: { canonical: "/gallery-ground" },
  openGraph: {
    title: "أرض المعارض - سيتي سنتر المنصورة",
    description:' المركز التجاري الأول من نوعه في الدقهلية والدلتا، والمتخصص في كل ما يتعلق بمجالات البناء، التشطيب، والديكور',
    url: "https://eskanelmansoura.com/gallery-ground",
  },
};

export default function GalleryGroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
