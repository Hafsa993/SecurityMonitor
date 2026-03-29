'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import PermissionTracker from '@/components/PermissionTracker';
import LanguageToggle from '@/components/LanguageToggle';

export default function Home() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <LanguageToggle />
      <main className="min-h-screen p-6 md:p-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              {t('app.title', 'Privacy Tracker')}
            </h1>
            <p className="text-xl text-slate-300 mb-2">
              {t('app.subtitle', 'See what websites can know about you with different permissions')}
            </p>
            <p className="text-slate-400">
              {t('app.description', 'Toggle permissions and adjust the tracking duration to see your data profile')}
            </p>
          </div>

          <PermissionTracker />
        </div>
      </main>
    </>
  );
}
