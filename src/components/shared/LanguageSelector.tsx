
'use client';

import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { languages } from '@/lib/languages';
import { useToast } from '@/hooks/use-toast';

export default function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const { toast } = useToast();

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    localStorage.setItem('user_language', value);
    const languageName = languages.find(lang => lang.code === value)?.name || 'the selected language';
    toast({
        title: 'Language Updated',
        description: `The app language has been set to ${languageName}.`,
    });
  };

  return (
    <div className="w-full max-w-xs mx-auto">
        <Select onValueChange={handleLanguageChange} value={selectedLanguage}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a language" />
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
