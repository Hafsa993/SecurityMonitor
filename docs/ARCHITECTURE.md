# Architecture

Privacy Tracker is a client-side Next.js (App Router) app. There is no backend: the profile is computed in the browser from static data, and the user's selections are kept in `localStorage`.

## Data flow

```
PermissionTracker (state: permissions, duration, persona)
        │
        ▼
generateProfile(enabledPermissions, days, persona)       utils/profileGenerator.js
        │  for each enabled permission
        ▼
build<Permission>Section(...)                             utils/permissionBuilder.js
        │  base content                persona overrides
        ├──────────────► PERMISSION_CONFIGS   PERSONA_CONFIGS ◄──┤
        ▼                utils/permissionConfigs.js   utils/personaConfigs.js
profile { duration, durationDays, invasionLevel, categories, scenarios, protectionTips, personaId }
        │
        ▼
ProfileCard → SourcesBreakdown                            components/
```

### `utils/`

| File | Role |
|---|---|
| `permissionConfigs.js` | Content shared by all personas: category title, base items and two scenarios (main + "Legal Reality") per permission |
| `personaConfigs.js` | Per-persona extras (`max`, `sarah`): extra items, a replacement description (English + `descriptionDe`) and the "How they know this" sources |
| `permissionBuilder.js` | One builder per permission. Merges base config and persona data into `{ category, scenarios }`. Location, contacts and notifications also receive `hasPermission` to add cross-permission sources (e.g. location + microphone) |
| `profileGenerator.js` | Runs the builders for the enabled permissions, computes the invasion level (`permissions × days`) and adds protection tips |
| `personas.js` | Persona cards shown in the selector |

The `anonymous` persona has no entry in `PERSONA_CONFIGS`, so it gets the generic content.

## Translations

`context/LanguageContext.js` provides `t(key, fallback)` and the current `language` (`en` / `de`, saved in `localStorage`). Texts live in `i18n/en.json` and `i18n/de.json`, which must have the same keys (enforced by `translationUtils.test.js`).

Data objects carry translation keys next to their English text, and components call `t(key, englishText)`:

| Content | Key pattern |
|---|---|
| Base items | `permissionConfigs.<permission>.baseItems.<index>` |
| Persona extra items | `items.<persona>.<permission>.extraItems.<index>` |
| Sources | `insightKey` / `adResultKey` on each source (`sources.<persona>.…`) |
| Persona scenario descriptions | `description` / `descriptionDe` in `personaConfigs.js`, looked up with `getPersonaDescription()` |

When a persona replaces a scenario description, the builder drops the generic `descriptionKey` so the generic translation can't override the persona text.

## Common changes

**Change persona text:** edit the persona in `utils/personaConfigs.js` (update both `description` and `descriptionDe`) and, for items and sources, the matching keys in both JSON files.

**Add a persona:** add it to `utils/personas.js` (selector card) and to `PERSONA_CONFIGS` with the same shape as `max`, then add its `items.*` and `sources.*` keys to both translation files.

**Add a permission:**
1. Add its config to `PERMISSION_CONFIGS` and translations under `permissionConfigs.<id>`
2. Add a `build<Name>Section` in `permissionBuilder.js` and call it from `generateProfile`
3. Add the toggle to the `PERMISSIONS` list in `components/PermissionTracker.js` and `permissions.<id>` translations
4. Optionally add persona data to `PERSONA_CONFIGS`

## Tests

Tests live in `app/src/__tests__/` (Jest + Testing Library):

- `utils/`: builders, configs and profile generation
- `components/`: each component; `fixtures/renderWithLanguage.js` wraps renders in `LanguageProvider`
- `context/`, `integration/`: language switching and the full `PermissionTracker` flow
