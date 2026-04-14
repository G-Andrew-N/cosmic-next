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


### Prerequisites

- Node.js 18+
- A NASA API key (free at [api.nasa.gov](https://api.nasa.gov/))


## License

MIT
