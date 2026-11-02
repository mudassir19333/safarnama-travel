# Safarnama Travel: Travel Agency Website

A responsive travel agency website built for the **Bizwave Consultancy Frontend Developer assessment**. It covers four services (visa services, flight tickets, hotel booking and car rental) with working search forms that run on mock data.

**Live site:** https://safarnama-travel-nine.vercel.app

**Tech stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · GSAP 3 (ScrollTrigger, MotionPath) with `@gsap/react`

## Features

- **Search console** with one tab per service. Each form filters mock data and shows results:
  - **Flights:** pick origin (Islamabad, Lahore, Karachi, Peshawar), destination, date and passengers. Shows fares sorted by price.
  - **Hotels:** pick city, check-in, nights and guests. Shows hotels with total and per-night price.
  - **Visa:** pick destination country. Shows visa type, processing time, fee and document checklist.
  - **Car rental:** pick city, date, days and driver option. Shows available cars with total price.
- **Service cards** for all four services
- **Popular destinations** grid with prices
- **Stats band** with animated counters
- **Testimonials**
- **Contact form** with client-side validation (Pakistani mobile format) and a success state
- **Footer** with contact details and links
- Responsive on mobile, tablet and desktop, with a mobile menu
- Keyboard-friendly tabs (arrow keys), visible focus states, and support for `prefers-reduced-motion`

## GSAP animations

| Animation | Where | File |
|---|---|---|
| Hero intro: headline lines rise, photo opens with a clip-path reveal, search console slides up | Hero | `src/components/sections/Hero.tsx` |
| Looping flight path: route line draws on and a plane follows it (MotionPathPlugin), then switches destination | Hero photo | `src/components/sections/Hero.tsx` |
| Scroll reveals (ScrollTrigger, run once) | Section headings, cards, lists | `src/components/ui/Reveal.tsx` |
| Counters that count up when scrolled into view | Stats band | `src/components/sections/Stats.tsx` |
| Hover effects: image zoom, icon badge lift, destination details expanding | Service and destination cards | `Services.tsx`, `Destinations.tsx` |
| Search results stagger in after each search | All four search tabs | `src/components/search/Results.tsx` |

If the visitor has reduced motion turned on, every animation is skipped and content is shown straight away.

## Project structure

```
src/
  app/
    layout.tsx          fonts, metadata
    page.tsx            page composition
    globals.css         Tailwind theme tokens (colours, fonts), perforation style
  components/
    layout/             Header, Footer, Logo
    sections/           Hero, Services, Destinations, Stats, Testimonials, Contact
    search/             SearchConsole + FlightSearch, HotelSearch, VisaSearch, CarSearch, Results
    ui/                 Button, Field (Input/Select), SectionHeading, Reveal, ServiceIcon
  data/travel.ts        all mock data + search helpers
  lib/
    gsap.ts             registers GSAP plugins once
    useToday.ts         date helper for date inputs
public/images/          destination and service photos (Unsplash)
```

## Getting started

Requires Node.js 20 or newer.

```bash
git clone <repo-url>
cd safarnama-travel
npm install
npm run dev
```

Open http://localhost:3000.

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint
```

## Notes

- There is no backend or real API. All prices, flights, hotels, cars and visa details live in `src/data/travel.ts` and are sample data only.
- The "Hold fare", "Reserve" and "Book car" buttons only confirm the choice on screen. Nothing is booked.
- Photos are from [Unsplash](https://unsplash.com) and are stored locally in `public/images`.

---

Built by **Mudassir Mehmood** · mudassir.gat@gmail.com · +92 331 7711652
