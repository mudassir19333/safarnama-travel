import type { ServiceKey } from "@/data/travel";

const paths: Record<ServiceKey, React.ReactNode> = {
  flights: <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />,
  hotels: (
    <>
      <path d="M3 20V5a1 1 0 011-1h9a1 1 0 011 1v15" />
      <path d="M14 10h6a1 1 0 011 1v9M2 20h20M7 8h3M7 12h3M7 16h3M17 14h1M17 17h1" />
    </>
  ),
  visa: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <circle cx="12" cy="10" r="3.2" />
      <path d="M9 16h6" />
    </>
  ),
  cars: (
    <>
      <path d="M4 16v-4l2-5a2 2 0 012-1.3h8a2 2 0 012 1.3l2 5v4" />
      <path d="M3 16h18v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-1H7v1a1 1 0 01-1 1H4a1 1 0 01-1-1zM4 12h16" />
      <circle cx="7.5" cy="14" r=".6" />
      <circle cx="16.5" cy="14" r=".6" />
    </>
  ),
};

export function ServiceIcon({ name, className = "size-6" }: { name: ServiceKey; className?: string }) {
  const filled = name === "flights";
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}
