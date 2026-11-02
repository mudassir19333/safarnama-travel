"use client";

import { useState } from "react";

/** Mock "hold" action: nothing is booked, the button just confirms the choice. */
export function HoldButton({ label, doneLabel }: { label: string; doneLabel: string }) {
  const [held, setHeld] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setHeld(true)}
      disabled={held}
      className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
        held ? "bg-pine/10 text-pine" : "bg-ink text-white hover:bg-ink/90"
      }`}
    >
      {held ? doneLabel : label}
    </button>
  );
}
