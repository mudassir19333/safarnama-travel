import { testimonials } from "@/data/travel";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";

export function Testimonials() {
  const [featured, ...rest] = testimonials;
  return (
    <section id="reviews" className="scroll-mt-20 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          title="What travellers told us after they got home"
          intro="Rated 4.9 out of 5 from 1,800+ Google reviews."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-[1.25fr_1fr] lg:items-start">
          <Reveal className="flex flex-col justify-between gap-10 rounded-[28px] bg-amber p-8 sm:p-12 lg:min-h-[440px]">
            <blockquote>
              <p className="font-display text-2xl leading-snug font-semibold tracking-tight sm:text-[2.1rem] sm:leading-[1.2]">
                “{featured.quote}”
              </p>
            </blockquote>
            <Person {...featured} />
          </Reveal>
          <Reveal stagger className="grid gap-6">
            {rest.map((t) => (
              <figure key={t.name} className="rounded-[28px] border border-line p-6 sm:p-7">
                <blockquote>
                  <p className="leading-relaxed text-ink/85">“{t.quote}”</p>
                </blockquote>
                <Person {...t} />
              </figure>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Person({ name, city, trip }: { name: string; city: string; trip: string }) {
  const initials = name
    .split(/[\s&]+/)
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  return (
    <figcaption className="mt-6 flex items-center gap-3">
      <span className="grid size-11 place-items-center rounded-full bg-ink font-semibold text-white">
        {initials}
      </span>
      <span>
        <span className="block font-semibold">{name}</span>
        <span className="block text-sm text-ink/70">
          {trip}, from {city}
        </span>
      </span>
    </figcaption>
  );
}
