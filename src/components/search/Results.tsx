"use client";

import { useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

type Props = {
  /** Changes every time the user submits a search; replays the entrance */
  searchId: number;
  summary: string;
  empty: string;
  count: number;
  children: ReactNode;
};

/** Mock results list. Items slide in after each search so the change is visible. */
export function Results({ searchId, summary, empty, count, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return;
      gsap.from(ref.current.querySelectorAll("[data-result]"), {
        autoAlpha: 0,
        y: 18,
        duration: 0.45,
        stagger: 0.07,
        ease: "power2.out",
      });
    },
    { scope: ref, dependencies: [searchId], revertOnUpdate: true },
  );

  if (searchId === 0) return null;

  return (
    <div ref={ref} className="mt-7" aria-live="polite">
      <p className="text-sm font-medium text-slate">{count > 0 ? summary : empty}</p>
      {count > 0 && <ul className="mt-3 grid gap-3">{children}</ul>}
    </div>
  );
}

export function ResultRow({ children }: { children: ReactNode }) {
  return (
    <li
      data-result
      className="flex flex-col gap-4 rounded-2xl border border-line p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"
    >
      {children}
    </li>
  );
}
