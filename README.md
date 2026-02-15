# Cosmic Timeline Gallery

A space-themed gallery showcasing NASA's [Astronomy Picture of the Day](https://apod.nasa.gov/) (APOD). Browse stunning cosmic imagery, explore archives, and navigate a visual timeline of space photos—all in a modern, animated interface.

## What It Is

Cosmic Timeline is a Next.js web app that pulls daily astronomy photos from NASA's APOD API and presents them in several views:

- **Home** — Today's featured image as a full-screen hero with title and explanation
- **Archive** — A masonry grid of the last 90 days of images
- **Timeline** — An interactive circular timeline filtered by month/year
- **Detail** — Full view of any single image with share and download options

The design is inspired by space and astronomy: deep backgrounds, subtle star-like accents, glass-style cards, and smooth animations.

## Tech Stack

- **Framework:** Next.js 15, React 19
- **Styling:** Tailwind CSS
- **Animations:** Motion (Framer Motion)
- **Data:** NASA APOD API, fetched client-side with SWR for caching and deduplication
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- A NASA API key (free at [api.nasa.gov](https://api.nasa.gov/))

### Setup

1. Clone the repo and install dependencies:

   ```bash
   npm install
   ```

2. Copy the example env file and add your NASA API key:

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and set:

   ```
   NEXT_PUBLIC_NASA_API_KEY=your_api_key_here
   ```

3. Run the dev server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

### Build & Run

```bash
npm run build
npm start
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_NASA_API_KEY` | Yes | NASA API key from [api.nasa.gov](https://api.nasa.gov/). Rate limit: 1000 req/hour with key. |
| `NEXT_PUBLIC_SITE_URL` | No | Base URL for share links (e.g. `https://yourdomain.com`) |

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home
│   ├── archive/            # Archive grid
│   ├── timeline/           # Circular timeline
│   └── detail/[date]/      # Single image detail
├── components/cosmic/      # UI components
├── hooks/useAPOD.ts        # SWR-based APOD fetching hooks
└── lib/nasa-apod.ts        # NASA API helpers & types
```

## Features

- **Client-side fetching** — Data is fetched in the browser to avoid server timeout issues with NASA's API
- **Caching** — SWR caches today/range data for 1 hour and historical dates for 24 hours
- **Responsive** — Layouts adapt to mobile and desktop
- **Share** — Copy links or share to social from the detail view
- **Download** — Open full-size image in a new tab for saving

## Deploying to Vercel

[Vercel](https://vercel.com) is the recommended way to deploy this Next.js app. It auto-detects the framework and handles builds.

### 1. Push to GitHub

Make sure your project is in a Git repository and pushed to GitHub, GitLab, or Bitbucket:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/cosmic-timeline-next.git
git push -u origin main
```

### 2. Import the Project

1. Go to [vercel.com](https://vercel.com) and sign in (GitHub, GitLab, or Bitbucket)
2. Click **Add New** → **Project**
3. Import your repository
4. Vercel will detect Next.js automatically — no extra configuration needed

### 3. Set Environment Variables

Add your NASA API key so the app can fetch images:

1. In the import flow, expand **Environment Variables**
2. Add a variable:
   - **Name:** `NEXT_PUBLIC_NASA_API_KEY`
   - **Value:** your NASA API key from [api.nasa.gov](https://api.nasa.gov/)
   - **Environment:** Production, Preview, Development (or just Production)

3. Optional — for correct share links in the Detail view:
   - **Name:** `NEXT_PUBLIC_SITE_URL`
   - **Value:** `https://your-project.vercel.app` (or your custom domain)

### 4. Deploy

Click **Deploy**. Vercel will build and deploy your app. You'll get a URL like `https://cosmic-timeline-next-xxx.vercel.app`.

### 5. Custom Domain (Optional)

1. Open your project in the Vercel dashboard
2. Go to **Settings** → **Domains**
3. Add your domain and follow the DNS instructions

---

**Build settings (default):** Vercel uses `npm run build` and `npm run start` by default. No `vercel.json` is required unless you need custom rewrites or headers.

## License

MIT
