import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الصفحة غير موجودة - 404 | إسكان المنصورة",
  description: "عذراً، الصفحة التي تبحث عنها غير موجودة.",
};

export default function NotFound() {
  return (
    <div className="page flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto py-16">
        <h1 className="text-[120px] md:text-[180px] font-extrabold text-primary/10 leading-none">
          404
        </h1>

        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 -mt-8">
          الصفحة غير موجودة
        </h2>

        <p className="text-body-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى موقع آخر.
          <br />
          يمكنك العودة إلى الصفحة الرئيسية أو تصفح مشاريعنا.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="group bg-primary hover:bg-primary/90 text-white px-8 py-3.5
              rounded-xl font-semibold transition-all duration-300
              flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Home className="w-5 h-5" />
            <span>العودة للرئيسية</span>
          </Link>

          <Link
            href="/#projects-section"
            className="group bg-white hover:bg-gray-50 text-primary px-8 py-3.5
              rounded-xl font-semibold transition-all duration-300
              flex items-center gap-2 border-2 border-primary
              hover:shadow-lg hover:scale-105"
          >
            <span>تصفح المشاريع</span>
            <ArrowRight className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
