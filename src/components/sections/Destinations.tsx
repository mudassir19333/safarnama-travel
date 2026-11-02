"use client";

import Image from "next/image";
import { useRef } from "react";
import { destinations, formatPKR } from "@/data/travel";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";

export function Destinations() {
  const root = useRef<HTMLElement>(null);
  const { contextSafe } = useGSAP({ scope: root });

  const hover = contextSafe((card: HTMLElement, on: boolean) => {
    if (prefersReducedMotion()) return;
    gsap.to(card.querySelector("[data-img]"), { scale: on ? 1.08 : 1, duration: 0.9, ease: "power3.out" });
    gsap.to(card.querySelector("[data-more]"), { height: on ? "auto" : 0, autoAlpha: on ? 1 : 0, duration: 0.4, ease: "power2.out" });
  });

  return (
    <section ref={root} id="destinations" className="scroll-mt-20 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            title="Where people are flying this winter"
            intro="Return fares from Islamabad for one adult, including taxes. Prices change daily."
          />
        </div>

        <Reveal
          stagger
          className="mt-12 grid auto-rows-[260px] gap-5 sm:grid-cols-2 lg:auto-rows-[280px] lg:grid-cols-3"
        >
          {destinations.map((d, i) => (
            <a
              key={d.code}
              href="#search"
              onMouseEnter={(e) => hover(e.currentTarget, true)}
              onMouseLeave={(e) => hover(e.currentTarget, false)}
              onFocus={(e) => hover(e.currentTarget, true)}
              onBlur={(e) => hover(e.currentTarget, false)}
              className={`relative isolate flex overflow-hidden rounded-[28px] ${
                i === 0 ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""
              } ${i === 3 ? "lg:col-span-2" : ""} ${i === 5 ? "sm:col-span-2" : ""}`}
            >
              <Image
                data-img
                src={d.image}
                alt={`${d.city}, ${d.country}`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="-z-10 object-cover"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              <div className="mt-auto flex w-full items-end justify-between gap-4 p-6 text-white">
                <div>
                  <p className="font-display text-3xl font-bold tracking-tight">{d.city}</p>
                  <p className="text-white/80">{d.country}</p>
                  <div data-more className="h-0 overflow-hidden opacity-0 invisible">
                    <p className="pt-2 text-sm text-white/90">
                      {d.flightTime} flight. {d.note}.
                    </p>
                  </div>
                </div>
                <div className="shrink-0 rounded-2xl bg-white px-4 py-2.5 text-right text-ink">
                  <p className="text-xs text-slate">from</p>
                  <p className="font-display font-bold">{formatPKR(d.fromPrice)}</p>
                </div>
              </div>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
