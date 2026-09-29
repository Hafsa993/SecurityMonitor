'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import PermissionToggle from './PermissionToggle';
import ProfileCard from './ProfileCard';
import DurationSlider from './DurationSlider';
import PersonaSelector from './PersonaSelector';
import { generateProfile } from '@/utils/profileGenerator';
import { PERSONAS } from '@/utils/personas';

export default function PermissionTracker() {
  const { t } = useLanguage();
  const [permissions, setPermissions] = useState({
    location: false,
    camera: false,
    microphone: false,
    clipboard: false,
    contacts: false,
    notifications: false,
  });
  const [duration, setDuration] = useState(7); // days
  const [selectedPersona, setSelectedPersona] = useState('anonymous');
  const [profile, setProfile] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Define PERMISSIONS with translations
  const PERMISSIONS = [
    {
      id: 'location',
      name: t('permissions.location.name', 'Location'),
      icon: '📍',
      description: t('permissions.location.description', 'Access to your current location and movement patterns'),
    },
    {
      id: 'camera',
      name: t('permissions.camera.name', 'Camera'),
      icon: '📹',
      description: t('permissions.camera.description', 'Access to your device camera and visual feed'),
    },
    {
      id: 'microphone',
      name: t('permissions.microphone.name', 'Microphone'),
      icon: '🎤',
      description: t('permissions.microphone.description', 'Access to your device microphone and audio'),
    },
    {
      id: 'clipboard',
      name: t('permissions.clipboard.name', 'Clipboard'),
      icon: '📋',
      description: t('permissions.clipboard.description', 'Access to everything you copy or paste'),
    },
    {
      id: 'contacts',
      name: t('permissions.contacts.name', 'Contacts'),
      icon: '👥',
      description: t('permissions.contacts.description', 'Access to your contacts and social connections'),
    },
    {
      id: 'notifications',
      name: t('permissions.notifications.name', 'Notifications'),
      icon: '🔔',
      description: t('permissions.notifications.description', 'Permission to send you notifications'),
    },
  ];

  // Initialize permissions and persona from localStorage
  useEffect(() => {
    try {
      const savedState = JSON.parse(localStorage.getItem('permissionTrackerState'));
      if (savedState) {
        // Merge over the defaults so state saved by an older version can't leave a toggle undefined
        setPermissions((prev) => ({ ...prev, ...savedState.permissions }));
        if (typeof savedState.duration === 'number') setDuration(savedState.duration);
        if (savedState.selectedPersona) setSelectedPersona(savedState.selectedPersona);
      }
    } catch {
      // Unreadable saved state: keep the defaults
    }
    setHasLoaded(true);
  }, []);

  // Update profile when permissions, duration, or persona changes
  useEffect(() => {
    const enabledPermissions = Object.keys(permissions)
      .filter((key) => permissions[key])
      .map((key) => PERMISSIONS.find((p) => p.id === key));

    const currentPersona = PERSONAS[selectedPersona];
    const newProfile = generateProfile(enabledPermissions, duration, currentPersona);
    setProfile(newProfile);

    // Don't save before the saved state has been loaded, or the defaults would overwrite it
    if (!hasLoaded) return;
    localStorage.setItem(
      'permissionTrackerState',
      JSON.stringify({ permissions, duration, selectedPersona })
    );
  }, [permissions, duration, selectedPersona, hasLoaded]);

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
          <div className="card-bg rounded-lg p-6">
            <h2 className="heading-accent mb-4">
              {t('permissionTracker.permissionsLabel', 'Permissions')} ({enabledCount}/{PERMISSIONS.length})
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
          <div className="card-bg rounded-lg p-12 text-center">
            <p className="text-2xl mb-4">🛡️</p>
            <p className="text-xl font-semibold text-primary mb-2">{t('permissionTracker.noPermissionsTitle', 'No Permissions Enabled')}</p>
            <p className="text-secondary">
              {t('permissionTracker.noPermissionsMessage', 'Toggle some permissions above to see what a website could know about you')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
