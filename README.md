# Interswitch Mobile App

React Native (Expo Router) mobile app with authentication and a home dashboard experience.

## What is implemented

- Login screen with username/password validation and password visibility toggle
- Face ID login flow using Expo Local Authentication
- Home dashboard with account cards, quick actions, and a transaction feed
- Skeleton loading states for profile and card data

## Tech highlights

- Expo Router for file-based routing
- React Query for data fetching and caching
- React Hook Form for form state and validation
- Unistyles + custom global styles for consistent theming
- SVG icon system with `react-native-svg`

## Getting started

1. Install dependencies

   ```bash
   npm install
   ```

2. Link native dependencies

```bash
 npm run prebuild
```

3. Start the app (dev client)

   ```bash
   npm run start
   ```

4. Run the app

   ```bash
   press either "a" or "i" to run the app on android or ios respectively
   ```

5. You can either create an account and login, or login with my default account:

username:unekwe,
password:P@ssword1

## Common scripts

- `npm run android` - run on Android device/emulator
- `npm run ios` - run on iOS simulator
- `npm run web` - run in the browser
- `npm run lint` - lint the project

## Project structure (high level)

- `app/` - screens and routes
- `components/` - reusable UI components
- `assets/` - images and SVGs
- `constants/` - utilities and shared constants
- `service/` - API services and types
- `store/` - app state management

## Screenshots and demo

- `assets//demo/register.png` - Register screen
- `assets//screenshots/login.png` - Login screen
- `assets//screenshots/home.png` - Home dashboard
- `assets//demo/profile.png` - Profile screen

## API endpoints and mock data

This app currently uses service modules in `service/` with mocked data responses.
If you add real endpoints, document them here.

## Face ID setup notes (iOS)

- Use a physical device for real Face ID; the simulator uses enrolled face simulation.
- In iOS Simulator, enroll via `Features > Face ID > Enroll` and trigger via
  `Features > Face ID > Matching Face` or `Non-matching Face`.
- Ensure the app has Face ID permission granted in Settings (device) or
  `Settings > Privacy & Security > Face ID` (simulator).
