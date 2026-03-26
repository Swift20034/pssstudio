export const summerOffersVenue = {
  name: "Pearl Bright Academy & Salon",
  location: "KR Puram, Bangalore",
  phone: "9686373707",
  email: "Srimathin321@gmail.com",
} as const;

export type SummerPackage = { id: string; price: number; title: string; items: string[] };

export const summerPackages: SummerPackage[] = [
  {
    id: "p1",
    price: 999,
    title: "Package 1",
    items: ["Threading", "Hand & Arms Waxing", "Clean Up", "Tan Pack"],
  },
  {
    id: "p2",
    price: 1999,
    title: "Package 2",
    items: ["Korean Pro Facial", "Hands & Legs Waxing Half (Rica D-Tan)", "Threading"],
  },
  {
    id: "p3",
    price: 1499,
    title: "Package 3",
    items: ["Hair Spa", "Hair Colouring"],
  },
  {
    id: "p4",
    price: 2500,
    title: "Package 4",
    items: ["Hydra Facial Treatment", "Hand Waxing", "Threading"],
  },
  {
    id: "p5",
    price: 1799,
    title: "Package 5",
    items: ["Pigmentation Bleach", "Gold Facial", "Pedicure", "Manicure", "Threading"],
  },
];

export const summerSpecialAddons: { name: string; price: number }[] = [
  { name: "Heel Treatment", price: 1200 },
  { name: "Body Massage", price: 1200 },
];

export type AlaCarteItem = { label: string; price: number };

export const alaCarteMakeupRates: AlaCarteItem[] = [
  { label: "Only Simple Makeup", price: 2000 },
  { label: "Simple Makeup + Hair + Saree", price: 3000 },
  { label: "Only Saree Draping", price: 500 },
  { label: "Only Hairstyle", price: 500 },
  { label: "Engagement Makeup", price: 5000 },
  { label: "Baby Shower Makeup", price: 5000 },
  { label: "Bridal Makeup", price: 7000 },
  { label: "Airbrush Makeup", price: 6000 },
  { label: "Reception & Muhurtham HD Look with Jewellery", price: 12000 },
];
