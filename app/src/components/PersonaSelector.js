'use client';

import { PERSONAS } from '@/utils/personas';

export default function PersonaSelector({ selectedPersona, onPersonaChange }) {
  const personaList = ['anonymous', 'max', 'sarah'];

  const getPersonaDisplay = (personaId) => {
    const persona = PERSONAS[personaId];
    if (!persona) return { emoji: '❓', name: 'Unknown', type: '' };
    return {
      emoji: persona.emoji,
      name: persona.name,
      type: persona.type,
    };
  };

  return (
    <div className="bg-slate-700 rounded-lg p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4 text-orange-300">
        Select a Persona
      </h2>
      <div className="grid grid-cols-3 gap-2">
        {personaList.map((personaId) => {
          const display = getPersonaDisplay(personaId);
          const isSelected = selectedPersona === personaId;

          return (
            <button
              key={personaId}
              onClick={() => onPersonaChange(personaId)}
              className={`p-3 rounded-lg font-medium transition-all ${
                isSelected
                  ? 'bg-orange-500 text-slate-900 ring-2 ring-orange-300'
                  : 'bg-slate-600 text-slate-200 hover:bg-slate-500'
              }`}
            >
              <div className="text-2xl mb-1">{display.emoji}</div>
              <div className="text-xs font-semibold uppercase tracking-wide">
                {display.name}
              </div>
              <div className="text-xs opacity-75">{display.type}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
