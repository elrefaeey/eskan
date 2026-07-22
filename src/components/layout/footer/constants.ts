export type SocialPlatform = "instagram" | "tiktok" | "facebook" | "linkedin";

export interface SocialLink {
  href: string;
  label: string;
  platform: SocialPlatform;
}

export const FOOTER_PHONE = "01095665809";

export const FOOTER_TAGLINE =
  "نبني ثقتك قبل أن نبني عقارك — شريكك الموثوق في الاستثمار العقاري بالمنصورة والدلتا منذ أكثر من 17 عاماً";

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: "https://www.instagram.com/eskanelmansoura/",
    label: "Instagram",
    platform: "instagram",
  },
  {
    href: "https://www.tiktok.com/@eskanelmansoura?_r=1&_t=ZS-91wXV8yosiX",
    label: "TikTok",
    platform: "tiktok",
  },
  {
    href: "https://www.facebook.com/Eskan.ElMansoura?mibextid=LQQJ4d",
    label: "Facebook",
    platform: "facebook",
  },
  {
    href: "http://linkedin.com/company/eskan-elmansoura/",
    label: "LinkedIn",
    platform: "linkedin",
  },
];
