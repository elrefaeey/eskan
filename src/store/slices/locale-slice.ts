import type { StateCreator } from 'zustand';

export type TLocaleState = {
  locale: string;
  dir: 'ltr' | 'rtl';
};

export type TLocaleActions = {
  setLocale: ({ locale, dir }: { locale: string; dir: 'ltr' | 'rtl' }) => void;
};

export type TLocaleSlice = TLocaleState & TLocaleActions;

export const initialLocaleState: TLocaleState = {
  locale: 'en',
  dir: 'ltr',
};
export const createLocaleSlice: StateCreator<TLocaleSlice> = (set) => ({
  ...initialLocaleState,
  setLocale: ({ locale, dir }) => {
    set((state) => ({ ...state, locale, dir }));
  },
});
