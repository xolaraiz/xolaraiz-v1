import React, { createContext, useContext, useEffect, useState } from 'react';
import { TRANSLATIONS, type Language, type Translations } from '../data/translations';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'th',
  setLang: () => {},
  t: TRANSLATIONS.th,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('xolaraiz_lang');
    return saved === 'en' || saved === 'th' ? saved : 'th';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('xolaraiz_lang', newLang);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: TRANSLATIONS[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
