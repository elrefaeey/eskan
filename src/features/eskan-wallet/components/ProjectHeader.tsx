"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { IoLocationSharp } from "react-icons/io5";
import Link from "next/link";
import { CgCloseR } from "react-icons/cg";
import { useState } from "react";
import { ProjectDetails } from "../types";
import { ActionButton } from "@/components/ui/ReusableComponents/ActionButton";

interface Props {
  data: ProjectDetails;
}

export default function ProjectHeader({ data }: Props) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="relative w-full">
      <div className="relative flex items-center justify-center">
        <motion.div
          className="relative inset-0 w-full h-[50vh] sm:h-[60vh] md:min-h-[calc(100vh-80px)] lg:min-h-[calc(70vh-72px)] overflow-hidden"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <Image
            src={data?.img || "/placeholder.webp"}
            alt="Project"
            fill
            className="object-cover absolute top-0 left-0"
            priority
          />

          <div className="absolute inset-0 bg-black opacity-40"></div>

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="z-10 absolute text-center top-1/2 -translate-y-1/2 left-0 w-full text-white px-4 sm:px-6"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
              مشروع {data?.name}
            </h1>

            <h3 className="flex items-center gap-2 justify-center mt-2 text-lg sm:text-xl md:text-2xl font-semibold">
              <IoLocationSharp /> {data?.address}
            </h3>
          </motion.div>
        </motion.div>
      </div>

      <div className="details sec-padding">
        {!showDetails && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto flex items-center flex-col gap-2"
          >
            <ActionButton
              onClick={() => setShowDetails(true)}
              className="w-fit gap-2 px-4 sm:px-6 py-2 sm:py-3"
            >
              <span className="flex gap-2 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 mt-0.5 transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
                اضغط لمعرفة تفاصيل المشروع
              </span>
            </ActionButton>
          </motion.div>
        )}

        {showDetails && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-xl mx-2 sm:mx-4 rounded-2xl mt-4 py-4 px-3 sm:px-4 border border-gray-200"
          >
            {/* Close */}
            <button
              onClick={() => setShowDetails(false)}
              className="flex items-center gap-1.5 text-red-500 mb-4 hover:text-red-600 cursor-pointer"
            >
              <CgCloseR size={18} />
              <span className="font-semibold text-base">إغلاق</span>
            </button>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold mb-4 flex items-center gap-2">
              تفاصيل المشروع
            </h2>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              {/* ===== Details Box ===== */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="p-3 rounded-xl bg-gray-50 border border-gray-200 shadow-sm"
              >
                <h3 className="text-lg sm:text-xl md:text-xl font-semibold mb-2">
                  وصف المشروع
                </h3>
                <div
                  className="prose max-w-none text-gray-700 leading-6 sm:leading-6 md:leading-7 text-sm sm:text-sm md:text-base"
                  dangerouslySetInnerHTML={{ __html: data?.detalis }}
                />
              </motion.div>

              {/* ===== Features Box ===== */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="p-3 rounded-xl bg-gray-50 border border-gray-200 shadow-sm"
              >
                <h3 className="text-lg sm:text-xl md:text-xl font-semibold mb-2 flex items-center gap-1.5">
                  <span className="h-2 w-2 bg-black block"></span>
                  مميزات المشروع
                </h3>

                <div
                  className="prose max-w-none text-gray-700 leading-6 sm:leading-6 md:leading-7 text-sm sm:text-sm md:text-base"
                  dangerouslySetInnerHTML={{ __html: data?.features }}
                />

                {/* Files */}
                <h3 className="text-lg sm:text-xl md:text-xl font-semibold mt-4 mb-2">
                  الأوراق الرسمية للمشروع
                </h3>

                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2">
                  {data?.files.map((file) => (
                    <Link
                      key={file.id}
                      href={file.file}
                      target="_blank"
                      className="flex items-center gap-2 p-2 rounded-lg border hover:bg-gray-100 transition-all"
                    >
                      <span className="text-sm sm:text-sm md:text-base underline underline-offset-4">
                        {file.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
