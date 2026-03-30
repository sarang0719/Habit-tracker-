# TimeFlow - AI Habit Tracker

TimeFlow is a next-generation AI-powered habit tracker designed with an immersive, glassmorphism UI. It features local AI analysis, a digital twin simulation ("AI Shadow"), and advanced habit tracking capabilities.

## Features

### 🚀 Core Habit Tracking
- **Habit Management**: Create, edit, and delete habits with custom icons, frequency, and difficulty.
- **Visual Streaks**: Track your consistency with heatmaps and streak counters.
- **Gamification**: Earn experience levels (Novice, Pro, Elite) based on your consistency.

### 🤖 AI Coach (Local Intelligence)
- **Private AI**: Runs entirely in your browser using local logic. No data is sent to external servers.
- **Contextual Chat**: Ask the coach for motivation or analysis of your specific habits.
- **Smart Recommendations**: Get tailored advice based on your difficulty settings and streak history.

### 👥 AI Shadow (Digital Twin)
- **Trajectory Simulation**: View a 14-day future prediction of your habits based on current momentum.
- **Trend Analysis**: See projected consistency scores and identify "At-Risk" habits before you break them.
- **Future Messages**: Receive emotional, motivational "transmissions" from your future self based on your predicted path.

### 📱 AI SMS Reminder (Simulation Mode)
- **Personalized Nudges**: The system generates SMS content based on real-time habit risks and behavior patterns.
- **Smart Logic**: Detects if you are likely to skip a habit (based on AI Shadow data) and generates a "Tough Love" or "Encouraging" message accordingly.
- **Simulation**: In this demo environment, SMS delivery is simulated via **Device Notifications**.
- **Production Ready**: The architecture is designed to support SMS gateway integration (e.g., Twilio) in production environments.

## Tech Stack
- **Frontend**: React + Vite
- **Styling**: Vanilla CSS (Glassmorphism design system) + Lucide React Icons
- **Data**: LocalStorage (Persistence) + Context API (State Management)
- **Visualization**: Chart.js

## Getting Started

1. `npm install`
2. `npm run dev`
