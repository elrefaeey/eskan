import { useState } from "react";

export default function useCityCenterNumbers() {
  const staticNumbers = ["501", "504", "520", "522", "591"];

  const [data] = useState(
    staticNumbers.map((v) => ({ label: v, value: v }))
  );
  const [isLoading] = useState(false);

  return { data, isLoading };
}
