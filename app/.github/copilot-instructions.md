## Privacy Tracker - Next.js Setup

- [x] Verify that the copilot-instructions.md file in the .github directory is created.
- [x] Clarify Project Requirements - Interactive privacy awareness web app built with Next.js
- [x] Scaffold the Project - Project structure created with Next.js 14, React 18, Tailwind CSS
- [x] Customize the Project - Implemented PermissionTracker component with toggles, sliders, and profile generation
- [x] Install Required Extensions - No additional VS Code extensions required
- [x] Compile the Project
- [ ] Create and Run Task
- [ ] Launch the Project - Ready to run with `npm install && npm run dev`
- [ ] Ensure Documentation is Complete

## To Get Started

1. Open terminal in the project directory
2. Run: `npm install`
3. Run: `npm run dev`
4. Open http://localhost:3000 in your browser

## Project Details

- **Type**: Next.js web application
- **Framework**: React 18 with App Router
- **Styling**: Tailwind CSS
- **State Management**: React hooks + LocalStorage
- **Purpose**: Educational tool to visualize data collection implications

## Key Components

- `PermissionTracker.js` - Main component managing permission toggles
- `DurationSlider.js` - Interactive slider for tracking duration (1 day to 1 year)
- `ProfileCard.js` - Displays generated data profile and risk assessment
- `profileGenerator.js` - Core logic generating privacy implications
