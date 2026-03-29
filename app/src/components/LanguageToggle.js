'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function LanguageToggle() {
  const { language, changeLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'de' : 'en';
    changeLanguage(newLanguage);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-6 right-6 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium transition-colors z-50"
      title={language === 'en' ? 'Switch to German' : 'Switch to English'}
    >
      {language === 'en' ? 'Deutsch' : 'English'}
    </button>
  );
}
