
'use client';

import { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { languages } from '@/lib/languages';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/use-translation';

export default function LanguageSelector() {
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const { toast } = useToast();

  useEffect(() => {
    const storedLang = localStorage.getItem('user_language');
    if (storedLang) {
      setSelectedLanguage(storedLang);
    }
  }, []);

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    localStorage.setItem('user_language', value);
    const languageName = languages.find(lang => lang.code === value)?.name || 'the selected language';
    
    toast({
        title: t('language_updated_toast_title'),
        description: t('language_updated_toast_description').replace('{languageName}', languageName),
    });

    // Reload to apply the new language across the app
    window.location.reload();
  };

  return (
    <div className="w-full max-w-xs mx-auto">
        <Select onValueChange={handleLanguageChange} value={selectedLanguage}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder={t('language_selector_placeholder')} />
            </SelectTrigger>
            <SelectContent>
                {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
  );
}
