"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type WelcomeMessage = string | false;

const getDynamicMessage = (path: string): string => {
  const messages: Record<string, string> = {
    "/markazmadina": "تواصل معي للإستفسار عن سيتي سنتر.",
    "/electronics": "تواصل معي للإستفسار عن دور الالكترونيات.",
    "/bazar-level": "تواصل معي للإستفسار عند دور البازار.",
    "/sakan": "تواصل معي للإستفسار عن أبراج المدينة.",
    "/abrag-elbadry": "تواصل معي للإستفسار عن أبراج البدري.",
    "/abrage-elbadry-trade": "تواصل معي للإستفسار عن مول البدري.",
    "/elbadry-souq-istanbul": "تواصل معي للإستفسار عن سوق اسطنبول.",
    "/elbadry-cafe-restaurants":
      "تواصل معي للإستفسار عن دور المطاعم و الكافيهات في مول البدري.",
    "/work-with-us": "تواصل معي للإستفسار عن حق السعي.",
    "/eskan-wallet": "تواصل معي للإستفسار عن المحفظة العقارية.",
    "/project-wallet-details/3": "تواصل معي للإستفسار عن المحفظة العقارية.",
  };

  return messages[path] || "حابب أساعدك تختار أفضل فرصة تناسبك";
};

export const useWelcomeMessages = (isChatOpen: boolean) => {
  const [showWelcomeText, setShowWelcomeText] = useState<WelcomeMessage>(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isChatOpen) return;

    let timeout1: NodeJS.Timeout,
      timeout2: NodeJS.Timeout,
      timeout3: NodeJS.Timeout;
    let mounted = true;

    timeout1 = setTimeout(() => {
      if (!mounted || isChatOpen) return;
      setShowWelcomeText("msg1");
    }, 4000);

    timeout2 = setTimeout(() => {
      if (!mounted || isChatOpen) return;
      setShowWelcomeText(false);
    }, 7000);


    return () => {
      mounted = false;
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [isChatOpen, pathname]);

  const welcomeMessage =
    showWelcomeText === "msg1"
      ? "أهلا بيك، أنا نافع، مسئول المبيعات الخاص بالموقع."
      : showWelcomeText === "msg2"
        ? getDynamicMessage(pathname || "")
        : "";

  const stackedMessages = [
    "أهلاً بيك 👋 أنا نافع، مستشارك العقاري",
    getDynamicMessage(pathname || ""),
  ];

  return {
    showWelcomeText: !!showWelcomeText,
    welcomeMessage,
    stackedMessages,
  };
};
