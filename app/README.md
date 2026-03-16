# Privacy Tracker

An interactive web app to visualize what websites and apps can know about you based on permissions and tracking duration.

## Project Overview

Privacy Tracker is an educational tool that helps users understand the implications of granting permissions to websites and applications. Users can:

- Toggle different types of permissions (Location, Camera, Microphone, Clipboard, Contacts, Notifications)
- Adjust the tracking duration from 1 day to 1 year
- See real-time visualization of what a website could infer about them
- Understand privacy risks and get protection tips

## Features

- **Interactive Permission Controls**: Toggle permissions on/off to see immediate changes
- **Duration Slider**: Experiment with different time periods to understand how data accumulates
- **Real-time Profile Generation**: Dynamic display of what can be inferred from enabled permissions
- **Risk Assessment**: Invasion level indicator showing privacy risk
- **Permission Combinations**: Warnings when dangerous permission combinations are enabled
- **Protection Recommendations**: Actionable privacy protection tips

## Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Language**: JavaScript
- **Storage**: LocalStorage for state persistence

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
/src
  /app
    - layout.js       # Root layout
    - page.js         # Home page
    - globals.css     # Global styles
  /components
    - PermissionTracker.js    # Main tracker component
    - PermissionToggle.js     # Individual permission toggle
    - DurationSlider.js       # Tracking duration slider
    - ProfileCard.js          # Data profile display
  /utils
    - profileGenerator.js     # Core logic for generating profiles
```

## How It Works

1. User toggles permissions on/off
2. User adjusts the duration slider to simulate tracking over different time periods
3. Profile generator analyzes enabled permissions and duration
4. Real-time display shows:
   - What data can be collected
   - Inferences about the user
   - Possible misuse scenarios
   - Risk level assessment
   - Protection recommendations

## Building

To build for production:

```bash
npm run build
npm start
```

## Future Enhancements

- Compare multiple permission scenarios
- Share profiles via URL
- Export privacy reports
- Real app permission analysis
- Multi-language support
- Mobile app version

## Purpose

This project aims to educate users about digital privacy and the hidden implications of permission requests. It's designed to be eye-opening and help people make more informed decisions about what permissions to grant.