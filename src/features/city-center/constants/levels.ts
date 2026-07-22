export interface CityCenterLevelConfig {
  title: string;
  units?: number;
  area?: number;
  advance?: number;
  years?: number;
  link?: string;
  status?: string;
}

export const CITY_CENTER_LEVELS: CityCenterLevelConfig[] = [
  {
    title: "دور البازار",
    units: 95,
    area: 11,
    advance: 270,
    years: 4,
    link: "/bazar-level",
  },
  {
    title: "دور الالكترونيات",
    units: 94,
    area: 7,
    advance: 285,
    years: 4,
    link: "/electronics-level",
  },
  {
    title: "دور الملابس",
    units: 60,
    area: 14,
    advance: 350,
    years: 3,
    link: "/clothes-level",
  },
  {
    title: "دور المطاعم والكافيهات",
    units: 39,
    area: 19,
    link: "/restaurant",
    status: "تم الانتهاء من التعاقد",
  },
  {
    title: "هايبر ماركت",
    status: "تم الانتهاء من التعاقد",
  },
  {
    title: "ملاهى",
    status: "تم الانتهاء من التعاقد",
  },
];
