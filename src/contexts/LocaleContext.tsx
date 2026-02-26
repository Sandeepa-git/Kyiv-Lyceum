'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Locale = 'en' | 'fr' | 'lt' | 'uk';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const translations: Record<Locale, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.contacts': 'Contacts',
    'nav.students': 'For Students',
    'nav.organizations': 'For Organizations',
    'nav.news': 'News & Events',
    'nav.partners': 'Partners',
    'nav.usefulLinks': 'Useful Links',
    'nav.legal': 'Legal Framework',
    'nav.team': 'Team',
    'nav.feedback': 'Feedback',
    'hero.title': 'Kyiv Lyceum "Ukrainian European School"',
    'hero.subtitle': 'Excellence in education, bridging cultures and knowledge.',
    'numbers.title': 'About Us in Numbers',
    'team.title': 'Our Professional Team',
    'platform.cta': 'Online Platform',
    'platform.transition': 'Transition to the platform',
    'footer.address': '27 Krakivska St., office 128, Kyiv, 02094, Ukraine',
    'footer.code': 'EDRPOU code 45751613',
    'footer.iban': 'IBAN UA54 305299 00000 26009016245165',
    'footer.bank': 'Private bank',
    'footer.director': 'Director Anastasia SHKURSKA'
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.about': 'À propos de nous',
    'nav.contacts': 'Contacts',
    'nav.students': 'Pour les étudiants',
    'nav.organizations': 'Pour les organisations',
    'nav.news': 'Nouvelles et Événements',
    'nav.partners': 'Partenaires',
    'nav.usefulLinks': 'Liens utiles',
    'nav.legal': 'Cadre juridique',
    'nav.team': 'Équipe',
    'nav.feedback': 'Commentaires',
    'hero.title': 'Lycée de Kyiv "École Européenne Ukrainienne"',
    'hero.subtitle': 'Excellence en éducation, reliant les cultures et les connaissances.',
    'numbers.title': 'Nous en chiffres',
    'team.title': 'Notre équipe professionnelle',
    'platform.cta': 'Plateforme en ligne',
    'platform.transition': 'Passage à la plateforme',
    'footer.address': '27 rue Krakivska, bureau 128, Kyiv, 02094, Ukraine',
    'footer.code': 'Code EDRPOU 45751613',
    'footer.iban': 'IBAN UA54 305299 00000 26009016245165',
    'footer.bank': 'Banque privée',
    'footer.director': 'Directrice Anastasia SHKURSKA'
  },
  lt: {
    'nav.home': 'Pradžia',
    'nav.about': 'Apie mus',
    'nav.contacts': 'Kontaktai',
    'nav.students': 'Studentams',
    'nav.organizations': 'Organizacijoms',
    'nav.news': 'Naujienos ir įvykiai',
    'nav.partners': 'Partneriai',
    'nav.usefulLinks': 'Naudingos nuorodos',
    'nav.legal': 'Teisinė sistema',
    'nav.team': 'Komanda',
    'nav.feedback': 'Atsiliepimai',
    'hero.title': 'Kijevo licėjus "Ukrainos Europos mokykla"',
    'hero.subtitle': 'Švietimo kompetencija, jungianti kultūras ir žinias.',
    'numbers.title': 'Apie mus skaičiais',
    'team.title': 'Mūsų profesionalų komanda',
    'platform.cta': 'Internetinė platforma',
    'platform.transition': 'Perėjimas į platformą',
    'footer.address': 'Krakivska g. 27, 128 kabinetas, Kijevas, 02094, Ukraina',
    'footer.code': 'EDRPOU kodas 45751613',
    'footer.iban': 'IBAN UA54 305299 00000 26009016245165',
    'footer.bank': 'Privatus bankas',
    'footer.director': 'Direktorė Anastasija SHKURSKA'
  },
  uk: {
    'nav.home': 'Головна',
    'nav.about': 'Про нас',
    'nav.contacts': 'Контакти',
    'nav.students': 'Студентам',
    'nav.organizations': 'Організаціям',
    'nav.news': 'Новини та події',
    'nav.partners': 'Партнери',
    'nav.usefulLinks': 'Корисні посилання',
    'nav.legal': 'Юридична база',
    'nav.team': 'Команда',
    'nav.feedback': 'Зворотній зв\'язок',
    'hero.title': 'Приватна організація (установа, заклад) "Київський ліцей "Українська європейська школа"',
    'hero.subtitle': 'Досконалість в освіті, що поєднує культури та знання.',
    'numbers.title': 'Про нас у цифрах',
    'team.title': 'Наша професійна команда',
    'platform.cta': 'Онлайн платформа',
    'platform.transition': 'Перехід на платформу',
    'footer.address': 'вул. Краківська, 27, офіс 128, м. Київ, 02094, Україна',
    'footer.code': 'Код ЄДРПОУ 45751613',
    'footer.iban': 'IBAN UA54 305299 00000 26009016245165',
    'footer.bank': 'Приват Банк',
    'footer.director': 'Директор Анастасія ШКУРСЬКА'
  }
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale && translations[savedLocale]) {
      setLocale(savedLocale);
    }
  }, []);

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
    document.documentElement.lang = newLocale;
  };

  const t = (key: string): string => {
    return translations[locale][key] || translations['en'][key] || key;
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale: handleSetLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};
