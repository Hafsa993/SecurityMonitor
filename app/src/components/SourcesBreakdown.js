'use client';

import { useState } from 'react';

export default function SourcesBreakdown({ sources }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!sources || sources.length === 0) return null;

  return (
    <div className="mt-4 border-t border-divider pt-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-medium text-accent-light hover:text-accent transition-colors"
      >
        <span>{isOpen ? '▼' : '▶'}</span>
        <span>? How they know this ({sources.length} data points)</span>
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
                    {source.permissionName}
                  </div>
                  <div className="text-secondary text-xs mt-0.5">
                    {source.insight}
                  </div>
                </div>
              </div>
              <div className="ml-8 text-primary text-sm font-medium border-t border-divider pt-2 mt-2">
                → {source.adResult}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
