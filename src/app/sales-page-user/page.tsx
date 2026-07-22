"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { BrandSpinner } from "@/components/common/BrandSpinner";
import SalesPageUser from "@/features/sales-page-user/components/SalesPageUser";

function SalesPageUserContent() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("ud");
  const projectId = searchParams.get("pd");

  return <SalesPageUser userId={userId} projectId={projectId} />;
}

function SalesPageUserPage() {
  return (
    <main className="min-h-screen">
      <Suspense
        fallback={
          <div className="flex min-h-[60vh] items-center justify-center">
            <BrandSpinner size="md" />
          </div>
        }
      >
        <SalesPageUserContent />
      </Suspense>
    </main>
  );
}

export default SalesPageUserPage;
