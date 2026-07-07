import { Loader2 } from "lucide-react";

export const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center page">
      <Loader2 className="w-12 h-12 animate-spin text-primary" />
    </div>
  );
};
