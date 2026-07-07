"use client";

import { jobs } from "@/constants/jobs";
import { motion } from "framer-motion";

interface JobsSelectionsProps {
  onChangeJob: (id: number) => void;
  selectedJob: number | null;
}

export default function JobsSelections({
  onChangeJob,
  selectedJob,
}: JobsSelectionsProps) {
  return (
    <div className="w-full bg-[#EFEFEF] p-3 lg:p-5 rounded-xl shadow-sm border border-gray-200">
      <div
        className="
          flex  gap-2 md:gap-4 overflow-x-auto whitespace-nowrap relative
          [&::-webkit-scrollbar]:hidden
          [scrollbar-width:none]
        "
      >
        {jobs.map((job) => {
          const active = selectedJob === job.id;

          return (
            <div key={job.id} className="relative pb-2">
              <button
                onClick={() => onChangeJob(job.id)}
                className={`px-2 lg:px-4 py-1 rounded-md text-sm md:text-base font-medium transition-all
                  ${active ? "text-primary font-semibold" : "text-gray-700 hover:text-primary"}`}
              >
                {job.jobTitl}
              </button>

              {active && (
                <motion.div
                  layoutId="jobActiveLine"
                  className="absolute left-0 bottom-0 w-full h-[3px] bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
