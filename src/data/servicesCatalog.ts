export type ServiceGroup = { title: string; items: string[] };

export type ServiceCategory = {
  id: string;
  title: string;
  /** Short line under the title (e.g. category tagline) */
  tagline?: string;
  /** Highlight price when relevant (e.g. “starting from”) */
  startingFrom?: number;
  /** Flat list when there are no sub-groups */
  items?: string[];
  groups?: ServiceGroup[];
};

/** Categories sorted alphabetically by `title` (A–Z). */
export const serviceCategories: ServiceCategory[] = [
  {
    id: "facials-premium",
    title: "Advanced Facials (Premium)",
    items: [
      "BB Glow Facial",
      "O3 Facial",
      "Korean Glass Skin Facial",
      "Charcoal Skin Tightening Facial",
      "Korean Rice Facial",
      "Hydra Boost Facial",
      "Korean Diamond Facial",
      "Gold + Tan Facial",
      "Pearl Facial",
      "FYC Hydra Facial",
      "Charcoal Glassy Facial",
      "Glycolic Facial",
    ],
  },
  {
    id: "facials-classic",
    title: "Classic Facials",
    items: [
      "Mixed Fruit Facial",
      "Orange Facial",
      "Strawberry Facial",
      "Wine Facial",
      "Gold Facial",
      "Tan Removal Facial",
      "Lotus Facial",
      "VLCC Facial",
      "Ozone Facial",
    ],
  },
  {
    id: "costume-jewellery-rentals",
    title: "Costume & Jewellery Rentals",
    items: ["Girls' photoshoot costumes for rent", "Bridal jewellery for rent"],
  },
  {
    id: "detan",
    title: "Detan & Skin Polishing",
    groups: [
      {
        title: "Areas",
        items: ["Face D-Tan", "Neck D-Tan", "Hand D-Tan", "Leg D-Tan", "Full Body D-Tan"],
      },
      {
        title: "Variants",
        items: ["Basic D-Tan", "Professional D-Tan"],
      },
    ],
  },
  {
    id: "hair-spa",
    title: "Hair Care & Spa",
    items: [
      "Hair Spa",
      "Dandruff Treatment",
      "Hair Fall Treatment",
      "Hair Smoothing Treatment",
      "Keratin Hair Spa",
      "Botox Hair Spa",
    ],
  },
  {
    id: "hair-color",
    title: "Hair Color & Styling",
    items: ["Global Hair Color", "Root Touch-Up", "Highlights", "Balayage"],
  },
  {
    id: "hair-services",
    title: "Hair Services",
    items: [
      "Step with Layers Haircut",
      "3 Step Haircut",
      "Baby Haircuts",
      "Bridal & International Hair Styling",
    ],
  },
  {
    id: "hair-advanced",
    title: "Hair Treatments (Advanced)",
    items: [
      "Permanent Hair Straightening",
      "Botox Hair Treatment",
      "Keratin Hair Treatment",
      "Nanoplastia Treatment",
    ],
  },
  {
    id: "makeup-services",
    title: "Makeup Services",
    items: [
      "Bridal Makeup (All States)",
      "HD Makeup",
      "HD Matte Makeup",
      "HD Glassy Makeup",
      "Airbrush Makeup",
      "No-Makeup Look (Natural)",
      "Baby Shower Makeup",
      "Pre-Wedding Shoot Makeup",
      "School Events Makeup",
      "All Skin Tone Makeup",
      "International Makeup Products",
    ],
  },
  {
    id: "nail-art",
    title: "Nail Art Services",
    tagline: "Make your nails beautiful, stylish & elegant",
    startingFrom: 499,
    items: [
      "Basic Nail Polish",
      "Gel Nail Polish",
      "French Nail Art",
      "Glitter Nail Art",
      "Stone Nail Art",
      "Bridal Nail Art",
      "Nail Extensions",
      "Ombre Nail Art",
      "Chrome Nail Art",
      "Cat Eye Nail Art",
    ],
  },
  {
    id: "pedicure",
    title: "Pedicure & Foot Care",
    items: ["Normal Pedicure", "Spa Pedicure", "Heel Treatment"],
  },
  {
    id: "permanent-beauty",
    title: "Permanent Beauty Services",
    items: ["Micro blading eyebrows", "Permanent lipstick", "Permanent Kajal"],
  },
  {
    id: "saree-box-folding",
    title: "Saree Box Folding",
    items: ["Professional Saree Box Folding", "Heavy Saree Folding", "GIFT Wrapping / Box Folding"],
  },
  {
    id: "skin-clinical",
    title: "Skin Treatments (Clinical)",
    items: [
      "Acne / Pimple Treatment",
      "Pigmentation Treatment",
      "Dark Circle Treatment",
      "Open Pores Treatment",
      "Hydra Facial Treatment",
    ],
  },
  {
    id: "threading",
    title: "Threading & Basic Grooming",
    items: ["Eyebrow Threading", "Face Threading"],
  },
  {
    id: "waxing",
    title: "Waxing & Hair Removal",
    groups: [
      {
        title: "Types",
        items: ["Basic Wax", "Rica Wax", "Chocolate Wax", "Full Body Wax"],
      },
      {
        title: "Areas",
        items: ["Face Waxing", "Hand Waxing", "Leg Waxing", "Full Body Waxing"],
      },
    ],
  },
];

/** Booking form optgroups: same alphabetical order as categories; "Other" last. */
export const bookingServiceGroups: { label: string; options: string[] }[] = [
  {
    label: "Advanced Facials (Premium)",
    options: [
      "BB Glow Facial",
      "O3 Facial",
      "Korean Glass Skin Facial",
      "Charcoal Skin Tightening Facial",
      "Korean Rice Facial",
      "Hydra Boost Facial",
      "Korean Diamond Facial",
      "Gold + Tan Facial",
      "Pearl Facial",
      "FYC Hydra Facial",
      "Charcoal Glassy Facial",
      "Glycolic Facial",
    ],
  },
  {
    label: "Classic Facials",
    options: [
      "Mixed Fruit Facial",
      "Orange Facial",
      "Strawberry Facial",
      "Wine Facial",
      "Gold Facial",
      "Tan Removal Facial",
      "Lotus Facial",
      "VLCC Facial",
      "Ozone Facial",
    ],
  },
  {
    label: "Costume & Jewellery Rentals",
    options: ["Girls' photoshoot costumes for rent", "Bridal jewellery for rent"],
  },
  {
    label: "Detan & Skin Polishing",
    options: [
      "Face D-Tan",
      "Neck D-Tan",
      "Hand D-Tan",
      "Leg D-Tan",
      "Full Body D-Tan",
      "Basic D-Tan",
      "Professional D-Tan",
    ],
  },
  {
    label: "Hair Care & Spa",
    options: [
      "Hair Spa",
      "Dandruff Treatment",
      "Hair Fall Treatment",
      "Hair Smoothing Treatment",
      "Keratin Hair Spa",
      "Botox Hair Spa",
    ],
  },
  {
    label: "Hair Color & Styling",
    options: ["Global Hair Color", "Root Touch-Up", "Highlights", "Balayage"],
  },
  {
    label: "Hair Services",
    options: [
      "Step with Layers Haircut",
      "3 Step Haircut",
      "Baby Haircuts",
      "Bridal & International Hair Styling",
    ],
  },
  {
    label: "Hair Treatments (Advanced)",
    options: [
      "Permanent Hair Straightening",
      "Botox Hair Treatment",
      "Keratin Hair Treatment",
      "Nanoplastia Treatment",
    ],
  },
  {
    label: "Makeup Services",
    options: [
      "Bridal Makeup (All States)",
      "HD Makeup",
      "HD Matte Makeup",
      "HD Glassy Makeup",
      "Airbrush Makeup",
      "No-Makeup Look (Natural)",
      "Baby Shower Makeup",
      "Pre-Wedding Shoot Makeup",
      "School Events Makeup",
      "All Skin Tone Makeup",
      "International Makeup Products",
    ],
  },
  {
    label: "Nail Art Services",
    options: [
      "Basic Nail Polish",
      "Gel Nail Polish",
      "French Nail Art",
      "Glitter Nail Art",
      "Stone Nail Art",
      "Bridal Nail Art",
      "Nail Extensions",
      "Ombre Nail Art",
      "Chrome Nail Art",
      "Cat Eye Nail Art",
    ],
  },
  {
    label: "Pedicure & Foot Care",
    options: ["Normal Pedicure", "Spa Pedicure", "Heel Treatment"],
  },
  {
    label: "Permanent Beauty Services",
    options: ["Micro blading eyebrows", "Permanent lipstick", "Permanent Kajal"],
  },
  {
    label: "Saree Box Folding",
    options: ["Professional Saree Box Folding", "Heavy Saree Folding", "GIFT Wrapping / Box Folding"],
  },
  {
    label: "Skin Treatments (Clinical)",
    options: [
      "Acne / Pimple Treatment",
      "Pigmentation Treatment",
      "Dark Circle Treatment",
      "Open Pores Treatment",
      "Hydra Facial Treatment",
    ],
  },
  {
    label: "Threading & Basic Grooming",
    options: ["Eyebrow Threading", "Face Threading"],
  },
  {
    label: "Waxing & Hair Removal",
    options: [
      "Basic Wax",
      "Rica Wax",
      "Chocolate Wax",
      "Full Body Wax",
      "Face Waxing",
      "Hand Waxing",
      "Leg Waxing",
      "Full Body Waxing",
    ],
  },
  {
    label: "Other",
    options: ["Multiple services / consultation", "Professional makeup & hair course", "Other (describe below)"],
  },
];
