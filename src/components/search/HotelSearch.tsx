"use client";

import { useState, type FormEvent } from "react";
import { hotels, hotelCities, formatPKR, type Hotel } from "@/data/travel";
import { Input, Select } from "../ui/Field";
import { Button } from "../ui/Button";
import { Results, ResultRow } from "./Results";
import { HoldButton } from "./HoldButton";
import { useToday } from "@/lib/useToday";


export function HotelSearch() {
  const today = useToday();
  const [city, setCity] = useState(hotelCities[0]);
  const [checkIn, setCheckIn] = useState("");
  const [nights, setNights] = useState("3");
  const [guests, setGuests] = useState("2");
  const [results, setResults] = useState<Hotel[]>([]);
  const [searchId, setSearchId] = useState(0);
  const [searched, setSearched] = useState({ city, nights: 3 });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const rooms = Math.ceil(Number(guests) / 3);
    setResults(
      hotels
        .filter((h) => h.city === city)
        .map((h) => ({ ...h, pricePerNight: h.pricePerNight * rooms }))
        .sort((a, b) => b.rating - a.rating),
    );
    setSearched({ city, nights: Number(nights) });
    setSearchId((n) => n + 1);
  };

  return (
    <>
      <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_0.8fr_0.8fr_auto] lg:items-end">
        <Select
          label="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          options={hotelCities.map((c) => ({ value: c, label: c }))}
        />
        <Input label="Check-in" type="date" required min={today} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
        <Select
          label="Nights"
          value={nights}
          onChange={(e) => setNights(e.target.value)}
          options={[1, 2, 3, 4, 5, 7, 10, 14].map((n) => ({ value: String(n), label: `${n} night${n > 1 ? "s" : ""}` }))}
        />
        <Select
          label="Guests"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          options={[1, 2, 3, 4, 5, 6].map((n) => ({ value: String(n), label: `${n} guest${n > 1 ? "s" : ""}` }))}
        />
        <Button type="submit" className="h-[50px] sm:col-span-2 lg:col-span-1">
          Search hotels
        </Button>
      </form>

      <Results
        searchId={searchId}
        count={results.length}
        summary={`${results.length} hotels in ${searched.city} for ${searched.nights} night${searched.nights > 1 ? "s" : ""}`}
        empty="No hotels listed in this city yet."
      >
        {results.map((h) => (
          <ResultRow key={h.id}>
            <div>
              <p className="font-display text-lg font-semibold">{h.name}</p>
              <p className="text-sm text-slate">
                {h.area} <span aria-hidden="true">·</span> rated {h.rating} of 5
              </p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {h.perks.map((p) => (
                  <li key={p} className="rounded-full bg-fog px-3 py-1 text-xs font-medium text-ink/80">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-between gap-5 sm:justify-end">
              <div className="text-right">
                <p className="font-display text-xl font-bold">{formatPKR(h.pricePerNight * searched.nights)}</p>
                <p className="text-xs text-slate">{formatPKR(h.pricePerNight)} per night</p>
              </div>
              <HoldButton label="Reserve" doneLabel="Reserved" />
            </div>
          </ResultRow>
        ))}
      </Results>
    </>
  );
}
