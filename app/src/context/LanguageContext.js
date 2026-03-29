'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import en from '@/i18n/en.json';
import de from '@/i18n/de.json';

const LanguageContext = createContext();

const translations = {
  en,
  de,
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const [mounted, setMounted] = useState(false);

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
    setMounted(true);
  }, []);

  // Save language to localStorage when it changes
  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
      localStorage.setItem('preferredLanguage', lang);
    }
  };

  // Translation function - supports nested keys like "permissions.location.name"
  const t = (key, defaultValue = key) => {
    const keys = key.split('.');
    let value = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return defaultValue;
      }
    }

    return typeof value === 'string' ? value : defaultValue;
  };

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
