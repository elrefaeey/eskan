export const LOCALES = ['en', 'ar'] as const;

type TLocaleWithName = {
  code: string;
  name: string;
  dir: 'ltr' | 'rtl';
};

export const LOCALES_WITH_NAMES: TLocaleWithName[] = [
  { code: 'en', name: 'English', dir: 'ltr' },
  { code: 'ar', name: 'العربية', dir: 'rtl' },
];
