/** Specialist makeup & styling rates from the Pearl Bright studio board (Academy page). */
export const pearlBrightSpecialistRates = [
  { label: "Only Simple Makeup", price: 2000 },
  { label: "Simple Makeup + Hair + Saree", price: 3000 },
  { label: "Only Saree Draping", price: 500 },
  { label: "Only Hairstyle", price: 500 },
  { label: "Engagement Makeup", price: 5000 },
  { label: "Baby Shower Makeup", price: 5000 },
  { label: "Bridal Makeup", price: 7000 },
  { label: "HD Makeup", price: 12000 },
  { label: "Airbrush Makeup", price: 6000 },
] as const;

/** Full-time flagship program — details only on `/academy`. */
export const professionalMakeupHairArtistCourse = {
  title: "Professional Makeup & Hair Artist Course",
  fee: 15_000,
  durationLabel: "1 Month",
  schedule: {
    regular: "Monday – Friday",
    flexible: "Weekend classes & evening batches available",
  },
  includes: [
    "Basic to Advanced Makeup",
    "HD Makeup, 3D Makeup & Airbrush Makeup",
    "Western Glossy Makeup & HD Matte Makeup",
    "Waterproof Makeup & Photoshoot Makeup",
    "Different Types of Saree Draping & Box Folding",
    "Portfolio Shoot (4 Looks)",
    "Floral Art Workshop",
    "Nail Art Workshop",
    "Skin Theory & Colour Theory",
    "International Hairstyle & Makeup Products Knowledge",
    "Bridal Hairstyles",
    "Hands-on Practice (products provided)",
    "Student Portfolio Shoot",
  ],
  cta: "Enroll now — limited seats",
} as const;

export const academyLearningTracks = [
  {
    title: "Foundation & Skin Prep",
    points: [
      "Client consultation workflow and skin analysis basics",
      "Hygiene, sanitization, and pro-kit setup standards",
      "Skin prep routines for normal, dry, oily, and combination skin",
    ],
  },
  {
    title: "Professional Makeup Techniques",
    points: [
      "Bridal base, long-wear layering, and face-structure correction",
      "HD, 3D, matte, glossy, and camera-ready blending methods",
      "Day-to-night look conversion for events and reception looks",
    ],
  },
  {
    title: "Hair Styling & Draping",
    points: [
      "Bridal buns, curls, volume sets, and modern textured styles",
      "Accessory placement and veil/dupatta secure fixing",
      "Classic and contemporary saree draping for all occasions",
    ],
  },
  {
    title: "Business & Portfolio Growth",
    points: [
      "Pricing strategy and client package structuring",
      "Portfolio planning with shoot-ready look sequencing",
      "Instagram content direction and lead-conversion basics",
    ],
  },
] as const;

export const academyBestFor = [
  "Beginners who want a structured beauty career roadmap",
  "Salon professionals upgrading to bridal and HD services",
  "Freelancers building a premium makeup artist portfolio",
  "Students preparing to launch independent bookings",
] as const;

export const academyCareerOutcomes = [
  "Independent bridal artist bookings",
  "Salon makeup and hairstyle specialist roles",
  "Occasion and engagement makeup service packages",
  "Portfolio-ready professional presentation for clients",
] as const;

export const academyFaqs = [
  {
    q: "Do I need prior experience to join?",
    a: "No. The curriculum starts from fundamentals and gradually moves to advanced bridal and camera-ready techniques.",
  },
  {
    q: "Are products provided during practical sessions?",
    a: "Yes. Hands-on practice sessions include product support so students can learn correct application without initial kit pressure.",
  },
  {
    q: "Will I get practice on real models?",
    a: "Yes. Guided hands-on sessions include model practice and portfolio-focused looks under trainer supervision.",
  },
  {
    q: "Do you provide certification after completion?",
    a: "Yes. Students receive course completion recognition after successful attendance and practical evaluations.",
  },
] as const;
