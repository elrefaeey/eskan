import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { LOCALES } from '@/constants';

export type TFormatDurationOptions = {
  omitHourIfZero?: boolean;
  locale?: (typeof LOCALES)[number];
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

export function localizeDigits(s: string, locale: (typeof LOCALES)[number]): string {
  if (locale === 'en') return s;
  // Arabic-Indic digits
  const map = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return s.replace(/\d/g, (d) => map[Number(d)]);
}

export function formatDuration(sec: number, options: TFormatDurationOptions) {
  const { omitHourIfZero = true, locale = 'en' } = options;

  if (!Number.isFinite(sec)) throw new TypeError('seconds must be a finite number.');

  const sign = sec < 0 ? '-' : '';
  const abs = Math.abs(Math.trunc(sec));

  const hours = Math.floor(abs / 3600);
  const minutes = Math.floor((abs % 3600) / 60);
  const seconds = abs % 60;

  const hh = pad2(hours);
  const mm = pad2(minutes);
  const ss = pad2(seconds);

  const base = omitHourIfZero && hours === 0 ? `${mm}:${ss}` : `${hh}:${mm}:${ss}`;
  const withSign = sign ? `${sign}${base}` : base;
  return localizeDigits(withSign, locale);
}
