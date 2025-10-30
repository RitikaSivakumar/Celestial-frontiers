
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import en from '@/lib/locales/en.json';
import hi from '@/lib/locales/hi.json';

const translations: { [key: string]: any } = {
  en,
  hi,
};

export function useTranslation() {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const storedLang = localStorage.getItem('user_language');
    if (storedLang && translations[storedLang]) {
      setLanguage(storedLang);
    }
  }, []);

  const t = (key: string): string => {
    return translations[language]?.[key] || en[key as keyof typeof en] || key;
  };

  return { t, language };
}
