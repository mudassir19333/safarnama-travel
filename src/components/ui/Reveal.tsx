"use client";

import { useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

type Props = {
  children: ReactNode;
  className?: string;
  /** Animate direct children one after another instead of the block as a whole */
  stagger?: boolean;
};

/** Fades and lifts content into view once, when it scrolls into the viewport. */
export function Reveal({ children, className, stagger = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const targets = stagger ? Array.from(el.children) : [el];
      if (prefersReducedMotion()) {
        gsap.set(targets, { autoAlpha: 1 });
        return;
      }
      gsap.fromTo(
        targets,
        { autoAlpha: 0, y: 32 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: stagger ? 0.12 : 0,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      className={className}
      {...(stagger ? { "data-reveal-children": "" } : { "data-reveal": "" })}
    >
      {children}
    </div>
  );
}
