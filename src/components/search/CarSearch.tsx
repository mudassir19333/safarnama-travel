"use client";

import { useState, type FormEvent } from "react";
import { cars, carCities, formatPKR, type Car } from "@/data/travel";
import { Input, Select } from "../ui/Field";
import { Button } from "../ui/Button";
import { Results, ResultRow } from "./Results";
import { HoldButton } from "./HoldButton";
import { useToday } from "@/lib/useToday";


export function CarSearch() {
  const today = useToday();
  const [city, setCity] = useState(carCities[0]);
  const [pickup, setPickup] = useState("");
  const [days, setDays] = useState("3");
  const [driver, setDriver] = useState("any");
  const [results, setResults] = useState<Car[]>([]);
  const [searchId, setSearchId] = useState(0);
  const [searched, setSearched] = useState({ city, days: 3 });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setResults(
      cars
        .filter((c) => c.city === city)
        .filter((c) => driver === "any" || (driver === "yes") === c.withDriver)
        .sort((a, b) => a.pricePerDay - b.pricePerDay),
    );
    setSearched({ city, days: Number(days) });
    setSearchId((n) => n + 1);
  };

  return (
    <>
      <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_0.8fr_1fr_auto] lg:items-end">
        <Select
          label="Pick-up city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          options={carCities.map((c) => ({ value: c, label: c }))}
        />
        <Input label="Pick-up date" type="date" required min={today} value={pickup} onChange={(e) => setPickup(e.target.value)} />
        <Select
          label="Days"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          options={[1, 2, 3, 5, 7, 10, 14].map((n) => ({ value: String(n), label: `${n} day${n > 1 ? "s" : ""}` }))}
        />
        <Select
          label="Driver"
          value={driver}
          onChange={(e) => setDriver(e.target.value)}
          options={[
            { value: "any", label: "Either" },
            { value: "yes", label: "With driver" },
            { value: "no", label: "Self-drive" },
          ]}
        />
        <Button type="submit" className="h-[50px] sm:col-span-2 lg:col-span-1">
          Search cars
        </Button>
      </form>

      <Results
        searchId={searchId}
        count={results.length}
        summary={`${results.length} cars in ${searched.city} for ${searched.days} day${searched.days > 1 ? "s" : ""}`}
        empty="No cars match that choice. Try “Either” for the driver option."
      >
        {results.map((c) => (
          <ResultRow key={c.id}>
            <div>
              <p className="font-display text-lg font-semibold">{c.model}</p>
              <p className="text-sm text-slate">
                {c.type}, {c.seats} seats, {c.withDriver ? "driver included" : "self-drive"}
              </p>
            </div>
            <div className="flex items-center justify-between gap-5 sm:justify-end">
              <div className="text-right">
                <p className="font-display text-xl font-bold">{formatPKR(c.pricePerDay * searched.days)}</p>
                <p className="text-xs text-slate">{formatPKR(c.pricePerDay)} per day</p>
              </div>
              <HoldButton label="Book car" doneLabel="Booked" />
            </div>
          </ResultRow>
        ))}
      </Results>
    </>
  );
}
