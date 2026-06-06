"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "../Spinner";
import { cn } from "@/lib/utils";

interface SubmitButtonProps {
  isLoading: boolean;
  label?: string;
  className?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isLoading,
  label = "تسجيل",
  className,
}) => {
  return (
    <Button
      type="submit"
      className={cn(
        "w-full lg:w-[720px] mx-auto mt-6 flex items-center justify-center",
        className,
      )}
      disabled={isLoading}
    >
      {isLoading ? <Spinner className="w-4 h-4" /> : label}
    </Button>
  );
};

export default SubmitButton;
