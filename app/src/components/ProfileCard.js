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
    if (level === 'Low') return 'bg-green-900 text-green-200';
    if (level === 'Moderate') return 'bg-yellow-900 text-yellow-200';
    if (level === 'High') return 'bg-orange-900 text-orange-200';
    if (level === 'Very High') return 'bg-red-900 text-red-200';
    return 'bg-red-950 text-red-100';
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
            <div className={`text-4xl font-bold ${
              profile.invasionLevel === 'Extreme' ? 'text-red-300' :
              profile.invasionLevel === 'Very High' ? 'text-orange-300' :
              profile.invasionLevel === 'High' ? 'text-yellow-300' :
              'text-green-300'
            }`}>
              {profile.invasionLevel}
            </div>
            <div className="text-sm opacity-75">Privacy Risk</div>
          </div>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid md:grid-cols-2 gap-6">
        {profile.categories.map((category, idx) => (
          <div key={idx} className="bg-slate-700 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleCategory(idx)}
              className="w-full text-left p-6 hover:bg-slate-600 transition-colors flex items-center justify-between"
            >
              <h3 className="text-lg font-semibold text-orange-300">{category.title}</h3>
              <span className="text-orange-300 text-xl flex-shrink-0">
                {openCategories[idx] ? '▼' : '▶'}
              </span>
            </button>
            
            {openCategories[idx] && (
              <div className="px-6 pb-6 border-t border-slate-600 bg-slate-800 bg-opacity-50">
                <ul className="space-y-2">
                  {category.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2">
                      <span className="text-orange-400 flex-shrink-0 mt-1">→</span>
                      <span className="text-slate-200 text-sm">{item}</span>
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
        <div className="bg-red-900 bg-opacity-30 border border-red-600 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-300 mb-3">⚠️ Permission Combination Risk</h3>
          <p className="text-red-200">{profile.comboWarning}</p>
        </div>
      )}

      {/* Scenarios */}
      <div className="bg-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-orange-300">What They Could Do With This Data</h3>
        <ul className="space-y-4">
          {profile.scenarios.map((scenario, idx) => (
            <li key={idx} className="border border-slate-600 rounded-lg p-4">
              <div className="flex items-start gap-3 mb-2">
                <span className="text-xl flex-shrink-0 mt-0.5">{scenario.icon}</span>
                <div className="flex-1">
                  <div className="font-semibold text-slate-200">{scenario.title}</div>
                  <div className="text-slate-400 text-sm">{scenario.description}</div>
                </div>
              </div>
              {scenario.sources && <SourcesBreakdown sources={scenario.sources} />}
            </li>
          ))}
        </ul>
      </div>

      {/* Protection Tips */}
      <div className="bg-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-green-400">🛡️ How to Protect Yourself</h3>
        <ul className="space-y-2 text-slate-300">
          {profile.protectionTips.map((tip, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="text-green-400 flex-shrink-0">✓</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
