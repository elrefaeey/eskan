import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الصفحة غير موجودة - 404 | إسكان المنصورة",
  description: "عذراً، الصفحة التي تبحث عنها غير موجودة.",
};

/** Root fallback for unmatched URLs (no main chrome). */
export default function RootNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="mx-auto max-w-2xl py-16 text-center">
        <h1 className="text-[120px] font-extrabold leading-none text-primary/10 md:text-[180px]">
          404
        </h1>
        <h2 className="mb-4 -mt-8 text-3xl font-bold text-primary md:text-4xl">
          الصفحة غير موجودة
        </h2>
        <p className="mb-8 text-lg leading-relaxed text-gray-600 md:text-xl">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى موقع آخر.
        </p>
        <Link
          href="/"
          className="inline-flex items-center rounded-xl bg-primary px-8 py-3.5 font-semibold text-white shadow-lg transition hover:bg-primary/90"
        >
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}

