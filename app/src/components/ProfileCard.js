'use client';

import { useState } from 'react';
import SourcesBreakdown from './SourcesBreakdown';

export default function ProfileCard({ profile, permissions }) {
  const [openCategories, setOpenCategories] = useState({});

  const toggleCategory = (idx) => {
    setOpenCategories(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
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
            <h2 className="text-3xl font-bold mb-2">Data Profile Summary</h2>
            <p className="text-lg opacity-90">After {profile.duration} of tracking</p>
          </div>
          <div className="text-right">
            <div className={`text-4xl font-bold ${getInvasionDisplayColor(profile.invasionLevel)}`}>
              {profile.invasionLevel}
            </div>
            <div className="text-sm opacity-75">Privacy Risk</div>
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
              <h3 className="text-lg font-semibold text-accent">{category.title}</h3>
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
                      <span className="text-secondary text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Permission Combo Warning */}
      {profile.comboWarning && (
        <div className="warning-box rounded-lg p-6">
          <h3 className="text-lg font-semibold warning-heading mb-3">⚠️ Permission Combination Risk</h3>
          <p className="warning-text">{profile.comboWarning}</p>
        </div>
      )}

      {/* Scenarios */}
      <div className="card-bg rounded-lg p-6">
        <h3 className="heading-accent mb-4">What They Could Do With This Data</h3>
        <ul className="space-y-4">
          {profile.scenarios.map((scenario, idx) => (
            <li key={idx} className="border border-divider rounded-lg p-4">
              <div className="flex items-start gap-3 mb-2">
                <span className="text-xl flex-shrink-0 mt-0.5">{scenario.icon}</span>
                <div className="flex-1">
                  <div className="font-semibold text-primary">{scenario.title}</div>
                  <div className="text-secondary text-sm">{scenario.description}</div>
                </div>
              </div>
              {scenario.sources && <SourcesBreakdown sources={scenario.sources} />}
            </li>
          ))}
        </ul>
      </div>

      {/* Protection Tips */}
      <div className="card-bg rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4" style={{color: 'rgb(134, 239, 172)'}}>🛡️ How to Protect Yourself</h3>
        <ul className="space-y-2 text-secondary">
          {profile.protectionTips.map((tip, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span style={{color: 'rgb(134, 239, 172)'}} className="flex-shrink-0">✓</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
