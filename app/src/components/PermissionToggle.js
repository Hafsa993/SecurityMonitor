'use client';

export default function PermissionToggle({ permission, enabled, onChange }) {
  return (
    <label className="permission-toggle">
      <div className="flex items-center gap-3 flex-1">
        <span className="text-2xl">{permission.icon}</span>
        <div>
          <div className="font-medium text-primary">{permission.name}</div>
          <div className="text-xs text-secondary">{permission.description}</div>
        </div>
      </div>
      <input
        type="checkbox"
        checked={enabled}
        onChange={onChange}
        className="w-6 h-6 rounded cursor-pointer"
        style={{accentColor: 'var(--color-accent)'}}
      />
    </label>
  );
}
