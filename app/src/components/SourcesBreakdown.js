'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function SourcesBreakdown({ sources }) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  if (!sources || sources.length === 0) return null;

  const translatePermissionName = (name) => {
    const permissionMap = {
      'Location': 'permissions.location.name',
      'Camera': 'permissions.camera.name',
      'Microphone': 'permissions.microphone.name',
      'Clipboard': 'permissions.clipboard.name',
      'Contacts': 'permissions.contacts.name',
      'Audio': 'permissions.microphone.name',
      'Activity': 'permissions.notifications.name',
      'Notifications': 'permissions.notifications.name',
    };
    return t(permissionMap[name] || '', name);
  };

  return (
    <div className="mt-4 border-t border-divider pt-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-medium text-accent-light hover:text-accent transition-colors"
      >
        <span>{isOpen ? '▼' : '▶'}</span>
        <span>{t('sourcesBreakdown.label', '? How they know this')}</span>
      </button>

      {isOpen && (
        <div className="mt-3 space-y-2">
          {sources.map((source, idx) => (
            <div
              key={idx}
              className="card-bg-secondary rounded-lg p-3 border-accent"
            >
              <div className="flex items-start gap-2 mb-1">
                <span className="text-lg">{source.permissionEmoji}</span>
                <div className="flex-1">
                  <div className="font-semibold text-primary text-sm">
                    {translatePermissionName(source.permissionName)}
                  </div>
                  <div className="text-secondary text-xs mt-0.5">
                    {source.insightKey ? t(source.insightKey, source.insight) : source.insight}
                  </div>
                </div>
              </div>
              <div className="ml-8 text-primary text-sm font-medium border-t border-divider pt-2 mt-2">
                → {source.adResultKey ? t(source.adResultKey, source.adResult) : source.adResult}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
