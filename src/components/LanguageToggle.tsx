/**
 * Language Toggle Component
 * One-click translation between English, Hindi, and Urdu
 */

import { useLanguage } from './LanguageContext';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Languages, Check } from 'lucide-react';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { value: 'english', label: 'English', flag: '🇬🇧' },
    { value: 'hindi', label: 'हिंदी', flag: '🇮🇳' },
    { value: 'urdu', label: 'اردو', flag: '🇵🇰' },
  ];

  const currentLanguage = languages.find(lang => lang.value === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Languages className="w-4 h-4" />
          <span className="hidden sm:inline">{currentLanguage?.label}</span>
          <span className="sm:hidden">{currentLanguage?.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.value}
            onClick={() => setLanguage(lang.value as any)}
            className="flex items-center justify-between cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </span>
            {language === lang.value && (
              <Check className="w-4 h-4 text-primary ml-2" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
