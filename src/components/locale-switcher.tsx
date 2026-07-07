'use client';

import { Globe } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { LOCALES_WITH_NAMES } from '@/constants';
import { useStore } from '@/store';

export const LocaleSwitcher = () => {
  const { dir, setLocale } = useStore();
  const t = useTranslations('locale');
  const isRtl = dir === 'rtl';

  const handleLocaleChange = (locale: string, dir: 'ltr' | 'rtl') => {
    setLocale({ locale, dir });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="cursor-pointer">
          <Globe className="h-[1.2rem] w-[1.2rem] transition-all" />
          <span className="sr-only">{t('title')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={isRtl ? 'start' : 'end'}>
        {LOCALES_WITH_NAMES.map(({ name, code, dir }) => {
          return (
            <DropdownMenuItem key={code} asChild>
              <Link onClick={() => handleLocaleChange(code, dir)} href={`/${code}`}>
                {name}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
