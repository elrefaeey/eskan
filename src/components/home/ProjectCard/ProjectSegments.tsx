import { useRouter } from "next/navigation";

export interface ProjectSegment {
  label: string;
  tag: string;
  href?: string;
}

interface ProjectSegmentsProps {
  segments: ProjectSegment[];
}

/** صفوف الأقسام الفرعية للمشروع (أبراج المدينة / أرض المعارض / …) */
export default function ProjectSegments({ segments }: ProjectSegmentsProps) {
  const router = useRouter();

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col gap-2 w-full"
    >
      {segments.map((seg) => (
        <div
          key={seg.label}
          onClick={(e) => {
            e.stopPropagation();
            seg.href && router.push(seg.href);
          }}
          className={`flex items-center justify-between w-full border border-primary/30 bg-primary/5 rounded-lg px-4 py-2.5 transition-colors duration-150 ${
            seg.href ? "cursor-pointer hover:bg-primary/10 hover:border-primary/60" : ""
          }`}
        >
          <span className="text-primary font-bold text-sm">{seg.label}</span>
          <span className="text-xs text-white bg-primary rounded-full px-2.5 py-1">
            {seg.tag}
          </span>
        </div>
      ))}
    </div>
  );
}
