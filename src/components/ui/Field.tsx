import type { InputHTMLAttributes, SelectHTMLAttributes, ReactNode } from "react";

const control =
  "mt-1.5 w-full rounded-xl border border-line bg-white px-3.5 py-3 text-[15px] text-ink outline-none transition-colors focus:border-ink";

type LabelProps = { label: string; children: ReactNode; className?: string };

export function FieldLabel({ label, children, className = "" }: LabelProps) {
  return (
    <label className={`block text-sm font-medium text-slate ${className}`}>
      {label}
      {children}
    </label>
  );
}

export function Input({
  label,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <FieldLabel label={label} className={className}>
      <input className={control} {...props} />
    </FieldLabel>
  );
}

export function Select({
  label,
  className,
  options,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: { value: string; label: string }[];
}) {
  return (
    <FieldLabel label={label} className={className}>
      <span className="relative block">
        <select className={`${control} appearance-none pr-10`} {...props}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
        </select>
        <svg viewBox="0 0 12 12" aria-hidden="true" className="pointer-events-none absolute top-1/2 right-4 mt-[3px] size-3 -translate-y-1/2 text-slate">
          <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </span>
    </FieldLabel>
  );
}
