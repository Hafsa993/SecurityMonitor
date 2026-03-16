'use client';

export default function ProfileCard({ profile, permissions }) {
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
          <div key={idx} className="bg-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-orange-300">{category.title}</h3>
            <ul className="space-y-2">
              {category.items.map((item, itemIdx) => (
                <li key={itemIdx} className="flex items-start gap-2">
                  <span className="text-orange-400 flex-shrink-0 mt-1">→</span>
                  <span className="text-slate-200">{item}</span>
                </li>
              ))}
            </ul>
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
        <ul className="space-y-3">
          {profile.scenarios.map((scenario, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0 mt-0.5">{scenario.icon}</span>
              <div>
                <div className="font-semibold text-slate-200">{scenario.title}</div>
                <div className="text-slate-400 text-sm">{scenario.description}</div>
              </div>
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
