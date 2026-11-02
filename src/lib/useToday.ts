"use client";

import { useEffect, useState } from "react";

/** Today's date as YYYY-MM-DD, read after mount so the static prerender stays stable. */
export function useToday() {
  const [today, setToday] = useState<string | undefined>(undefined);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToday(new Date().toISOString().slice(0, 10));
  }, []);
  return today;
}
