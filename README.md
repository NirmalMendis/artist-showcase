# Artist Showcase

A React-based web application that showcases music artists, albums, and tracks using the Last.fm API. Built with TypeScript, Chakra UI, and React Query for a modern, responsive user experience.

## Features

- Browse and search for artists
- View artist albums and tracks
- Search albums and tracks
- Add favorites to a personal collection
- Responsive design with dark/light mode support
- Fast and efficient API calls with caching

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/NirmalMendis/artist-showcase.git
   cd artist-showcase
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Copy the example environment file:
     ```bash
     cp .env.example .env
     ```
   - The `.env` file should contain your Last.fm API key and API URL (already configured in the example)

## Running the Application

To start the development server:

```bash
npm start
```

The application will open in your browser at [http://localhost:3000](http://localhost:3000).

## Building for Production

To build the application for production:

```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

## Code Quality

- **Linting:** `npm run lint`
- **Fix linting issues:** `npm run lint:fix`
- **Format code:** `npm run format`
- **Check formatting:** `npm run format:check`

## Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Chakra UI** - Component library
- **React Query** - Data fetching and caching
- **Zustand** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Last.fm API** - Music data source

## Project Structure

```
src/
├── components/          # Reusable UI components
├── modules/            # Feature modules (album, search, favourites)
├── services/           # API services and hooks
├── store/              # Zustand stores
├── theme/              # Chakra UI theme configuration
├── types/              # TypeScript type definitions
└── constants/          # Application constants
```
