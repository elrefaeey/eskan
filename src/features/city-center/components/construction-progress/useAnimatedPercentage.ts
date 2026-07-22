"use client";

import { animate, useInView } from "framer-motion";
import { constructionProgressCountTransition } from "@/lib/animations";
import { useEffect, useRef, useState } from "react";

export function useAnimatedPercentage(target: number) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, target, {
      ...constructionProgressCountTransition,
      onUpdate: (value) => setDisplay(Math.round(value)),
    });

    return () => controls.stop();
  }, [isInView, target]);

  return { ref, isInView, display };
}
