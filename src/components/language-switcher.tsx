import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from '@phosphor-icons/react';
import { LANGUAGES, type Language } from '@/lib/i18n/translations';

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export function LanguageSwitcher({ currentLanguage, onLanguageChange }: LanguageSwitcherProps) {
  const currentLang = LANGUAGES.find(l => l.code === currentLanguage) || LANGUAGES[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 min-w-[110px] px-3 py-2 hover:bg-accent hover:text-accent-foreground transition-colors"
          title="Schimbă limba / Change language"
        >
          <Globe weight="duotone" size={20} className="text-primary" />
          <span className="text-lg">{currentLang.flag}</span>
          <span className="hidden sm:inline font-medium">{currentLang.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="min-w-[220px] max-h-[400px] overflow-y-auto"
        sideOffset={5}
      >
        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Select Language
        </div>
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => onLanguageChange(lang.code as Language)}
            className={`gap-3 py-2.5 cursor-pointer hover:bg-accent transition-colors ${
              lang.code === currentLanguage ? 'bg-accent/50 font-semibold' : ''
            }`}
          >
            <span className="text-xl">{lang.flag}</span>
            <span className="flex-1 font-medium">{lang.name}</span>
            {lang.code === currentLanguage && (
              <span className="text-primary font-bold text-lg">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
