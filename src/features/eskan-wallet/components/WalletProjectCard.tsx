"use client";

import Image from "next/image";
import Link from "next/link";
import { IoLocationSharp } from "react-icons/io5";
import { ProjectWalletItem } from "../types";

export default function WalletProjectCard({
  data,
}: {
  data: ProjectWalletItem;
}) {
  return (
    <div className="baseBtn relative rounded-xl overflow-hidden">
      <div className="project-img relative ">
        <Image
          src={data.img}
          width={800}
          height={600}
          className="rounded-t-xl w-full h-full object-cover"
          alt="صورة المشروع"
        />

        <div className="top-card absolute top-2 px-2 left-0 w-full flex justify-between items-start">
          <div
            style={{ backgroundColor: "rgba(68,68,68,.48)" }}
            className="name-adress text-white rounded-xl p-2"
          >
            <h3 className="lg:text-lg text-base font-bold">{data.name}</h3>
            <h4 className="flex m-0 lg:text-lg text-sm gap-1 items-center">
              <IoLocationSharp />
              {data.address}
            </h4>
          </div>

          <div
            style={{ backgroundColor: "rgba(68,68,68,.48)" }}
            className="name-adress flex items-center gap-1 text-white rounded-xl p-2"
          >
            <Image
              src={"/assets/eskan-wallet/trust.png"}
              alt="icon"
              width={20}
              height={20}
            />

            <h3 className="lg:text-lg m-0 text-base">
              {data.id == 1 ? "مرخص وتحت الانشاء" : "مرخص"}
            </h3>
          </div>
        </div>
      </div>
      {/* الوصف (HTML) */}
      <div
        className=" py-2  space-y-2 rounded-b-xl   bg-[#ebebeb]
"
      >
        <div
          className="px-3  "
          dangerouslySetInnerHTML={{
            __html: data.description,
          }}
        />

        <Link
          href={`/eskan-wallet/${data.id}`}
          className="details-btn w-full block  px-3"
        >
          <span className="bg-[#5FAC23] text-white rounded-xl lg:text-2xl text-lg text-center p-[9px] block w-full mx-auto">
            مزيد من التفاصيل
          </span>
        </Link>
      </div>
    </div>
  );
}
