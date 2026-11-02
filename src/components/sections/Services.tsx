"use client";

import Image from "next/image";
import { useRef } from "react";
import { services } from "@/data/travel";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { ServiceIcon } from "../ui/ServiceIcon";

export function Services() {
  const root = useRef<HTMLElement>(null);

  // Hover: the photo eases in and the icon badge lifts. Driven by GSAP so it can be interrupted smoothly.
  const { contextSafe } = useGSAP({ scope: root });
  const hover = contextSafe((card: HTMLElement, on: boolean) => {
    if (prefersReducedMotion()) return;
    gsap.to(card.querySelector("[data-img]"), { scale: on ? 1.07 : 1, duration: 0.7, ease: "power3.out" });
    gsap.to(card.querySelector("[data-badge]"), { y: on ? -6 : 0, rotate: on ? -8 : 0, duration: 0.45, ease: "back.out(2)" });
  });

  return (
    <section ref={root} id="services" className="scroll-mt-20 bg-fog py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          title="Four services, one booking reference"
          intro="Book them together or on their own. Everything you buy from us shows up in a single itinerary we send to your phone."
        />
        <Reveal stagger className="mt-14 grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <article
              key={s.key}
              onMouseEnter={(e) => hover(e.currentTarget, true)}
              onMouseLeave={(e) => hover(e.currentTarget, false)}
              className="group overflow-hidden rounded-[28px] bg-white"
              style={{ ["--notch-bg" as string]: "var(--color-fog)" }}
            >
              <div className="relative aspect-[16/8] overflow-hidden">
                <Image
                  data-img
                  src={s.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="perforation" />
              <div className="relative p-6 sm:p-8">
                <span
                  data-badge
                  className="absolute -top-7 right-7 grid size-14 place-items-center rounded-2xl bg-amber text-ink shadow-lg"
                >
                  <ServiceIcon name={s.key} className="size-7" />
                </span>
                <h3 className="font-display text-2xl font-bold tracking-tight">{s.title}</h3>
                <p className="mt-2 max-w-md leading-relaxed text-slate">{s.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {s.points.map((p) => (
                    <li key={p} className="rounded-full border border-line px-3.5 py-1.5 text-sm text-ink/80">
                      {p}
                    </li>
                  ))}
                </ul>
                <a
                  href="#search"
                  className="mt-6 inline-flex items-center gap-1.5 font-semibold text-ink underline decoration-amber decoration-2 underline-offset-[6px] hover:decoration-ink"
                >
                  Search {s.title.toLowerCase()}
                </a>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
