'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function DurationSlider({ value, onChange }) {
  const { t } = useLanguage();

  const DURATION_OPTIONS = [
    { value: 1, label: t('durationSlider.durations.1', '1 day') },
    { value: 7, label: t('durationSlider.durations.7', '1 week') },
    { value: 30, label: t('durationSlider.durations.30', '1 month') },
    { value: 90, label: t('durationSlider.durations.90', '3 months') },
    { value: 365, label: t('durationSlider.durations.365', '1 year') },
  ];

  const getDurationLabel = (days) => {
    const opt = DURATION_OPTIONS.find((o) => o.value === days);
    return opt ? opt.label : `${days} ${t('durationSlider.days', 'days')}`;
  };

  const getInvasionLevel = (days) => {
    if (days <= 1) return t('durationSlider.invasionLevels.low', 'Low');
    if (days <= 7) return t('durationSlider.invasionLevels.moderate', 'Moderate');
    if (days <= 30) return t('durationSlider.invasionLevels.high', 'High');
    if (days <= 90) return t('durationSlider.invasionLevels.veryHigh', 'Very High');
    return t('durationSlider.invasionLevels.extreme', 'Extreme');
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
      <h2 className="heading-accent mb-4">{t('durationSlider.label', 'Tracking Duration')}</h2>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-primary font-medium">{getDurationLabel(value)}</span>
            <span className={`font-semibold ${getInvasionColor(value)}`}>
              {getInvasionLevel(value)} {t('durationSlider.risk', 'Risk')}
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="365"
            value={value}
            aria-label={t('durationSlider.label', 'Tracking Duration')}
            aria-valuetext={getDurationLabel(value)}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              accentColor: 'var(--color-accent)'
            }}
          />
          <div className="flex justify-between text-xs text-secondary mt-2">
            <span>{t('durationSlider.durations.1', '1 day')}</span>
            <span>{t('durationSlider.durations.365', '1 year')}</span>
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
