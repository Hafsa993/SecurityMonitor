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
    if (days <= 1) return 'invasion-display-low';
    if (days <= 7) return 'invasion-display-moderate';
    if (days <= 30) return 'invasion-display-high';
    if (days <= 90) return 'invasion-display-veryHigh';
    return 'invasion-display-extreme';
  };

  return (
    <div className="card-bg rounded-lg p-6">
      <h2 className="heading-accent mb-4">Tracking Duration</h2>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-primary font-medium">{getDurationLabel(value)}</span>
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
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              accentColor: 'var(--color-accent)'
            }}
          />
          <div className="flex justify-between text-xs text-secondary mt-2">
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
                  ? 'btn-primary'
                  : 'btn-secondary'
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
