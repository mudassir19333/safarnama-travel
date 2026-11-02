import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

const styles = {
  primary:
    "bg-amber text-ink hover:bg-amber-dark",
  dark: "bg-ink text-white hover:bg-ink/90",
  outline: "border border-line text-ink hover:border-ink",
} as const;

type Variant = keyof typeof styles;

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60";

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={`${base} ${styles[variant]} ${className}`} {...props} />;
}

export function LinkButton({
  variant = "primary",
  className = "",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant }) {
  return <a className={`${base} ${styles[variant]} ${className}`} {...props} />;
}
