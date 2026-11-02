import { Reveal } from "./Reveal";

type Props = {
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
};

export function SectionHeading({ title, intro, align = "left", tone = "dark" }: Props) {
  const centered = align === "center";
  return (
    <Reveal className={`max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
      <h2
        className={`font-display text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl ${
          tone === "light" ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            tone === "light" ? "text-white/75" : "text-slate"
          }`}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
