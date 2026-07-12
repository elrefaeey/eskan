"use client";

import { useParams } from "next/navigation";
import DataForm from "@/features/data-form/components/DataForm";

function DataFormWithSalesPage() {
  const params = useParams<{ id: string }>();

  return (
    <main className="container page md:bg-transparent">
      <DataForm salesId={params.id} />
    </main>
  );
}

export default DataFormWithSalesPage;
