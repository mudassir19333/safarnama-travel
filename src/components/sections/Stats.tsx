"use client";

import { useRef } from "react";
import { stats } from "@/data/travel";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

/** Counters tick up from zero the first time the band scrolls into view. */
export function Stats() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const numbers = gsap.utils.toArray<HTMLElement>("[data-count]", root.current);
      numbers.forEach((el) => {
        const target = Number(el.dataset.count);
        const render = (v: number) => (el.textContent = Math.round(v).toLocaleString("en-PK"));
        if (prefersReducedMotion()) return render(target);
        const counter = { v: 0 };
        render(0);
        gsap.to(counter, {
          v: target,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => render(counter.v),
          scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-label="Safarnama in numbers" className="bg-ink py-20 text-white">
      <dl className="mx-auto grid max-w-7xl gap-y-12 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="border-l-2 border-amber pl-6">
            <dt className="sr-only">{s.label}</dt>
            <dd>
              <span className="font-display text-5xl font-bold tracking-tight tabular-nums sm:text-6xl">
                <span data-count={s.value}>{s.value.toLocaleString("en-PK")}</span>
                {s.suffix}
              </span>
              <span className="mt-2 block text-white/70" aria-hidden="true">
                {s.label}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
