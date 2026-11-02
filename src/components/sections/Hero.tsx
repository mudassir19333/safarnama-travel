"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { destinations, formatPKR } from "@/data/travel";
import { LinkButton } from "../ui/Button";
import { SearchConsole } from "../search/SearchConsole";

const routes = destinations.filter((d) => ["DXB", "IST", "MLE", "LHR"].includes(d.code));
const headline = ["Visa, flight, hotel", "and car, sorted by", "one travel desk."];
const FLIGHT_PATH = "M40 330 C 140 300, 170 150, 300 120 S 430 60, 470 40";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const [routeIndex, setRouteIndex] = useState(0);
  const route = routes[routeIndex];

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const plane = root.current?.querySelector<SVGGElement>("[data-plane]");
      const trail = root.current?.querySelector<SVGPathElement>("[data-trail]");
      if (!plane || !trail) return;
      const length = trail.getTotalLength();

      if (prefersReducedMotion()) {
        gsap.set(q("[data-hero-in]"), { autoAlpha: 1 });
        gsap.set(trail, { strokeDasharray: length, strokeDashoffset: 0 });
        gsap.set(plane, {
          motionPath: { path: trail, align: trail, alignOrigin: [0.5, 0.5], autoRotate: true, start: 1, end: 1 },
        });
        return;
      }

      // Page-load sequence: headline lines rise, photo opens, then the first flight takes off.
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from(q("[data-line]"), { yPercent: 110, duration: 0.9, stagger: 0.1 })
        .fromTo(q("[data-hero-in]"), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1 }, "-=0.5")
        .from(q("[data-photo]"), { clipPath: "inset(100% 0% 0% 0% round 32px)", duration: 1.1, ease: "power4.inOut" }, 0.15)
        .from(q("[data-console]"), { y: 40, autoAlpha: 0, duration: 0.8 }, "-=0.6");

      // Each loop draws the route, flies the plane along it, then swaps to the next destination.
      gsap.set(trail, { strokeDasharray: length, strokeDashoffset: length });
      const flight = gsap.timeline({ repeat: -1, delay: 1.1, repeatDelay: 0.2 });
      flight
        .set(trail, { strokeDashoffset: length })
        .fromTo(q("[data-ticket]"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.5 })
        .to(trail, { strokeDashoffset: 0, duration: 2.6, ease: "power1.inOut" }, "<")
        .to(
          plane,
          {
            duration: 2.6,
            ease: "power1.inOut",
            motionPath: { path: trail, align: trail, alignOrigin: [0.5, 0.5], autoRotate: true },
          },
          "<",
        )
        .to({}, { duration: 1.6 })
        .to(q("[data-ticket]"), { autoAlpha: 0, y: -12, duration: 0.4 })
        .to(trail, { opacity: 0, duration: 0.4 }, "<")
        .add(() => setRouteIndex((i) => (i + 1) % routes.length))
        .set(trail, { opacity: 1 });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pb-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <h1 className="font-display text-[2.3rem] leading-[1] min-[400px]:text-[2.6rem] font-extrabold tracking-[-0.03em] sm:text-6xl xl:text-7xl">
              {headline.map((line) => (
                <span key={line} className="block overflow-hidden pb-1">
                  <span data-line className="block">
                    {line}
                  </span>
                </span>
              ))}
            </h1>
            <p data-hero-in data-reveal className="mt-6 max-w-lg text-lg leading-relaxed text-slate">
              Safarnama plans trips from Pakistan end to end. Send your documents on WhatsApp, pick a fare,
              and we handle the embassy, the airline and the hotel.
            </p>
            <div data-hero-in data-reveal className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="#search">Search fares</LinkButton>
              <LinkButton href="#services" variant="outline">
                See all services
              </LinkButton>
            </div>
          </div>

          <div data-photo className="relative aspect-[4/3.4] overflow-hidden rounded-[32px] sm:aspect-[4/3]">
            <Image
              src="/images/hero-wing.jpg"
              alt="View of a plane wing above the clouds at sunset"
              fill
              priority
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/5 to-transparent" />

            <svg
              viewBox="0 0 500 380"
              className="absolute inset-0 h-full w-full"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <path d={FLIGHT_PATH} fill="none" stroke="white" strokeOpacity=".45" strokeWidth="2" strokeDasharray="2 9" strokeLinecap="round" />
              <path data-trail d={FLIGHT_PATH} fill="none" stroke="var(--color-amber)" strokeWidth="3" strokeLinecap="round" />
              <circle cx="40" cy="330" r="6" fill="white" />
              <circle cx="470" cy="40" r="6" fill="var(--color-amber)" />
              <g data-plane>
                <circle r="17" fill="white" />
                <path
                  d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"
                  fill="var(--color-ink)"
                  transform="translate(-11.5 -12.5) rotate(90 11.5 12.5)"
                />
              </g>
            </svg>

            <div
              data-ticket
              className="absolute right-4 bottom-4 left-4 flex items-center justify-between rounded-2xl bg-white/95 px-5 py-4 backdrop-blur sm:right-6 sm:bottom-6 sm:left-auto sm:w-[22rem]"
            >
              <div>
                <p className="font-display text-2xl font-bold tracking-tight">
                  <span className="sr-only">From Islamabad to </span>
                  <span aria-hidden="true">ISB</span>
                  <svg viewBox="0 0 24 8" className="mx-2 inline-block h-2 w-7 align-middle text-amber-dark" aria-hidden="true">
                    <path d="M0 4h21m-4-3l4 3-4 3" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                  {route.code}
                </p>
                <p className="text-sm text-slate">
                  {route.city}, {route.flightTime}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate">Return from</p>
                <p className="font-display text-lg font-bold">{formatPKR(route.fromPrice)}</p>
              </div>
            </div>
          </div>
        </div>

        <div data-console className="mt-12 lg:mt-16">
          <SearchConsole />
        </div>
      </div>
    </section>
  );
}
