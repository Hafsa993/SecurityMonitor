'use client';

import { useState, useEffect } from 'react';
import PermissionToggle from './PermissionToggle';
import ProfileCard from './ProfileCard';
import DurationSlider from './DurationSlider';
import PersonaSelector from './PersonaSelector';
import { generateProfile } from '@/utils/profileGenerator';
import { PERSONAS } from '@/utils/personas';

const PERMISSIONS = [
  {
    id: 'location',
    name: 'Location',
    icon: '📍',
    description: 'Access to your current location and movement patterns',
  },
  {
    id: 'camera',
    name: 'Camera',
    icon: '📹',
    description: 'Access to your device camera and visual feed',
  },
  {
    id: 'microphone',
    name: 'Microphone',
    icon: '🎤',
    description: 'Access to your device microphone and audio',
  },
  {
    id: 'clipboard',
    name: 'Clipboard',
    icon: '📋',
    description: 'Access to everything you copy or paste',
  },
  {
    id: 'contacts',
    name: 'Contacts',
    icon: '👥',
    description: 'Access to your contacts and social connections',
  },
  {
    id: 'notifications',
    name: 'Notifications',
    icon: '🔔',
    description: 'Permission to send you notifications',
  },
];

export default function PermissionTracker() {
  const [permissions, setPermissions] = useState({});
  const [duration, setDuration] = useState(7); // days
  const [selectedPersona, setSelectedPersona] = useState('anonymous');
  const [profile, setProfile] = useState(null);

  // Initialize permissions and persona from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('permissionTrackerState');
    if (savedState) {
      const { permissions: savedPermissions, duration: savedDuration, selectedPersona: savedPersona } = JSON.parse(savedState);
      setPermissions(savedPermissions);
      setDuration(savedDuration);
      if (savedPersona) setSelectedPersona(savedPersona);
    } else {
      const initialPermissions = {};
      PERMISSIONS.forEach((p) => {
        initialPermissions[p.id] = false;
      });
      setPermissions(initialPermissions);
    }
  }, []);

  // Update profile when permissions, duration, or persona changes
  useEffect(() => {
    const enabledPermissions = Object.keys(permissions)
      .filter((key) => permissions[key])
      .map((key) => PERMISSIONS.find((p) => p.id === key));

    const currentPersona = PERSONAS[selectedPersona];
    const newProfile = generateProfile(enabledPermissions, duration, currentPersona);
    setProfile(newProfile);

    // Save state to localStorage
    localStorage.setItem(
      'permissionTrackerState',
      JSON.stringify({ permissions, duration, selectedPersona })
    );
  }, [permissions, duration, selectedPersona]);

  const togglePermission = (id) => {
    setPermissions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const enabledCount = Object.values(permissions).filter(Boolean).length;

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Controls */}
      <div className="lg:col-span-1">
        <div className="sticky top-6 space-y-6">
          {/* Persona Selector */}
          <PersonaSelector 
            selectedPersona={selectedPersona} 
            onPersonaChange={setSelectedPersona}
          />

          {/* Duration Slider */}
          <DurationSlider value={duration} onChange={setDuration} />

          {/* Permissions */}
          <div className="bg-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-orange-300">
              Permissions ({enabledCount}/{PERMISSIONS.length})
            </h2>
            <div className="space-y-3">
              {PERMISSIONS.map((permission) => (
                <PermissionToggle
                  key={permission.id}
                  permission={permission}
                  enabled={permissions[permission.id]}
                  onChange={() => togglePermission(permission.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Display */}
      <div className="lg:col-span-2">
        {profile && <ProfileCard profile={profile} permissions={permissions} />}

        {enabledCount === 0 && (
          <div className="bg-slate-700 rounded-lg p-12 text-center">
            <p className="text-2xl mb-4">🛡️</p>
            <p className="text-xl font-semibold text-slate-300 mb-2">No Permissions Enabled</p>
            <p className="text-slate-400">
              Toggle some permissions above to see what a website could know about you
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
