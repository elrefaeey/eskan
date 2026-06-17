"use client";

import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";

export default function InvestRoad() {
  return (
    <section className="bg-[#FAFFF8]/90 py-6 px-0 lg:px-0 px-1 rounded-md">
        {/* invest road */}
          <div
          >
            <h2
              style={{ color: "rgba(85, 139, 47, 1)" }}
              className="  pl-3 pt-3 lg:pb-3  h2"
            >
              كيف تبدأ فى الاستثمار ؟
            </h2>
            <div className="lg:px-[40px] p-[30px] pt-2 rounded-2xl">
              <p className="m-0 pb-3 text-body-lg lg:text-2xl flex items-center gap-3 relative inset-0 border-b-2 border-black border-dotted text-justify border-r-2">
                <span
                  className="absolute bg-[rgba(250,255,248)] top-0 -right-1 h-[50%] w-1 block"
                ></span>

                <span className="absolute -right-8 max-[600px]:-right-[20px] top-[30%]">
                  <img
                    className="max-[600px]:w-[40px] w-[60px]"
                    src={'/assets/eskan-wallet/searchicon.svg'}
                    alt="alt"
                  />
                </span>
                <span className="flex-1 min-[600px]:pb-[30px] max-[600px]:pr-7 pr-10">
                  <strong> 1- تصفح كل </strong>معلومات المشاريع المعروضة ثم حدد
                  المشروع الذي ترغب الاستثمار فية عن طريق تملك حصة عقارية محددة
                  الامتار في المحلات المعروضة
                </span>
              </p>

              <p className="m-0 pb-10  text-body-lg lg:text-2xl flex items-center gap-3 relative inset-0 pt-4 border-l-2 border-b-2  border-black border-dotted text-justify">
                <span className="flex-1 pl-10">
                  <strong> 2- بعد الاطلاع</strong> علي تفاصيل الحصص المعروضة اضف
                  الي محفظتك العقارية عدد الحصص التي قمت بتحديدها ثم استكمل
                  خطوات التسجيل
                </span>
                <span className="absolute -left-8 max-[600px]:-left-[20px] top-[40%]">
                  <span className="arrow-down absolute -top-3 left-[22px] max-[600px]:left-[10px]">
                    <IoIosArrowDown className="text-lg" />
                  </span>
                  <img
                    className="max-[600px]:w-[40px] w-[60px]"
                    src={'/assets/eskan-wallet/greenClick.svg'}
                    alt="alt"
                  />
                </span>
              </p>

              <p className="m-0 pb-10  text-body-lg lg:text-2xl flex items-center gap-3 relative inset-0 pt-4 border-r-2  border-black border-b-2 border-dotted text-justify">
                <span className="flex-1 pr-10">
                  <strong> 3- توجة الي</strong> مقر الشركة لاتمام عملية التعاقد
                  الملزمة من الشركة باعادة بيع حصصك العقارية مضاف اليها عائدك
                  الإيجاري المتفق علية
                </span>
                <span className="absolute -right-8 max-[600px]:-right-[20px] top-[40%]">
                  <span className="arrow-down absolute -top-3 right-[22px] max-[600px]:right-[10px]">
                    <IoIosArrowDown className="text-lg" />
                  </span>
                  <img
                    className="max-[600px]:w-[40px] w-[60px]"
                    src={'/assets/eskan-wallet/contract.svg'}
                    alt="alt"
                  />
                </span>
              </p>

              <p className="m-0 pb-3  text-body-lg lg:text-2xl flex items-center gap-3 relative inset-0 pt-4 border-l-2  border-black border-dotted text-justify">
                <span className="flex-1 pl-10">
                  <strong>4- يمكنك تحصيل</strong> قيمة حصصك العقارية مع عوائد
                  ارباح البيع طبقا للمواعيد المتفق عليها اثناء تعاقدك
                </span>
                <span className="absolute z-10 -left-8 max-[600px]:-left-[20px] top-[40%]">
                  <span className="arrow-down absolute -top-3 left-[22px] max-[600px]:left-[10px]">
                    <IoIosArrowDown className="text-lg" />
                  </span>
                  <img
                    className="max-[600px]:w-[40px] w-[60px]"
                    src={'/assets/eskan-wallet/money.svg'}
                    alt="alt"
                  />
                </span>

                {/* background to hide the 50% of the border */}
                <span
                  style={{ backgroundColor: "rgba(250, 255, 248)" }}
                  className="absolute bottom-0 -left-1 h-[50%] w-1 block"
                ></span>
              </p>
            </div>
          </div>
    </section>
  );
}
