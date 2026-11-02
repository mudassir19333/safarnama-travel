"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import type { ServiceKey } from "@/data/travel";
import { FlightSearch } from "./FlightSearch";
import { HotelSearch } from "./HotelSearch";
import { CarSearch } from "./CarSearch";
import { VisaSearch } from "./VisaSearch";
import { ServiceIcon } from "../ui/ServiceIcon";

const tabs: { key: ServiceKey; label: string }[] = [
  { key: "flights", label: "Flights" },
  { key: "hotels", label: "Hotels" },
  { key: "visa", label: "Visa" },
  { key: "cars", label: "Car rental" },
];

/**
 * The boarding-pass search console. One tab per service; each tab owns its own
 * form and mock results so switching tabs keeps what the user typed.
 */
export function SearchConsole() {
  const [active, setActive] = useState<ServiceKey>("flights");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = (i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length;
    setActive(tabs[next].key);
    tabRefs.current[next]?.focus();
  };

  return (
    <div
      id="search"
      className="scroll-mt-28 rounded-[28px] bg-white shadow-[0_30px_80px_-30px_rgba(18,35,61,0.45)] ring-1 ring-line"
    >
      <div role="tablist" aria-label="What do you want to book?" className="grid grid-cols-2 gap-1 p-3 sm:flex sm:p-4">
        {tabs.map((t, i) => {
          const selected = active === t.key;
          return (
            <button
              key={t.key}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`tab-${t.key}`}
              aria-selected={selected}
              aria-controls={`panel-${t.key}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(t.key)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`flex shrink-0 items-center justify-center gap-2 sm:justify-start rounded-full px-4 py-2.5 text-[15px] font-semibold transition-colors ${
                selected ? "bg-ink text-white" : "text-slate hover:bg-fog hover:text-ink"
              }`}
            >
              <ServiceIcon name={t.key} className="size-[18px]" />
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="perforation" style={{ ["--notch-bg" as string]: "transparent" }} />

      {tabs.map((t) => (
        <div
          key={t.key}
          role="tabpanel"
          id={`panel-${t.key}`}
          aria-labelledby={`tab-${t.key}`}
          hidden={active !== t.key}
          className="p-5 sm:p-7"
        >
          {t.key === "flights" && <FlightSearch />}
          {t.key === "hotels" && <HotelSearch />}
          {t.key === "visa" && <VisaSearch />}
          {t.key === "cars" && <CarSearch />}
        </div>
      ))}
    </div>
  );
}
