# Fresco 2k25 Invitation

Single-page invitation and event site built with React + Vite. Includes animated hero/intro, venue details, live chat, photo gallery/upload, and an admin support panel backed by Supabase.

## Features
- Animated landing flow with intro and hero sections
- Venue and event details
- Live chat and support messages (Supabase realtime)
- Live photo gallery and uploads (Supabase storage)
- Admin panel for replying to support messages

## Tech Stack
- React 18 + TypeScript
- Vite
- Framer Motion
- Supabase (Database + Realtime + Storage)

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables (see below).
3. Start the dev server:
   ```bash
   npm run dev
   ```

## Environment Variables
Create a `.env.local` file in the project root:
```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Scripts
- `npm run dev` - start dev server
- `npm run build` - production build
- `npm run preview` - preview production build
- `npm run predeploy` - build before deploy
- `npm run deploy` - deploy to GitHub Pages

## Deployment
This project is configured for GitHub Pages via `gh-pages`. Ensure `homepage` in `package.json` is set to your repository URL, then run:
```bash
npm run deploy
```

## Project Structure
```
components/   UI sections and widgets
hooks/        Custom hooks
lib/          Clients and helpers (Supabase)
pages/api/    API handlers for uploads (Vite/Node context)
public/       Static assets
```

## Notes
- The admin panel has hardcoded credentials in the client code. Update these in `components/AdminPanel.tsx` before shipping.
- Supabase tables and storage buckets must match the names used in the components (e.g., `support_messages`, `event-photos`).
