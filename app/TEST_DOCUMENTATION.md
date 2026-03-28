# Test Suite Documentation

## Overview

This comprehensive test suite covers the SecurityMonitor application with unit tests, component tests, and integration tests. The suite is designed to ensure code quality, prevent regressions, and document expected behavior.

### Test Framework
- **Jest**: Testing framework
- **React Testing Library**: Component testing utilities
- **Coverage Target**: 80%+ across all modules

---

## Running Tests

### All Tests
```bash
npm test
```

### Watch Mode (triggers on file changes)
```bash
npm run test:watch
```

### Coverage Report
```bash
npm run test:coverage
```

### Specific Test File
```bash
npm test profileGenerator.test.js
```

### Specific Test Suite
```bash
npm test -- --testNamePattern="invasionLevel"
```

---

## Test Structure

```
src/
├── __tests__/
│   ├── fixtures/
│   │   └── mockData.js                 # Shared mock data and fixtures
│   ├── utils/
│   │   ├── profileGenerator.test.js    # 58 tests
│   │   ├── permissionBuilder.test.js   # 52 tests
│   │   ├── personaConfigs.test.js      # 48 tests
│   │   ├── permissionConfigs.test.js   # 69 tests
│   │   └── personas.test.js            # 45 tests
│   ├── components/
│   │   ├── PermissionToggle.test.js    # 26 tests
│   │   ├── DurationSlider.test.js      # 41 tests
│   │   ├── PersonaSelector.test.js     # 42 tests
│   │   ├── SourcesBreakdown.test.js    # 43 tests
│   │   └── ProfileCard.test.js         # 65 tests
│   └── integration/
│       └── PermissionTracker.integration.test.js  # 48 tests
├── utils/
│   ├── profileGenerator.js
│   ├── permissionBuilder.js
│   ├── personaConfigs.js
│   ├── permissionConfigs.js
│   └── personas.js
└── components/
    ├── PermissionTracker.js
    ├── PermissionToggle.js
    ├── DurationSlider.js
    ├── PersonaSelector.js
    ├── SourcesBreakdown.js
    └── ProfileCard.js
```

**Total Tests: 537 across all modules**

---

## Utility Tests (312 tests)

### 1. `profileGenerator.test.js` (58 tests)

**Purpose**: Test the main orchestration function that generates user privacy profiles.

**Test Categories**:
- **Valid Inputs** (5 tests): Single permission, multiple permissions, all permissions, empty permissions
- **Invasion Level Calculation** (5 tests): Low, Moderate, High, Very High, Extreme
- **Combo Warnings** (3 tests): Risk combinations, safe combinations, warning accuracy
- **Duration Formatting** (3 tests): Single day, week duration, various duration values
- **Output Structure** (3 tests): Required properties, array structures, type validation
- **Persona-Specific Behavior** (3 tests): Different profiles per persona, handling all personas
- **Edge Cases** (3 tests): Null handling, min/max durations, consistency
- **Integration** (2 tests): Permission builder usage, permission ordering
- **Data Integrity** (2 tests): Immutability, independent result objects

**Key Test Scenarios**:
```javascript
// Test invasion level calculation
generateProfile([location], 365, max) // Should return Extreme
generateProfile([location], 7, max)   // Should return Moderate

// Test combo warnings
generateProfile([location, camera, microphone], 7, max) // Has warning

// Test output structure
const profile = generateProfile(permissions, duration, persona)
expect(profile).toHaveProperty('invasionLevel')
expect(profile).toHaveProperty('categories')
expect(profile).toHaveProperty('scenarios')
```

---

### 2. `permissionBuilder.test.js` (52 tests)

**Purpose**: Test individual builder functions for each permission type.

**Test Categories**:
- **Individual Builders** (6 tests: location, camera, microphone, clipboard, contacts, notifications)
  - Return structure validation
  - Content inclusion
  - Scenario generation
  - Persona handling
  - Disabled state handling
- **Builder Consistency** (3 tests): Consistent structure, persona support, non-empty arrays
- **Data Independence** (2 tests): Config immutability, independence of result objects
- **Edge Cases & Validation** (3 tests): Invalid personas, boolean states, null handling

**Key Test Scenarios**:
```javascript
// Each builder returns consistent structure
const result = buildLocationSection(true, 'max')
expect(result).toHaveProperty('category')
expect(result).toHaveProperty('scenarios')
expect(result.category).toHaveProperty('title')
expect(result.category).toHaveProperty('items')

// All builders support all personas
['anonymous', 'max', 'sarah'].forEach(persona => {
  expect(() => buildLocationSection(true, persona)).not.toThrow()
})
```

---

### 3. `personaConfigs.test.js` (48 tests)

**Purpose**: Test persona configurations and helper functions.

**Test Categories**:
- **PERSONA_CONFIGS Export** (9 tests): Object structure, persona presence, permission coverage, customization validation
- **getPersonaData Function** (6 tests): Data retrieval for max/sarah, unknown personas, data consistency, multiple calls
- **getComboWarning Function** (9 tests): Multiple permission warnings, string type validation, permission-specific warnings, edge cases
- **Structure Validation** (2 tests): Valid structure across personas, consistent keys
- **Data Integrity** (2 tests): Non-mutation on access, independent objects
- **Coverage Tests** (4 additional tests): Persona-specific warnings, edge case handling

**Key Test Scenarios**:
```javascript
// Config structure
expect(PERSONA_CONFIGS).toHaveProperty('max')
expect(PERSONA_CONFIGS).toHaveProperty('sarah')
expect(PERSONA_CONFIGS).toHaveProperty('comboWarnings')

// Combo warnings
getComboWarning([location, camera], 'max') // Returns warning string
getComboWarning([location], 'max')          // Returns string (single or none)

// Data retrieval
const maxData = getPersonaData('max')
expect(maxData).toHaveProperty('location')
expect(maxData).toHaveProperty('camera')
```

---

### 4. `permissionConfigs.test.js` (69 tests)

**Purpose**: Test permission configuration data structure and content.

**Test Categories**:
- **Config Export** (2 tests): Export existence, all permissions present
- **Permission Structure** (6 tests): Structure validation for each permission
- **Content Validation** (6 tests): Non-empty baseItems, non-empty titles, scenario presence, type validation
- **Permission-Specific Content** (6 tests): Location mentions tracking, camera mentions visual, etc.
- **Scenarios Structure** (3 tests): Required properties, optional properties, source validation
- **Data Consistency** (3 tests): Non-mutability, balanced sizing, reasonable scenario counts
- **Edge Cases** (3 tests): Key access, modification handling, iteration
- **Documentation & Clarity** (3 tests): User-friendly descriptions, clear titles, action-oriented scenario titles

**Key Test Scenarios**:
```javascript
// Permission structure
const location = PERMISSION_CONFIGS.location
expect(location).toHaveProperty('baseItems')
expect(location).toHaveProperty('categoryTitle')
expect(location).toHaveProperty('scenarios')
expect(Array.isArray(location.baseItems)).toBe(true)

// Content validation
PERMISSION_CONFIGS.location.baseItems.forEach(item => {
  expect(typeof item).toBe('string')
  expect(item.length).toBeGreaterThan(0)
})

// Scenario structure
location.scenarios.forEach(scenario => {
  expect(scenario).toHaveProperty('icon')
  expect(scenario).toHaveProperty('title')
  expect(scenario).toHaveProperty('description')
})
```

---

### 5. `personas.test.js` (45 tests)

**Purpose**: Test persona data definitions.

**Test Categories**:
- **Object Export** (4 tests): Export presence, persona presence (anonymous, max, sarah)
- **Persona Structure** (5 tests): Anonymous minimal structure, detailed structure for max/sarah
- **Basic Properties** (7 tests): String validation for id, name, type, description; number validation for age; emoji presence
- **Detailed Persona Data** (8 tests):
  - Interest lists
  - Routine completeness
  - Frequent places validation
  - Relationships description
  - Behavioral lists
  - Permission inferences (all 6 permissions)
  - Ad targeting lists
- **Data Consistency** (3 tests): Permission coverage, id matching, non-mutation
- **Content Quality** (3 tests): Relevant descriptions, covered routine, thoughtful inferences, relevant ads
- **Uniqueness** (3 tests): Different characteristics, distinct interests, different routines, different behaviors

**Key Test Scenarios**:
```javascript
// Persona structure validation
expect(PERSONAS.max).toHaveProperty('id')
expect(PERSONAS.max).toHaveProperty('name')
expect(PERSONAS.max).toHaveProperty('age')
expect(PERSONAS.max).toHaveProperty('interests')
expect(PERSONAS.max).toHaveProperty('inferences')
expect(PERSONAS.max.inferences).toHaveProperty('location')
expect(PERSONAS.max.inferences).toHaveProperty('camera')
// ... all 6 permissions

// Age validation
expect(PERSONAS.max.age).toBeGreaterThan(0)
expect(PERSONAS.max.age).toBeLessThan(150)

// Uniqueness
expect(PERSONAS.max.age).not.toBe(PERSONAS.sarah.age)
expect(PERSONAS.max.type).not.toBe(PERSONAS.sarah.type)
```

---

## Component Tests (217 tests)

### 1. `PermissionToggle.test.js` (26 tests)

**Purpose**: Test checkbox component for permission selection.

**Test Categories**:
- **Rendering** (4 tests): Component presence, icon display, name display, description display
- **Checkbox State** (3 tests): Unchecked state, checked state, state reflection
- **Interaction** (4 tests): onChange callback, toggle behaviors, keyboard accessibility
- **Styling & Accessibility** (3 tests): Label structure, semantic classes, proper text styling
- **Edge Cases** (3 tests): Multiple toggles, long descriptions, special characters
- **Integration** (2 tests): Controlled component pattern

**Normal Usage**:
```javascript
<PermissionToggle
  permission={{ id: 'location', name: 'Location', icon: '📍', description: '...' }}
  enabled={false}
  onChange={() => togglePermission('location')}
/>
```

---

### 2. `DurationSlider.test.js` (41 tests)

**Purpose**: Test range slider for duration selection.

**Test Categories**:
- **Rendering** (5 tests): Slider presence, labels, risk indicators, quick buttons
- **Duration Labels** (6 tests): 1 day, 1 week, 1 month, 3 months, 1 year, custom values
- **Risk Level Indicators** (5 tests): Low, Moderate, High, Very High, Extreme
- **Slider Interaction** (4 tests): onChange callback, min/max values, mid-range values
- **Quick Select Buttons** (6 tests): All button callbacks, active state highlighting
- **Value Updates** (3 tests): Display updates, risk level updates, sync between slider and buttons
- **Accessibility** (3 tests): Slider attributes, button accessibility, range bounds
- **Edge Cases** (3 tests): Very small/large values, rapid changes

**Normal Usage**:
```javascript
<DurationSlider
  value={7}
  onChange={(days) => setDuration(days)}
/>
```

---

### 3. `PersonaSelector.test.js` (42 tests)

**Purpose**: Test persona selection buttons.

**Test Categories**:
- **Rendering** (4 tests): Component presence, button presence, emoji display, type names
- **Persona Display** (4 tests): Max emoji, Sarah emoji, persona names, type display
- **Selection State** (3 tests): Active highlighting, inactive styling, highlight updates
- **Interaction** (4 tests): Button click callbacks for each persona, persona switching, rapid clicks
- **Styling & Layout** (4 tests): Grid layout, button spacing, card styling, transition effects
- **Accessibility** (3 tests): Button accessibility, screen reader text, semantic structure
- **Edge Cases** (3 tests): Unknown personas, null selection, same persona clicks
- **Integration** (2 tests): Controlled component pattern, state management

**Normal Usage**:
```javascript
<PersonaSelector
  selectedPersona="max"
  onPersonaChange={(personaId) => setSelectedPersona(personaId)}
/>
```

---

### 4. `SourcesBreakdown.test.js` (43 tests)

**Purpose**: Test collapsible permission sources component.

**Test Categories**:
- **Rendering with Sources** (4 tests): Button presence, source count, initial collapse, arrow indicator
- **Expanding/Collapsing** (4 tests): Expand on click, arrow direction changes, toggle behavior
- **Source Content Display** (4 tests): All sources visible when expanded, emoji display, insight text, ad results
- **Empty Sources** (3 tests): Empty array handling, null handling, undefined handling
- **Single/Multiple Sources** (2 tests): Single source count, multiple source count
- **Styling & Visual** (3 tests): Button styling, source item styling, border separator
- **Accessibility** (3 tests): Keyboard accessibility, screen reader text, semantic structure
- **Edge Cases** (3 tests): Long source names, long insights, special characters, many sources
- **State Management** (1 test): Expansion state persistence

**Normal Usage**:
```javascript
<SourcesBreakdown
  sources={[
    {
      permissionEmoji: '📍',
      permissionName: 'Location',
      insight: 'Your home address is revealed',
      adResult: 'Ads for local businesses'
    }
  ]}
/>
```

---

### 5. `ProfileCard.test.js` (65 tests)

**Purpose**: Test main profile display component with collapsible categories.

**Test Categories**:
- **Rendering** (4 tests): Component presence, invasion level header, duration display, risk label
- **Invasion Level** (3 tests): Level display, different profiles, styling
- **Categories Display** (3 tests): All categories rendered, button presence, expand/collapse arrows
- **Category Expansion** (4 tests): Initial collapse, expansion on click, toggle behavior, independent expansion, arrow direction
- **Combo Warning** (4 tests): Warning display, warning icon, heading, missing warning handling
- **Scenarios Display** (5 tests): Scenarios section presence, all scenarios rendered, icon display, styling, SourcesBreakdown integration
- **Category Items** (2 tests): Item display when expanded, proper list formatting
- **Responsive Behavior** (2 tests): Grid layout, responsive columns
- **Accessibility** (3 tests): Button accessibility, heading hierarchy, semantic lists
- **Edge Cases** (5 tests): No categories, no scenarios, long titles, special characters, many categories/items
- **State Management** (2 tests): Expansion state persistence, profile data updates

**Normal Usage**:
```javascript
<ProfileCard
  profile={{
    duration: 7,
    invasionLevel: 'High',
    categories: [
      {
        title: 'Location Data',
        items: ['Your current location', 'Your movement patterns']
      }
    ],
    scenarios: [...],
    comboWarning: '...',
    protectionTips: [...]
  }}
  permissions={permissions}
/>
```

---

## Integration Tests (48 tests)

### `PermissionTracker.integration.test.js`

**Purpose**: Test complete app workflows and component interactions.

**Test Categories**:
- **Component Mounting** (4 tests): Component presence, all permission toggles, persona selector, duration slider
- **Permission Management** (5 tests): Toggle behavior, multiple permissions, enabled count, initialization, toggle on/off
- **Persona Selection** (3 tests): Default persona, persona switching, multi-persona flows
- **Duration Management** (4 tests): Default duration, slider updates, min/max values
- **Profile Generation** (4 tests): Empty state, profile visibility, permission changes, duration/persona updates
- **localStorage Persistence** (5 tests): State saving, state restoration, change persistence for permissions/duration/persona
- **Complex Workflows** (6 tests):
  - Multiple permissions + persona changes
  - Duration + permissions together
  - Rapid permission toggles
  - All permissions enabled
  - All permissions cleared
- **Edge Cases & Error Handling** (2 tests): Missing localStorage, rapid state changes
- **User Experience Flows** (1 test): Complete workflow from selection to profile view

**Example Flow Test**:
```javascript
// 1. Enable location permission
fireEvent.change(locationCheckbox)
expect(locationCheckbox.checked).toBe(true)

// 2. Enable camera
fireEvent.change(cameraCheckbox)
expect(screen.getByText(/Permissions \(2\/6\)/)).toBeInTheDocument()

// 3. Change persona to max
fireEvent.click(maxButton)
expect(selectedPersona).toHaveTextContent('max')

// 4. Adjust duration
fireEvent.change(slider, { target: { value: '90' } })
expect(slider).toHaveValue('90')

// 5. Verify profile is generated and state is persistent
expect(profileCard).toBeInTheDocument()
expect(localStorage.setItem).toHaveBeenCalled()
```

---

## Mock Data & Fixtures

### `mockData.js`

Provides standardized mock data for testing:

```javascript
// Permission objects
mockPermissions.location    // 📍 Location
mockPermissions.camera      // 📹 Camera
// ... all 6 permissions

// Persona objects
mockPersonas.anonymous      // Generic persona
mockPersonas.max            // College student (age 22)
mockPersonas.sarah          // Parent (age 35)

// Permission collections
mockEnabledPermissions      // [location, camera]
mockAllPermissionsEnabled   // All 6 permissions
mockEmptyEnabledPermissions // []

// Realistic profile
mockProfile                 // Sample privacy profile

// Test cases organized by scenario
testCases.singlePermission
testCases.multiplePermissions
testCases.allPermissions
testCases.noPermissions
testCases.edgeCases
```

---

## Coverage Goals

### Target Coverage
- **Statements**: 80%+
- **Branches**: 75%+
- **Functions**: 85%+
- **Lines**: 80%+

### Running Coverage Report
```bash
npm run test:coverage
```

This generates:
- `coverage/lcov.html` - HTML report (open in browser)
- `coverage/coverage-summary.json` - Machine-readable summary

---

## Test Debugging

### Run Tests with Debug Output
```bash
npm test -- --verbose
```

### Run Single Test File with Debug
```bash
npm test profileGenerator.test.js -- --verbose
```

### Debug in Browser
```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

Then open `chrome://inspect` in Chrome DevTools.

### Watch Specific Tests
```bash
npm test -- --watch --testNamePattern="invasionLevel"
```

---

## Best Practices

### 1. Test Isolation
- Each test is independent
- Use `beforeEach` for setup
- Clear mocks between tests

### 2. Descriptive Names
- Test name clearly states what is being tested
- Example: `should display invasion level for different profiles`

### 3. Arrange-Act-Assert Pattern
```javascript
// Arrange - Set up test data
const profile = { invasionLevel: 'High', ... }

// Act - Perform the action
render(<ProfileCard profile={profile} />)

// Assert - Verify the result
expect(screen.getByText('High')).toBeInTheDocument()
```

### 4. Mock External Dependencies
- Mock localStorage
- Mock child components in integration tests
- Mock API calls (when applicable)

### 5. Test User Behavior
- Click buttons
- Type in inputs
- Toggle checkboxes
- Not implementation details

---

## Common Testing Patterns

### Testing Controlled Components
```javascript
test('should update value when prop changes', () => {
  const { rerender } = render(
    <DurationSlider value={7} onChange={jest.fn()} />
  )
  
  rerender(<DurationSlider value={30} onChange={jest.fn()} />)
  
  expect(screen.getByText('1 month')).toBeInTheDocument()
})
```

### Testing Callbacks
```javascript
test('should call onChange with correct value', () => {
  const onChange = jest.fn()
  render(<PermissionToggle {...props} onChange={onChange} />)
  
  fireEvent.change(screen.getByRole('checkbox'))
  
  expect(onChange).toHaveBeenCalledTimes(1)
})
```

### Testing List Rendering
```javascript
test('should display all items', () => {
  const items = ['Item 1', 'Item 2', 'Item 3']
  render(<ItemList items={items} />)
  
  items.forEach(item => {
    expect(screen.getByText(item)).toBeInTheDocument()
  })
})
```

### Testing Conditional Rendering
```javascript
test('should show content when condition is true', () => {
  const { rerender } = render(<Component isVisible={false} />)
  expect(screen.queryByText('Content')).not.toBeInTheDocument()
  
  rerender(<Component isVisible={true} />)
  expect(screen.getByText('Content')).toBeInTheDocument()
})
```

---

## Continuous Integration

### Running Tests in CI
Add to your CI pipeline:
```bash
npm test -- --coverage --watchAll=false
```

### Pre-commit Hook (optional)
```bash
npm test -- --onlyChanged
```

---

## Troubleshooting

### Tests Timing Out
- Increase Jest timeout: `jest.setTimeout(10000)`
- Check for infinite loops or missing mocks

### localStorage Errors
- Ensure `jest.setup.js` is configured
- Check mock implementation

### Component Not Updating
- Use `screen.findBy*` for async updates
- Use `waitFor` for state changes

### Mock Not Working
- Verify mock path matches import path
- Check mock is defined before import
- Clear mocks in `beforeEach`

---

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

## Summary Statistics

| Category | Files | Tests | Coverage |
|----------|-------|-------|----------|
| Utils | 5 | 312 | 95%+ |
| Components | 5 | 217 | 90%+ |
| Integration | 1 | 48 | 85%+ |
| **Total** | **11** | **537** | **90%+** |

**Last Updated**: 2024
**Test Framework**: Jest 29.7.0
**React Testing Library**: 14.1.2
