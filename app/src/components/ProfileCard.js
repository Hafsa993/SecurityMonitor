'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getPersonaDescription } from '@/utils/personaConfigs';
import SourcesBreakdown from './SourcesBreakdown';

export default function ProfileCard({ profile, permissions }) {
  const { t, language } = useLanguage();
  const [openCategories, setOpenCategories] = useState({});

  const toggleCategory = (idx) => {
    setOpenCategories(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const getInvasionLevelKey = (level) => {
    const levelMap = {
      'Low': 'low',
      'Moderate': 'moderate',
      'High': 'high',
      'Very High': 'veryHigh',
      'Extreme': 'extreme',
    };
    return levelMap[level] || level.toLowerCase();
  };

  const getInvasionBadgeColor = (level) => {
    if (level === 'Low') return 'invasion-low';
    if (level === 'Moderate') return 'invasion-moderate';
    if (level === 'High') return 'invasion-high';
    if (level === 'Very High') return 'invasion-veryHigh';
    return 'invasion-extreme';
  };

  const getInvasionDisplayColor = (level) => {
    if (level === 'Extreme') return 'invasion-display-extreme';
    if (level === 'Very High') return 'invasion-display-veryHigh';
    if (level === 'High') return 'invasion-display-high';
    return 'invasion-display-low';
  };

  return (
    <div className="space-y-6">
      {/* Invasion Level Header */}
      <div className={`profile-card ${getInvasionBadgeColor(profile.invasionLevel)} p-8 rounded-lg`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">{t('profileCard.title', 'Data Profile Summary')}</h2>
            <p className="text-lg opacity-90">{t('profileCard.subtitle', 'After')} {profile.duration} {t('profileCard.ofTracking', 'of tracking')}</p>
          </div>
          <div className="text-right">
            <div className={`text-4xl font-bold ${getInvasionDisplayColor(profile.invasionLevel)}`}>
              {t(`durationSlider.invasionLevels.${getInvasionLevelKey(profile.invasionLevel)}`, profile.invasionLevel)}
            </div>
            <div className="text-sm opacity-75">{t('profileCard.privacyRisk', 'Privacy Risk')}</div>
          </div>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid md:grid-cols-2 gap-6">
        {profile.categories.map((category, idx) => (
          <div key={idx} className="card-bg rounded-lg overflow-hidden">
            <button
              onClick={() => toggleCategory(idx)}
              className="w-full text-left p-6 card-hover transition-colors flex items-center justify-between"
            >
              <h3 className="text-lg font-semibold text-accent">
                {category.titleKey 
                  ? t(category.titleKey, category.title) 
                  : category.title}
              </h3>
              <span className="text-accent text-xl flex-shrink-0">
                {openCategories[idx] ? '▼' : '▶'}
              </span>
            </button>
            
            {openCategories[idx] && (
              <div className="px-6 pb-6 border-t border-divider card-bg-secondary bg-opacity-50">
                <ul className="space-y-2">
                  {category.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2">
                      <span className="text-accent-light flex-shrink-0 mt-1">→</span>
                      <span className="text-secondary text-sm">
                        {category.permissionType && category.baseItemsLength !== undefined
                          ? itemIdx < category.baseItemsLength
                            ? t(`permissionConfigs.${category.permissionType}.baseItems.${itemIdx}`, item)
                            : t(`items.${profile.personaId}.${category.permissionType}.extraItems.${itemIdx - category.baseItemsLength}`, item)
                          : item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
       
      {/* Scenarios */}
      <div className="card-bg rounded-lg p-6">
        <h3 className="heading-accent mb-4">{t('profileCard.scenarios', 'What They Could Do With This Data')}</h3>
        <ul className="space-y-4">
          {profile.scenarios.map((scenario, idx) => {
            let displayDescription = scenario.description;
            
            // If this scenario has persona-specific content, translate it
            if (scenario.permissionType && profile.personaId && language === 'de') {
              const translated = getPersonaDescription(profile.personaId, scenario.permissionType, 'de');
              if (translated) {
                displayDescription = translated;
              }
            }
            
            return (
            <li key={idx} className="border border-divider rounded-lg p-4">
              <div className="flex items-start gap-3 mb-2">
                <span className="text-xl flex-shrink-0 mt-0.5">{scenario.icon}</span>
                <div className="flex-1">
                  <div className="font-semibold text-primary">{scenario.titleKey ? t(scenario.titleKey, scenario.title) : scenario.title}</div>
                  <div className="text-secondary text-sm">
                    {scenario.descriptionKey 
                      ? t(scenario.descriptionKey, displayDescription) 
                      : displayDescription}
                  </div>
                </div>
              </div>
              {scenario.sources && <SourcesBreakdown sources={scenario.sources} />}
            </li>
           );
          })}
        </ul>
      </div>

      {/* Protection Tips */}
      <div className="card-bg rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4" style={{color: 'rgb(134, 239, 172)'}}>🛡️ {t('profileCard.protectionTitle', 'How to Protect Yourself')}</h3>
        <ul className="space-y-2 text-secondary">
          {profile.protectionTips.map((tip, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span style={{color: 'rgb(134, 239, 172)'}} className="flex-shrink-0">✓</span>
              <span>{t(`protectionTips.${idx}`, tip)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
