'use client';

import { useState } from 'react';

export default function SourcesBreakdown({ sources }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!sources || sources.length === 0) return null;

  return (
    <div className="mt-4 border-t border-slate-600 pt-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-medium text-orange-400 hover:text-orange-300 transition-colors"
      >
        <span>{isOpen ? '▼' : '▶'}</span>
        <span>? How they know this ({sources.length} data points)</span>
      </button>

      {isOpen && (
        <div className="mt-3 space-y-2">
          {sources.map((source, idx) => (
            <div
              key={idx}
              className="bg-slate-600 rounded-lg p-3 border-l-4 border-orange-500"
            >
              <div className="flex items-start gap-2 mb-1">
                <span className="text-lg">{source.permissionEmoji}</span>
                <div className="flex-1">
                  <div className="font-semibold text-slate-200 text-sm">
                    {source.permissionName}
                  </div>
                  <div className="text-slate-400 text-xs mt-0.5">
                    {source.insight}
                  </div>
                </div>
              </div>
              <div className="ml-8 text-slate-300 text-sm font-medium border-t border-slate-500 pt-2 mt-2">
                → {source.adResult}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
