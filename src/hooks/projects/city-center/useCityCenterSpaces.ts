import { useState } from "react";

export default function useCityCenterSpaces() {
  const staticSpaces = ["14.00", "15.00", "17.00", "20.00", "23.00"];

  const [data] = useState(
    staticSpaces.map((v) => ({ label: v, value: v }))
  );
  const [isLoading] = useState(false);

  return { data, isLoading };
}
