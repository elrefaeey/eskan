import { Building2, MapPin, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const BULLET_ICONS: LucideIcon[] = [Building2, MapPin, Star];

interface ProjectBulletListProps {
  sentences: string[];
}

/** قائمة النقاط النصية لوصف المشروع */
export default function ProjectBulletList({ sentences }: ProjectBulletListProps) {
  return (
    <div className="flex flex-col gap-3 flex-1">
      {sentences.map((sentence, i) => {
        const Icon = BULLET_ICONS[i % BULLET_ICONS.length];
        return (
          <div key={i} className="flex items-start gap-3 flex-1">
            <div className="mt-0.5 shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon className="w-4 h-4 text-primary" />
            </div>
            <p className="text-[#333] text-base md:text-lg leading-relaxed">
              {sentence}
            </p>
          </div>
        );
      })}
    </div>
  );
}
