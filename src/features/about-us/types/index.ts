import type { LucideIcon } from "lucide-react";

export interface TeamDepartment {
  id: string;
  order: number;
  title: string;
  description: string;
  icon: LucideIcon;
  image?: string;
}
