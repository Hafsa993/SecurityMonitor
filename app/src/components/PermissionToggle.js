'use client';

export default function PermissionToggle({ permission, enabled, onChange }) {
  return (
    <label className="flex items-center justify-between p-3 bg-slate-600 rounded-lg hover:bg-slate-500 transition-colors cursor-pointer">
      <div className="flex items-center gap-3 flex-1">
        <span className="text-2xl">{permission.icon}</span>
        <div>
          <div className="font-medium text-white">{permission.name}</div>
          <div className="text-xs text-slate-400">{permission.description}</div>
        </div>
      </div>
      <input
        type="checkbox"
        checked={enabled}
        onChange={onChange}
        className="w-6 h-6 rounded accent-orange-500 cursor-pointer"
      />
    </label>
  );
}
