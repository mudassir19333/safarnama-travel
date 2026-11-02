export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <a href="#top" className="flex items-center gap-2.5" aria-label="Safarnama Travel home">
      <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="15" fill="var(--color-amber)" />
        <path
          d="M9 19.5l13.5-8.2c1-.6 2.2.6 1.5 1.6L18 21l-1.4 4.4-1.9-3.6L11 22z"
          fill="var(--color-ink)"
        />
      </svg>
      <span
        className={`font-display text-xl font-bold tracking-tight ${
          tone === "light" ? "text-white" : "text-ink"
        }`}
      >
        Safarnama
      </span>
    </a>
  );
}
