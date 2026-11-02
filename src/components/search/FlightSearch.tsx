"use client";

import { useState, type FormEvent } from "react";
import { destinations, homeAirports, searchFlights, formatPKR, type FlightResult } from "@/data/travel";
import { Input, Select } from "../ui/Field";
import { Button } from "../ui/Button";
import { Results, ResultRow } from "./Results";
import { HoldButton } from "./HoldButton";
import { useToday } from "@/lib/useToday";


export function FlightSearch() {
  const today = useToday();
  const [from, setFrom] = useState("ISB");
  const [to, setTo] = useState("DXB");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [results, setResults] = useState<FlightResult[]>([]);
  const [searchId, setSearchId] = useState(0);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setResults(searchFlights(from, to, Number(passengers)));
    setSearchId((n) => n + 1);
  };

  const fromCity = homeAirports.find((a) => a.code === from)?.city;
  const toCity = destinations.find((d) => d.code === to)?.city;

  return (
    <>
      <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_0.7fr_auto] lg:items-end">
        <Select
          label="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          options={homeAirports.map((a) => ({ value: a.code, label: `${a.city} (${a.code})` }))}
        />
        <Select
          label="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          options={destinations.map((d) => ({ value: d.code, label: `${d.city} (${d.code})` }))}
        />
        <Input
          label="Departure"
          type="date"
          required
          min={today}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Select
          label="Passengers"
          value={passengers}
          onChange={(e) => setPassengers(e.target.value)}
          options={[1, 2, 3, 4, 5, 6].map((n) => ({ value: String(n), label: `${n} adult${n > 1 ? "s" : ""}` }))}
        />
        <Button type="submit" className="h-[50px] sm:col-span-2 lg:col-span-1">
          Search flights
        </Button>
      </form>

      <Results
        searchId={searchId}
        count={results.length}
        summary={`${results.length} fares from ${fromCity} to ${toCity}, cheapest first`}
        empty="No flights found for this route. Try another destination."
      >
        {results.map((f) => (
          <ResultRow key={f.id}>
            <div className="flex items-center gap-5">
              <div className="w-32">
                <p className="font-semibold">{f.airline}</p>
                <p className="text-sm text-slate">{f.stops === 0 ? "Direct" : `${f.stops} stop`}</p>
              </div>
              <div className="flex items-center gap-3 font-display text-lg font-semibold">
                <span>{f.depart}</span>
                <span className="flex flex-col items-center text-xs font-normal text-slate">
                  {f.duration}
                  <span className="mt-1 h-px w-16 bg-line" />
                </span>
                <span>{f.arrive}</span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-5 sm:justify-end">
              <p className="font-display text-xl font-bold">{formatPKR(f.price)}</p>
              <HoldButton label="Hold fare" doneLabel="Held for 24 hours" />
            </div>
          </ResultRow>
        ))}
      </Results>
    </>
  );
}
