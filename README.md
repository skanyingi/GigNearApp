# GigNear 🇰🇪

A Kenyan gig economy mobile app connecting job seekers with employers for local manual labor and service jobs.

## Features

- **Dual Role System** - Choose between Job Seeker or Employer mode
- **Bilingual UI** - English and Kiswahili support
- **Offline-First** - Works without internet using cached data
- **Job Discovery** - Browse local gigs in categories (Manual Labor, Cleaning, Delivery, Security, Gardening, Cooking)
- **Easy Application** - One-tap apply to jobs
- **Employer Dashboard** - Post jobs and manage applicants
- **M-Pesa Ready** - Payment integration for job boosting (coming soon)

## App Screens

| Screen | Description |
|--------|------------|
| Language Selection | Choose English or Kiswahili |
| Onboarding | 3-slide intro explaining app features |
| Auth | Login with role selection (Worker/Employer) |
| Jobs Feed | Browse and filter local job listings |
| Search | Search jobs by category |
| Job Detail | View job info, location map, requirements |
| Apply | Submit application to employer |
| Post Job | Employers create new job listings |
| Chats | Message employers/applicants |
| Profile | View and edit user profile |
| Settings | Switch roles, language, preferences |

## Tech Stack

- **Framework**: Expo (React Native)
- **Navigation**: Expo Router (file-based routing)
- **Icons**: Ionicons
- **Maps**: OpenStreetMap via WebView

## Installation

```bash
npm install
npx expo start
```

## Build APK

```bash
npx expo prebuild --platform android
eas build --platform android --profile preview
```

## Project Structure

```
app/
├── index.tsx          # Language selection
├── onboarding.tsx     # Intro carousel
├── auth.tsx           # Login/signup
├── (tabs)/            # Job seeker tabs
│   ├── index.tsx      # Jobs feed
│   ├── search.tsx     # Search
│   ├── chats.tsx      # Conversations
│   └── profile.tsx    # User profile
├── (employer)/        # Employer tabs
├── job-detail.tsx      # Job info
├── apply.tsx          # Application form
├── post-job.tsx       # Create job
├── settings.tsx       # App settings
└── components/        # Reusable components
```

## License

Private - All rights reserved
