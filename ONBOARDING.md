# Onboarding Guide - Utils Module

Welcome to the SecurityMonitor codebase! This guide helps you understand the utils architecture in 5 minutes.

## Quick Start

### What does this module do?

Generates privacy threat profiles showing what data apps can collect based on requested permissions.

**Input**: Permissions (location, camera, etc.) + duration + persona (max/sarah)  
**Output**: Profile with categories, scenarios, warnings, and tips

### File Overview

```
📄 permissionConfigs.js    → Data: What each permission reveals (shared)
📄 personaConfigs.js       → Data: How personas differ (max, sarah)
📄 permissionBuilder.js    → Logic: Builds permission sections
📄 profileGenerator.js     → Orchestrator: Puts it all together
```

---

## Understanding the Flow

### Step 1: User selects permissions
```javascript
const enabledPermissions = [
  { id: 'location' },
  { id: 'camera' },
  { id: 'contacts' }
];
const persona = { id: 'max' };
const duration = 30; // days
```

### Step 2: Call the main function
```javascript
const profile = generateProfile(enabledPermissions, duration, persona);
```

### Step 3: Inside profileGenerator.js
```javascript
// For each enabled permission:
if (hasPermission('location')) {
  const section = buildLocationSection(hasPermission, 'max');
  categories.push(section.category);
  scenarios.push(...section.scenarios);
}
```

### Step 4: buildLocationSection combines data
```javascript
const config = PERMISSION_CONFIGS.location;        // Base data
const personaData = getPersonaData('max');         // Persona data
const mergedItems = [...config.baseItems];
mergedItems.push(...personaData.location.extraItems);
```

### Step 5: Return profile
```javascript
{
  duration: "1 month",
  invasionLevel: "High",
  categories: [
    { title: "📍 Location & Movement", items: [...] },
    { title: "📹 Visual Information", items: [...] },
    { title: "👥 Social Network & Relationships", items: [...] }
  ],
  scenarios: [...],
  comboWarning: "💡 Location + Contacts = ...",
  protectionTips: [...]
}
```

---

## Common Tasks

### Task 1: Change location description for "max" persona

**File**: `personaConfigs.js`  
**Find**: `max → location → description`  
**Edit**:
```javascript
max: {
  location: {
    extraItems: [...],
    description: 'Your NEW description here', // ← Change this
    baseSources: [...]
  }
}
```

**Impact**: Only affects "max" persona, no logic changes needed ✅

---

### Task 2: Add a new persona (e.g., "developer")

**File**: `personaConfigs.js`  
**Add** at the end of `PERSONA_CONFIGS`:
```javascript
developer: {
  location: { extraItems, description, baseSources },
  camera: { items, description, sources },
  microphone: { /* ... */ },
  clipboard: { /* ... */ },
  contacts: { /* ... */ },
  notifications: { /* ... */ },
  comboWarnings: { /* ... */ }
}
```

**That's it!** No changes to other files needed ✅

---

### Task 3: Update base permission content (all personas)

**File**: `permissionConfigs.js`  
**Find**: `location → baseItems` or `location → scenarios`  
**Edit**:
```javascript
location: {
  baseItems: [
    'Your exact home address and work location',
    'Daily movement patterns and routines',
    'NEW ITEM HERE', // ← Add/edit base items
  ],
  categoryTitle: '📍 Location & Movement',
  scenarios: [...]
}
```

**Impact**: Affects all personas (max, sarah, default) ✅

---

### Task 4: Add a new permission type (e.g., "biometrics")

**3 steps**:

1. **Add to permissionConfigs.js**:
```javascript
biometrics: {
  baseItems: ['Fingerprint data', 'Facial structure', ...],
  categoryTitle: '👆 Biometric Data',
  scenarios: [...]
}
```

2. **Add builder to permissionBuilder.js**:
```javascript
export function buildBiometricsSection(personaId) {
  const config = PERMISSION_CONFIGS.biometrics;
  const items = [...config.baseItems];
  const personaData = getPersonaData(personaId);
  // ... follow the same pattern as other builders
  return { category: {...}, scenarios: [...] };
}
```

3. **Add to personaConfigs.js** (for each persona):
```javascript
max: {
  location: {...},
  biometrics: {  // ← Add here
    items: [...],
    description: '...',
    sources: [...]
  },
  // ...
}
```

4. **Add to profileGenerator.js**:
```javascript
// Import the builder
import { buildBiometricsSection } from './permissionBuilder.js';

// Call it in generateProfile
if (hasPermission('biometrics')) {
  const biometricsSection = buildBiometricsSection(personaId);
  categories.push(biometricsSection.category);
  scenarios.push(...biometricsSection.scenarios);
}
```

---

## Architecture Principles

### 🔄 Separation of Concerns
- **permissionConfigs** = What (data)
- **personaConfigs** = Who (persona variations)
- **permissionBuilder** = How (logic)
- **profileGenerator** = When/Where (orchestration)

### 🔌 Single Responsibility
```
Change permission behavior? → permissionBuilder.js
Change persona content? → personaConfigs.js
Change base content? → permissionConfigs.js
Change output format? → profileGenerator.js
```

### 🔗 Loose Coupling
Builders don't know about each other. ProfileGenerator orchestrates them.

```javascript
// ✅ Good: Independent builders
buildLocationSection(hasPermission, personaId); // works alone
buildCameraSection(personaId);                   // works alone

// ❌ Bad: Would be coupled
location logic depends on camera logic → PAIN
```

---

## Debugging Tips

### Check if a persona exists:
```javascript
import { getPersonaData } from './personaConfigs.js';
const data = getPersonaData('unknown'); // null if doesn't exist
```

### Test a single section:
```javascript
import { buildLocationSection } from './permissionBuilder.js';
const section = buildLocationSection(
  (id) => true,  // hasPermission always returns true
  'max'
);
console.log(section);
```

### Trace the output:
```javascript
// In profileGenerator.js, add:
console.log('Categories:', categories);
console.log('Scenarios:', scenarios);
console.log('Final profile:', { duration, invasionLevel, categories, scenarios, ... });
```

---

## FAQ

**Q: Where do I add new content for the "sarah" persona?**  
A: `personaConfigs.js` → `sarah` object

**Q: Will adding a new persona affect existing code?**  
A: No! It's purely data-driven. Builders automatically pick it up.

**Q: What if I only want to change one detail for a persona?**  
A: Edit that one property in personaConfigs.js. Very surgical.

**Q: How do I add cross-permission logic (like "location + microphone")?**  
A: In permissionBuilder.js, use `if (hasPermission('other')) { ... }`

**Q: Where are the combo warnings defined?**  
A: `personaConfigs.js` → `[personaId].comboWarnings`

**Q: What's the relationship between baseItems and items?**  
A:  - `baseItems` (permissionConfigs): Default items for all users
     - `items` (personaConfigs): Override all baseItems for that persona
     - `extraItems` (personaConfigs): Add these to baseItems

---

## Resources

- Full architecture details: See `ARCHITECTURE.md`
- Tests: Look for `.test.js` files in `/tests/utils/`
- Component usage: Check `/components/PermissionTracker.js`

**Questions?** Ask in the team Slack or check the ARCHITECTURE.md for detailed explanations.
