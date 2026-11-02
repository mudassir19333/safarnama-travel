"use client";

import { useState, type FormEvent } from "react";
import { visas, formatPKR, type VisaInfo } from "@/data/travel";
import { Select } from "../ui/Field";
import { Button } from "../ui/Button";
import { Results } from "./Results";
import { HoldButton } from "./HoldButton";

export function VisaSearch() {
  const [country, setCountry] = useState(visas[0].country);
  const [travellers, setTravellers] = useState("1");
  const [result, setResult] = useState<VisaInfo | null>(null);
  const [count, setCount] = useState(1);
  const [searchId, setSearchId] = useState(0);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setResult(visas.find((v) => v.country === country) ?? null);
    setCount(Number(travellers));
    setSearchId((n) => n + 1);
  };

  return (
    <>
      <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1.4fr_0.8fr_auto] lg:items-end">
        <Select label="Passport" value="PK" onChange={() => {}} options={[{ value: "PK", label: "Pakistan" }]} />
        <Select
          label="Travelling to"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          options={visas.map((v) => ({ value: v.country, label: v.country }))}
        />
        <Select
          label="Travellers"
          value={travellers}
          onChange={(e) => setTravellers(e.target.value)}
          options={[1, 2, 3, 4, 5, 6].map((n) => ({ value: String(n), label: String(n) }))}
        />
        <Button type="submit" className="h-[50px] sm:col-span-2 lg:col-span-1">
          Check requirements
        </Button>
      </form>

      <Results
        searchId={searchId}
        count={result ? 1 : 0}
        summary={`Visa for Pakistani passport holders travelling to ${result?.country}`}
        empty="We don't have details for this country yet."
      >
        {result && (
          <li data-result className="grid gap-6 rounded-2xl border border-line p-5 md:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="font-display text-xl font-semibold">{result.type}</p>
              <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                <dt className="text-slate">Processing</dt>
                <dd className="font-medium">{result.processing}</dd>
                <dt className="text-slate">Validity</dt>
                <dd className="font-medium">{result.validity}</dd>
                <dt className="text-slate">Fee with service</dt>
                <dd className="font-medium">
                  {formatPKR(result.fee * count)}
                  {count > 1 && result.fee > 0 && <span className="text-slate"> for {count}</span>}
                </dd>
              </dl>
            </div>
            <div>
              <p className="text-sm font-medium text-slate">Documents you will need</p>
              <ul className="mt-3 space-y-2">
                {result.documents.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-[15px]">
                    <svg viewBox="0 0 20 20" className="mt-0.5 size-5 shrink-0 text-pine" aria-hidden="true">
                      <circle cx="10" cy="10" r="9" fill="currentColor" opacity=".12" />
                      <path d="M6 10.2l2.6 2.6L14 7.4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                    {d}
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <HoldButton label="Start my application" doneLabel="We'll message you on WhatsApp" />
              </div>
            </div>
          </li>
        )}
      </Results>
    </>
  );
}
