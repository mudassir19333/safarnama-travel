// All data on this site is mock data. No backend or real APIs are used.

export type ServiceKey = "visa" | "flights" | "hotels" | "cars";

export const services: {
  key: ServiceKey;
  title: string;
  summary: string;
  points: string[];
  image: string;
}[] = [
  {
    key: "visa",
    title: "Visa services",
    summary:
      "We check your file, book the appointment and track it until the passport comes back.",
    points: ["Document checklist per country", "Embassy appointments", "Status updates on WhatsApp"],
    image: "/images/visa.jpg",
  },
  {
    key: "flights",
    title: "Flight tickets",
    summary:
      "Fares from the airlines that fly out of Islamabad, Lahore, Karachi and Peshawar, compared in one place.",
    points: ["Direct and one-stop options", "Group and Umrah fares", "Free date change on selected fares"],
    image: "/images/hero-wing.jpg",
  },
  {
    key: "hotels",
    title: "Hotel booking",
    summary:
      "Hand-checked hotels near the places you actually want to be, with breakfast and transfers where it counts.",
    points: ["Pay in PKR", "Family rooms", "Free cancellation on most stays"],
    image: "/images/hotel.jpg",
  },
  {
    key: "cars",
    title: "Car rental",
    summary:
      "Self-drive or with a driver, at home or abroad. Airport pickup can be added to any booking.",
    points: ["Sedans, SUVs and vans", "Driver on request", "Full insurance included"],
    image: "/images/car.jpg",
  },
];

/* ---------- Places ---------- */

export const homeAirports = [
  { code: "ISB", city: "Islamabad" },
  { code: "LHE", city: "Lahore" },
  { code: "KHI", city: "Karachi" },
  { code: "PEW", city: "Peshawar" },
] as const;

export const destinations = [
  {
    code: "DXB",
    city: "Dubai",
    country: "United Arab Emirates",
    image: "/images/dubai.jpg",
    fromPrice: 64000,
    flightTime: "3h 05m",
    note: "Visa in 3 working days",
  },
  {
    code: "IST",
    city: "Istanbul",
    country: "Türkiye",
    image: "/images/istanbul.jpg",
    fromPrice: 118000,
    flightTime: "6h 10m",
    note: "E-visa for eligible travellers",
  },
  {
    code: "BKK",
    city: "Bangkok",
    country: "Thailand",
    image: "/images/bangkok.jpg",
    fromPrice: 96000,
    flightTime: "5h 20m",
    note: "Street food capital",
  },
  {
    code: "MLE",
    city: "Malé",
    country: "Maldives",
    image: "/images/maldives.jpg",
    fromPrice: 142000,
    flightTime: "5h 55m",
    note: "Visa on arrival",
  },
  {
    code: "CDG",
    city: "Paris",
    country: "France",
    image: "/images/paris.jpg",
    fromPrice: 215000,
    flightTime: "10h 40m",
    note: "Schengen visa support",
  },
  {
    code: "LHR",
    city: "London",
    country: "United Kingdom",
    image: "/images/london.jpg",
    fromPrice: 228000,
    flightTime: "8h 50m",
    note: "UK visit visa support",
  },
] as const;

export type DestinationCode = (typeof destinations)[number]["code"];

/* ---------- Flights ---------- */

const airlines = [
  { name: "PIA", base: 1.0, stops: 0 },
  { name: "Emirates", base: 1.18, stops: 1 },
  { name: "Turkish Airlines", base: 1.12, stops: 1 },
  { name: "Qatar Airways", base: 1.15, stops: 1 },
  { name: "Airblue", base: 0.92, stops: 0 },
];

export type FlightResult = {
  id: string;
  airline: string;
  from: string;
  to: string;
  depart: string;
  arrive: string;
  duration: string;
  stops: number;
  price: number;
};

// Short-haul routes keep direct flights; long-haul routes only show connecting carriers.
export function searchFlights(from: string, to: string, passengers: number): FlightResult[] {
  const dest = destinations.find((d) => d.code === to);
  if (!dest || from === to) return [];
  const longHaul = ["CDG", "LHR", "IST"].includes(to);
  const pool = longHaul ? airlines.filter((a) => a.stops > 0 || a.name === "PIA") : airlines;
  const [h, m] = dest.flightTime.replace(/[hm]/g, "").split(" ").map(Number);
  const seed = from.charCodeAt(0) + to.charCodeAt(1);

  return pool.slice(0, 4).map((airline, i) => {
    const departHour = (6 + ((seed + i * 5) % 16)) % 24;
    const extra = airline.stops ? 2 * 60 + 15 : 0;
    const totalMin = h * 60 + m + extra;
    const arriveMin = departHour * 60 + totalMin;
    const fmt = (min: number) =>
      `${String(Math.floor(min / 60) % 24).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;
    const price = Math.round((dest.fromPrice * airline.base + i * 3500) / 500) * 500;
    return {
      id: `${from}-${to}-${airline.name}`,
      airline: airline.name,
      from,
      to,
      depart: fmt(departHour * 60),
      arrive: fmt(arriveMin) + (arriveMin >= 24 * 60 ? " +1" : ""),
      duration: `${Math.floor(totalMin / 60)}h ${String(totalMin % 60).padStart(2, "0")}m`,
      stops: airline.stops,
      price: price * passengers,
    };
  }).sort((a, b) => a.price - b.price);
}

/* ---------- Hotels ---------- */

export type Hotel = {
  id: string;
  name: string;
  city: string;
  area: string;
  rating: number;
  pricePerNight: number;
  perks: string[];
};

export const hotels: Hotel[] = [
  { id: "h1", name: "Marina Bay Suites", city: "Dubai", area: "Dubai Marina", rating: 4.6, pricePerNight: 38000, perks: ["Breakfast", "Pool"] },
  { id: "h2", name: "Al Seef Heritage Inn", city: "Dubai", area: "Al Fahidi", rating: 4.3, pricePerNight: 24500, perks: ["Creek view", "Free Wi-Fi"] },
  { id: "h3", name: "Downtown Loft Hotel", city: "Dubai", area: "Downtown", rating: 4.8, pricePerNight: 52000, perks: ["Burj view", "Airport transfer"] },
  { id: "h4", name: "Sultanahmet Garden House", city: "Istanbul", area: "Sultanahmet", rating: 4.5, pricePerNight: 21000, perks: ["Breakfast", "Walk to Blue Mosque"] },
  { id: "h5", name: "Galata Terrace Hotel", city: "Istanbul", area: "Karaköy", rating: 4.4, pricePerNight: 26500, perks: ["Bosphorus view", "Free Wi-Fi"] },
  { id: "h6", name: "Riverside Orchid", city: "Bangkok", area: "Chao Phraya", rating: 4.5, pricePerNight: 19500, perks: ["River shuttle", "Pool"] },
  { id: "h7", name: "Sukhumvit Central", city: "Bangkok", area: "Sukhumvit", rating: 4.2, pricePerNight: 14000, perks: ["Near BTS", "Breakfast"] },
  { id: "h8", name: "Coral Lagoon Villas", city: "Malé", area: "South Malé Atoll", rating: 4.9, pricePerNight: 96000, perks: ["Water villa", "Speedboat transfer"] },
  { id: "h9", name: "Hulhumalé Beach Stay", city: "Malé", area: "Hulhumalé", rating: 4.3, pricePerNight: 31000, perks: ["Beachfront", "Breakfast"] },
  { id: "h10", name: "Hôtel Rive Gauche", city: "Paris", area: "Saint-Germain", rating: 4.6, pricePerNight: 58000, perks: ["Breakfast", "Metro nearby"] },
  { id: "h11", name: "Montmartre Studio", city: "Paris", area: "Montmartre", rating: 4.2, pricePerNight: 36000, perks: ["Kitchenette", "Free Wi-Fi"] },
  { id: "h12", name: "Kensington Row", city: "London", area: "South Kensington", rating: 4.5, pricePerNight: 61000, perks: ["Breakfast", "Museum district"] },
  { id: "h13", name: "Thames Quay Hotel", city: "London", area: "Southwark", rating: 4.3, pricePerNight: 47000, perks: ["River view", "Gym"] },
];

export const hotelCities = Array.from(new Set(hotels.map((h) => h.city)));

/* ---------- Cars ---------- */

export type Car = {
  id: string;
  model: string;
  type: "Sedan" | "SUV" | "Van";
  seats: number;
  city: string;
  pricePerDay: number;
  withDriver: boolean;
};

export const cars: Car[] = [
  { id: "c1", model: "Toyota Corolla", type: "Sedan", seats: 5, city: "Islamabad", pricePerDay: 9000, withDriver: true },
  { id: "c2", model: "Toyota Fortuner", type: "SUV", seats: 7, city: "Islamabad", pricePerDay: 22000, withDriver: true },
  { id: "c3", model: "Toyota Hiace", type: "Van", seats: 12, city: "Islamabad", pricePerDay: 18000, withDriver: true },
  { id: "c4", model: "Honda Civic", type: "Sedan", seats: 5, city: "Lahore", pricePerDay: 11000, withDriver: true },
  { id: "c5", model: "Kia Sportage", type: "SUV", seats: 5, city: "Lahore", pricePerDay: 16000, withDriver: false },
  { id: "c6", model: "Suzuki Cultus", type: "Sedan", seats: 4, city: "Karachi", pricePerDay: 6500, withDriver: false },
  { id: "c7", model: "Toyota Prado", type: "SUV", seats: 7, city: "Karachi", pricePerDay: 28000, withDriver: true },
  { id: "c8", model: "Nissan Sunny", type: "Sedan", seats: 5, city: "Dubai", pricePerDay: 12500, withDriver: false },
  { id: "c9", model: "Nissan Patrol", type: "SUV", seats: 7, city: "Dubai", pricePerDay: 34000, withDriver: true },
  { id: "c10", model: "Renault Clio", type: "Sedan", seats: 5, city: "Istanbul", pricePerDay: 10500, withDriver: false },
  { id: "c11", model: "Mercedes Vito", type: "Van", seats: 8, city: "Istanbul", pricePerDay: 30000, withDriver: true },
];

export const carCities = Array.from(new Set(cars.map((c) => c.city)));

/* ---------- Visas ---------- */

export type VisaInfo = {
  country: string;
  type: string;
  processing: string;
  fee: number;
  validity: string;
  documents: string[];
};

export const visas: VisaInfo[] = [
  {
    country: "United Arab Emirates",
    type: "30-day tourist visa (e-visa)",
    processing: "3–4 working days",
    fee: 38000,
    validity: "60 days from issue",
    documents: ["Passport scan (6+ months valid)", "Photo on white background", "Confirmed return ticket", "Hotel booking"],
  },
  {
    country: "Türkiye",
    type: "Tourist sticker visa",
    processing: "10–15 working days",
    fee: 32000,
    validity: "Up to 90 days",
    documents: ["Passport and old passports", "Bank statement (6 months)", "Employment or business letter", "Travel insurance"],
  },
  {
    country: "Thailand",
    type: "Tourist e-visa (TR)",
    processing: "7–10 working days",
    fee: 21000,
    validity: "60 days stay",
    documents: ["Passport scan", "Bank statement (3 months)", "Flight itinerary", "Hotel booking"],
  },
  {
    country: "Maldives",
    type: "Visa on arrival",
    processing: "Granted at airport",
    fee: 0,
    validity: "30 days",
    documents: ["Passport (6+ months valid)", "Confirmed hotel booking", "Return ticket", "IMUGA travel declaration"],
  },
  {
    country: "Schengen (France)",
    type: "Short-stay visit visa",
    processing: "15–25 working days",
    fee: 46000,
    validity: "As per itinerary",
    documents: ["Cover letter", "Bank statement and tax returns", "Travel insurance (€30,000)", "Biometrics appointment"],
  },
  {
    country: "United Kingdom",
    type: "Standard visitor visa",
    processing: "15 working days",
    fee: 52000,
    validity: "6 months",
    documents: ["Online application", "Financial documents", "Employment proof", "Biometrics at VFS"],
  },
];

/* ---------- Social proof ---------- */

export const stats = [
  { value: 12400, suffix: "+", label: "visa files processed" },
  { value: 38, suffix: "", label: "countries we book for" },
  { value: 96, suffix: "%", label: "visa approval rate in 2025" },
  { value: 9, suffix: "", label: "years in Blue Area, Islamabad" },
];

export const testimonials = [
  {
    name: "Ayesha Khan",
    city: "Lahore",
    trip: "Family trip to Dubai",
    quote:
      "They handled four visas, flights and a hotel with a kids' pool. I sent documents on WhatsApp and never had to visit the office.",
  },
  {
    name: "Hamza Siddiqui",
    city: "Islamabad",
    trip: "Schengen visa, Paris",
    quote:
      "My first Schengen application. The checklist was clear, the cover letter was reviewed twice, and the visa came in 17 days.",
  },
  {
    name: "Mariam & Bilal",
    city: "Karachi",
    trip: "Honeymoon in the Maldives",
    quote:
      "The water villa was exactly like the photos. The speedboat transfer was waiting when we landed, which mattered after a late flight.",
  },
  {
    name: "Usman Tariq",
    city: "Peshawar",
    trip: "Istanbul with a rental car",
    quote:
      "Booked the car and hotel together. The car was at the airport with full insurance, and the rate was lower than I found online.",
  },
];

export const formatPKR = (n: number) =>
  n === 0 ? "Free" : `PKR ${n.toLocaleString("en-PK")}`;
