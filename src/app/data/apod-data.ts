export interface APODData {
  date: string;
  title: string;
  explanation: string;
  url: string;
  media_type: "image" | "video";
  copyright?: string;
  hdurl?: string;
}

export const mockAPODData: APODData[] = [
  {
    date: "2026-02-15",
    title: "The Pillars of Creation",
    explanation:
      "These towering pillars of cool gas and dust are part of the Eagle Nebula, located about 6,500 light-years away in the constellation Serpens. The pillars are actually columns of interstellar hydrogen gas and dust that are being eroded by the ultraviolet light from nearby hot stars. New stars are being born within the dense clouds of gas and dust.",
    url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200&q=80",
    hdurl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=2400&q=80",
    media_type: "image",
    copyright: "NASA/ESA/Hubble Heritage Team",
  },
  {
    date: "2026-02-14",
    title: "NGC 6302: The Butterfly Nebula",
    explanation:
      "The bright clusters and nebulae of planet Earth's night sky are often named for flowers or insects. Though its wingspan covers over 3 light-years, NGC 6302 is no exception. With an estimated surface temperature of about 250,000 degrees C, the dying central star of this planetary nebula has become exceptionally hot, shining brightly in ultraviolet light but hidden from direct view by a dense torus of dust.",
    url: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200&q=80",
    hdurl: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=2400&q=80",
    media_type: "image",
    copyright: "NASA/ESA/Hubble",
  },
  {
    date: "2026-02-13",
    title: "The Horsehead Nebula",
    explanation:
      "One of the most identifiable nebulae in the sky, the Horsehead Nebula in Orion, is part of a large, dark, molecular cloud. Also known as Barnard 33, the unusual shape was first discovered on a photographic plate in the late 1800s. The red glow originates from hydrogen gas predominantly behind the nebula, ionized by the nearby bright star Sigma Orionis.",
    url: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=1200&q=80",
    hdurl: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=2400&q=80",
    media_type: "image",
    copyright: "T.A. Rector/University of Alaska Anchorage",
  },
  {
    date: "2026-02-12",
    title: "Spiral Galaxy NGC 1232",
    explanation:
      "Galaxies are fascinating not only for what is visible, but for what is invisible. Grand spiral galaxy NGC 1232, captured in detail by one of the Very Large Telescopes, is a good example. The visible spiral arms are traced by bright young stars and the glowing gas clouds where these stars were born.",
    url: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=1200&q=80",
    hdurl: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=2400&q=80",
    media_type: "image",
  },
  {
    date: "2026-02-11",
    title: "The Crab Nebula",
    explanation:
      "This is the expanding remains of a star's supernova explosion. The Crab Nebula is cataloged as M1, the first object on Charles Messier's famous list of things which are not comets. In fact, the Crab is now known to be a supernova remnant, an expanding cloud of debris from the explosion of a massive star.",
    url: "https://images.unsplash.com/photo-1464802686167-b939a6910659?w=1200&q=80",
    hdurl: "https://images.unsplash.com/photo-1464802686167-b939a6910659?w=2400&q=80",
    media_type: "image",
    copyright: "NASA/ESA/J. Hester/A. Loll (ASU)",
  },
  {
    date: "2026-02-10",
    title: "Andromeda Galaxy M31",
    explanation:
      "The Andromeda Galaxy is the nearest major galaxy to our Milky Way. Our Galaxy is thought to look much like Andromeda. Together these two galaxies dominate the Local Group of galaxies. The diffuse light from Andromeda is caused by the hundreds of billions of stars that compose it.",
    url: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=1200&q=80",
    hdurl: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=2400&q=80",
    media_type: "image",
  },
  {
    date: "2026-02-09",
    title: "The Orion Nebula",
    explanation:
      "Few astronomical sights excite the imagination like the nearby stellar nursery known as the Orion Nebula. The Nebula's glowing gas surrounds hot young stars at the edge of an immense interstellar molecular cloud. Many of the filamentary structures visible are actually shock waves - fronts where fast moving material encounters slow moving gas.",
    url: "https://images.unsplash.com/photo-1506443432602-ac2fcd6f54e0?w=1200&q=80",
    hdurl: "https://images.unsplash.com/photo-1506443432602-ac2fcd6f54e0?w=2400&q=80",
    media_type: "image",
    copyright: "NASA/ESA/Hubble",
  },
  {
    date: "2026-02-08",
    title: "Saturn: Jewel of the Solar System",
    explanation:
      "Saturn is the most distant planet easily visible to the unaided eye and is the second-largest planet in our Solar System. Its majestic system of rings is what makes Saturn spectacular. The rings are so bright and so extensive that they are visible in a small telescope.",
    url: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=1200&q=80",
    hdurl: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=2400&q=80",
    media_type: "image",
    copyright: "NASA/JPL-Caltech",
  },
  {
    date: "2026-02-07",
    title: "NGC 2244: Rosette Nebula",
    explanation:
      "In the heart of the Rosette Nebula lies a bright open cluster of stars that lights up the nebula. The stars of NGC 2244 formed from the surrounding gas only a few million years ago. The Rosette Nebula is located about 5,000 light-years away in the constellation of Monoceros.",
    url: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=1200&q=80",
    hdurl: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=2400&q=80",
    media_type: "image",
  },
  {
    date: "2026-02-06",
    title: "The Lagoon Nebula",
    explanation:
      "The large majestic Lagoon Nebula is home for many young stars and hot gas. Spanning 100 light years across while lying only about 5000 light years distant, the Lagoon Nebula is so big and bright that it can be seen without a telescope toward the constellation of Sagittarius.",
    url: "https://images.unsplash.com/photo-1446941611757-91d2c3bd3d45?w=1200&q=80",
    hdurl: "https://images.unsplash.com/photo-1446941611757-91d2c3bd3d45?w=2400&q=80",
    media_type: "image",
    copyright: "NASA/ESA",
  },
  {
    date: "2026-02-05",
    title: "Jupiter and the Great Red Spot",
    explanation:
      "What is that huge spot on Jupiter? It's a hurricane! The Great Red Spot is a giant storm system that has been raging for at least 400 years. The spot is more than twice as wide as Earth and is located in Jupiter's southern hemisphere.",
    url: "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=1200&q=80",
    hdurl: "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=2400&q=80",
    media_type: "image",
    copyright: "NASA/JPL-Caltech/SwRI/MSSS",
  },
  {
    date: "2026-02-04",
    title: "The Helix Nebula",
    explanation:
      "A mere seven hundred light-years from Earth, in the constellation Aquarius, a sun-like star is dying. Its last few thousand years have produced the Helix Nebula, a well studied and nearby example of a Planetary Nebula, typical of this final phase of stellar evolution.",
    url: "https://images.unsplash.com/photo-1608889335941-32ac5f2041b9?w=1200&q=80",
    hdurl: "https://images.unsplash.com/photo-1608889335941-32ac5f2041b9?w=2400&q=80",
    media_type: "image",
    copyright: "NASA/JPL-Caltech",
  },
];

export const getTodayAPOD = (): APODData => mockAPODData[0];

export const getAPODByDate = (date: string): APODData | undefined =>
  mockAPODData.find((item) => item.date === date);

export const getAllAPOD = (): APODData[] => mockAPODData;
