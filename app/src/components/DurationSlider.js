'use client';

const DURATION_OPTIONS = [
  { value: 1, label: '1 day' },
  { value: 7, label: '1 week' },
  { value: 30, label: '1 month' },
  { value: 90, label: '3 months' },
  { value: 365, label: '1 year' },
];

export default function DurationSlider({ value, onChange }) {
  const getDurationLabel = (days) => {
    const opt = DURATION_OPTIONS.find((o) => o.value === days);
    return opt ? opt.label : `${days} days`;
  };

  const getInvasionLevel = (days) => {
    if (days <= 1) return 'Low';
    if (days <= 7) return 'Moderate';
    if (days <= 30) return 'High';
    if (days <= 90) return 'Very High';
    return 'Extreme';
  };

  const getInvasionColor = (days) => {
    if (days <= 1) return 'text-green-400';
    if (days <= 7) return 'text-yellow-400';
    if (days <= 30) return 'text-orange-400';
    if (days <= 90) return 'text-red-400';
    return 'text-red-600';
  };

  return (
    <div className="bg-slate-700 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-orange-300">Tracking Duration</h2>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-white font-medium">{getDurationLabel(value)}</span>
            <span className={`font-semibold ${getInvasionColor(value)}`}>
              {getInvasionLevel(value)} Risk
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="365"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-2">
            <span>1 day</span>
            <span>365 days</span>
          </div>
        </div>

        {/* Quick select buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          {DURATION_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className={`py-2 px-2 rounded text-sm font-medium transition-colors ${
                value === opt.value
                  ? 'bg-orange-500 text-white'
                  : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
