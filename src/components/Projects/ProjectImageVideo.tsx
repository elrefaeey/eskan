"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProjectImgsSlider from "./ProjectImagesSlider";
import { GoVideo } from "react-icons/go";

function ProjectImageVideo({
  img,
  link,
  className,
}: {
  img: string | string[];
  link?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const isMultipleImages = Array.isArray(img);

  return (
    <div
      className={`flex flex-col lg:my-0 my-1 lg:col-span-7 relative  lg:h-[600px] ${
        className || ""
      }`}
    >
      {isMultipleImages ? (
        <div className="relative grow h-full">
          <ProjectImgsSlider
            images={img}
            height="h-[275px] lg:!h-full"
            rounded={true}
          />
        </div>
      ) : (
        <div className="relative grow h-full">
          <Image
            src={img}
            alt="جراند مول"
            width={500}
            height={300}
            className="rounded-xl w-full aspect-square lg:grow object-cover
             h-[275px] lg:!h-full"
          />
        </div>
      )}

      {link && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="shrink-0" asChild>
            <button className="mt-2 py-2 lg:py-3 text-[#444444] shrink-0 w-full rounded-xl hover:opacity-80 cursor-pointer transition duration-300 flex items-center gap-3 justify-center bg-[#e6e6e6] h-fit">
              <p className="text-lg m-0">عرض الفيديو</p>
              <GoVideo className="size-6" />
            </button>
          </DialogTrigger>

          <DialogContent
            className="
      w-[95vw]
      max-w-4xl
      p-0
      overflow-hidden
      sm:rounded-2xl
    "
          >
            <DialogHeader className="px-4 pt-4 sm:px-6">
              <DialogTitle className="text-base sm:text-lg">
                فيديو المشروع
              </DialogTitle>
            </DialogHeader>

            <div className="relative w-full aspect-video bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${link}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default ProjectImageVideo;
