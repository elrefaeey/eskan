import type { Metadata } from "next";

import "@/app/globals.css";
import { Cairo } from "next/font/google";
import ReactQueryProvider from "@/providers/react-queryprovider";
import { Toaster } from "react-hot-toast";
// import PageTransition from "@/components/PageTransition";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "Arial"],
  adjustFontFallback: true,
});
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL("https://eskanelmansoura.com"),
  title: {
    default: "إسكان المنصورة - شقق ومحلات وأبراج سكنية وتجارية",
    template: "%s | إسكان المنصورة",
  },
  description:
    "إسكان المنصورة العقارية - نوفر وحدات سكنية وتجارية بنظام إتحاد الملاك في أبراج المدينة، سيتي سنتر المنصورة،وأبراج البدري  ومول البدري ومنصورة داون تاون. شقق للبيع بالتقسيط، محلات تجارية، وأراضي بأنظمة سداد مرنة.",
  keywords: [
    "عقارات المنصورة",
    "شقق للبيع بالمنصورة",
    "محلات تجارية",
    "أبراج سكنية",
    "إتحاد الملاك",
    "أبراج المدينة",
    "سيتي سنتر المنصورة",
    "شقق بالتقسيط",
    "وحدات سكنية",
    "وحدات تجارية",
    "عقارات بالتقسيط",
    "منصورة داون تاون",
    "إسكان المنصورة",
    "شقق المنصورة",
    "محلات المنصورة",
    "استثمار عقاري المنصورة",
  ],
  authors: [
    {
      name: "إسكان المنصورة",
      url: "https://eskanelmansoura.com",
    },
  ],
  creator: "إسكان المنصورة",
  publisher: "إسكان المنصورة",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "إسكان المنصورة - شقق ومحلات وأبراج سكنية وتجارية",
    description:
      "نوفر وحدات سكنية وتجارية بنظام إتحاد الملاك. شقق، محلات، وأراضي بأنظمة سداد مرنة.",
    type: "website",
    locale: "ar_EG",
    url: "https://eskanelmansoura.com",
    siteName: "إسكان المنصورة",
    images: [
      {
        url: "/assets/layout/logo.png",
        width: 1200,
        height: 630,
        alt: "إسكان المنصورة",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "إسكان المنصورة - عقارات سكنية وتجارية",
    description: "وحدات سكنية وتجارية بنظام إتحاد الملاك. شقق ومحلات بالتقسيط.",
    images: ["/assets/layout/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "7rY5iv9rqcgxCciSZ8orpxjEWOxCut3H2CMUMcrauwQ",
  },
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      className="transition-colors"
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1F503B" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/assets/layout/logo.png"
          as="image"
          type="image/png"
          fetchPriority="high"
        />
        <link rel="dns-prefetch" href="https://back.mansoura-eco-build.com" />
        <link
          rel="preconnect"
          href="https://back.mansoura-eco-build.com"
          crossOrigin="anonymous"
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1282065726673250');
fbq('track', 'PageView');`,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1282065726673250&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              name: "إسكان المنصورة",
              description:
                "شركة عقارية متخصصة في بيع الوحدات السكنية والتجارية بنظام إتحاد الملاك",
              url: "https://eskanelmansoura.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "المنصورة",
                addressCountry: "EG",
              },
              areaServed: {
                "@type": "City",
                name: "المنصورة",
              },
              sameAs: [],
            }),
          }}
        />
      </head>
      <body className={cairo.className} suppressHydrationWarning>
        <ReactQueryProvider>
          <Toaster />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
