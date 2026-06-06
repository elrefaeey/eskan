import type { ReactNode } from 'react';

import { LOCALES } from '@/constants';

export type TI18nProviderProps = {
  children: ReactNode;
  locale: (typeof LOCALES)[number];
  messages: Record<string, string>;
  timeZone?: string;
};
