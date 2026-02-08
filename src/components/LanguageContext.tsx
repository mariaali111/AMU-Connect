import { createContext, useContext, useState, ReactNode } from "react";

type Language = "english" | "urdu" | "hindi";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translate: (key: string, translations: Record<Language, string>) => string;
  audioEnabled: boolean;
  setAudioEnabled: (enabled: boolean) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("english");
  const [audioEnabled, setAudioEnabled] = useState(false);

  const translate = (key: string, translations: Record<Language, string>) => {
    return translations[language] || translations.english;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate, audioEnabled, setAudioEnabled }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}