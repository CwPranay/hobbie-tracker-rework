# HobbyTrack Frontend

A modern, production-quality React frontend for tracking hobbies, building streaks, and connecting with other users.

## Features

- **Authentication**: Secure login/register with JWT
- **Dashboard**: Manage hobbies with streaks and levels
- **Sessions**: Track practice time and build streaks
- **Activity Feed**: See what users you follow are practicing
- **Profile**: View your profile and other users' public hobbies
- **Dark Mode**: Toggle between light and dark themes
- **Responsive**: Mobile-first design with bottom navigation

## Tech Stack

- React 19 + Vite
- React Router v7
- Tailwind CSS v4
- Axios
- Context API

## Getting Started

### Prerequisites

- Node.js 16+
- Backend server running on `http://localhost:5000`

### Installation

```bash
cd client
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
client/
├── src/
│   ├── api/
│   │   └── axios.js           # Axios instance with interceptors
│   ├── components/
│   │   ├── HobbyCard.jsx      # Hobby display card
│   │   ├── HobbyModal.jsx     # Add/Edit hobby modal
│   │   ├── Layout.jsx         # Main layout with nav
│   │   ├── ProtectedRoute.jsx # Route protection
│   │   └── SessionModal.jsx   # Add session modal
│   ├── context/
│   │   ├── AuthContext.jsx    # Authentication state
│   │   └── ThemeContext.jsx   # Theme management
│   ├── pages/
│   │   ├── Dashboard.jsx      # Hobbies overview
│   │   ├── Feed.jsx           # Activity feed
│   │   ├── Login.jsx          # Login page
│   │   ├── Profile.jsx        # User profile
│   │   ├── Register.jsx       # Registration page
│   │   └── Sessions.jsx       # Practice sessions
│   ├── App.jsx                # Main app component
│   ├── index.css              # Global styles
│   └── main.jsx               # Entry point
├── index.html
├── package.json
├── tailwind.config.cjs
└── vite.config.js
```

## API Integration

The frontend connects to the backend API at `http://localhost:5000/api`:

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /hobbies` - Get user's hobbies
- `POST /hobbies` - Create hobby
- `PUT /hobbies/:id` - Update hobby
- `DELETE /hobbies/:id` - Delete hobby
- `GET /sessions/:hobbyId` - Get sessions for hobby
- `POST /sessions/:hobbyId` - Add session
- `GET /feed` - Get activity feed
- `GET /users/profile/:id` - Get user profile
- `POST /users/follow/:id` - Follow user
- `POST /users/unfollow/:id` - Unfollow user

## Features Overview

### Authentication
- JWT token stored in localStorage
- Auto-attach token to requests
- Redirect on 401 errors
- Protected routes

### Dashboard
- Grid layout of hobby cards
- Show streaks, levels, privacy
- Add/Edit/Delete hobbies
- Quick navigation to sessions

### Sessions
- Add practice sessions with date, duration, notes
- View session history
- Automatic streak calculation
- Filter by hobby

### Activity Feed
- Timeline of followed users' sessions
- Real-time updates
- Clean, readable layout

### Profile
- View own or other users' profiles
- Follow/Unfollow functionality
- Public hobbies display
- Follower/Following counts

### Theme System
- Light/Dark mode toggle
- Saved in localStorage
- Smooth transitions
- Consistent colors

## Design Principles

- **Clean & Modern**: Professional SaaS-style UI
- **Minimal**: No unnecessary animations or effects
- **Responsive**: Mobile-first with adaptive layouts
- **Accessible**: Proper contrast, focus states, ARIA labels
- **Fast**: Optimized loading and transitions

## Environment Variables

Create a `.env` file if you need to change the API URL:

```env
VITE_API_URL=http://localhost:5000/api
```

Then update `src/api/axios.js` to use `import.meta.env.VITE_API_URL`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
