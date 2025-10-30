
'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/use-translation';

export default function WelcomeHeader() {
  const [greeting, setGreeting] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) return t('greeting_morning');
      if (hour < 18) return t('greeting_afternoon');
      return t('greeting_evening');
    };
    setGreeting(getGreeting());
  }, [t]);

  if (!greeting) {
    return null;
  }

  return (
    <div className="mb-4">
      <h1 className="text-4xl md:text-5xl font-headline text-foreground">
        {greeting}, {t('friend')}
      </h1>
      <p className="text-muted-foreground mt-2 text-lg">
        {t('welcome_header_subtitle')}
      </p>
    </div>
  );
}
