import { useState } from "react";

export default function useCityCenterRevenues() {
  const staticRevenues = ["23625", "27187", "27979", "34166", "39291"];

  const [data] = useState(
    staticRevenues.map((v) => ({ label: v, value: v }))
  );
  const [isLoading] = useState(false);

  return { data, isLoading };
}
