import { cn } from "@/lib/utils";

interface EmptyListProps {
  message: string;
  className?: string;
}

export default function EmptyList({ message, className }: EmptyListProps) {
  return (
    <div className={cn("text-center py-12", className)}>
      <p className="text-gray-600 text-body-lg">{message}</p>
    </div>
  );
}
