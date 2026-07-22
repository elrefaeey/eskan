import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

interface SalesPageUnavailableProps {
  title?: string;
  description?: string;
}

function SalesPageUnavailable({
  title = "الرابط غير صالح",
  description = "رابط صفحة المبيعات غير مكتمل أو غير صحيح. تأكد من صحة الرابط وحاول مرة أخرى، أو تصفح مشاريعنا من الصفحة الرئيسية.",
}: SalesPageUnavailableProps) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="mx-auto max-w-2xl py-16 text-center">
        <h1 className="text-[120px] font-extrabold leading-none text-primary/10 md:text-[180px]">
          404
        </h1>

        <h2 className="mb-4 -mt-8 text-3xl font-bold text-primary md:text-4xl">
          {title}
        </h2>

        <p className="mb-8 text-lg leading-relaxed text-gray-600 md:text-xl">
          {description}
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="group flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5
              font-semibold text-white shadow-lg transition-all duration-300
              hover:scale-105 hover:bg-primary/90 hover:shadow-xl"
          >
            <Home className="h-5 w-5" />
            <span>العودة للرئيسية</span>
          </Link>

          <Link
            href="/#projects-section"
            className="group flex items-center gap-2 rounded-xl border-2 border-primary
              bg-white px-8 py-3.5 font-semibold text-primary transition-all
              duration-300 hover:scale-105 hover:bg-gray-50 hover:shadow-lg"
          >
            <span>تصفح المشاريع</span>
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SalesPageUnavailable;
