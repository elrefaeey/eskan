"use client";
import { useLenis } from "@/hooks/useLenis";
import useMadinaProjectDetails from "@/features/abrag-elmadina/hooks/useMadinaProjectDetails";
import AbragElmadinaLanding from "@/components/Projects/MadinaTowers/AbragElmadinaLanding";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const MadinaTowers = () => {
  const { projectDetails, isLoading } = useMadinaProjectDetails();
  const router = useRouter();

  useLenis();

  if (isLoading) {
    return (
      <div className="container page flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!projectDetails) return null;

  return (
    <>
      {/* Hero full-width خارج الـ container */}
      <div className="w-full">
        <AbragElmadinaLanding
          images={projectDetails.imgs.map((img) => img.img)}
          onViewUnits={() => router.push("/abrag-elmadina/residential")}
        />
      </div>
    </>
  );
};

export default MadinaTowers;
