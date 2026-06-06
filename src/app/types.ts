import type { ReactNode } from "react";
import { LOCALES } from "@/constants";

export type TChildrenProp = {
  children: ReactNode;
};

export type TLocaleProp = {
  locale: string;
};

export type TLocaleParams = {
  params: Promise<TLocaleProp>;
};

export type TChildrenLocaleProp = TChildrenProp & TLocaleParams;

export type ValidLocale = (typeof LOCALES)[number];
