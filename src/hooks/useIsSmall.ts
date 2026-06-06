import { useEffect, useState } from "react";

export function useIsSmallScreen(breakpoint = 1024) {
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmall(window.innerWidth > breakpoint);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, [breakpoint]);

  return isSmall;
}
