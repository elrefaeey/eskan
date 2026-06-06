import type { Metadata } from "next";

import "@/app/globals.css";
import Navbar from "@/components/layout/Navbar";
import { Cairo } from "next/font/google";
import Footer from "@/components/layout/footer/Footer";
import ReactQueryProvider from "@/providers/react-queryprovider";
import { Toaster } from "react-hot-toast";
import { WelcomeChat } from "@/features/chat";
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
      <body className={cairo.className}>
        <ReactQueryProvider>
          <Toaster />
          <Navbar />
          <>{children}</>
          <Footer />
          <WelcomeChat />
        </ReactQueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
