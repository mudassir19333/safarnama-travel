"use client";

import { useRef, useState, type FormEvent } from "react";
import { services } from "@/data/travel";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { Input, Select, FieldLabel } from "../ui/Field";
import { Button } from "../ui/Button";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";

type Errors = Partial<Record<"name" | "phone" | "email" | "message", string>>;

function validate(data: FormData): Errors {
  const errors: Errors = {};
  const name = String(data.get("name") ?? "").trim();
  const phone = String(data.get("phone") ?? "").replace(/[\s-]/g, "");
  const email = String(data.get("email") ?? "").trim();
  const message = String(data.get("message") ?? "").trim();
  if (name.length < 2) errors.name = "Enter your full name.";
  if (!/^(\+92|0)3\d{9}$/.test(phone)) errors.phone = "Enter a Pakistani mobile number, like 0300 1234567.";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Check the email address.";
  if (message.length < 10) errors.message = "Tell us a little about the trip (10+ characters).";
  return errors;
}

export function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const doneRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sentTo || !doneRef.current || prefersReducedMotion()) return;
      gsap.from(doneRef.current, { scale: 0.94, autoAlpha: 0, duration: 0.5, ease: "back.out(1.6)" });
    },
    { dependencies: [sentTo] },
  );

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) return;
    // No backend: simulate a short network round trip.
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSentTo(String(data.get("name")).split(" ")[0]);
    }, 900);
  };

  return (
    <section id="contact" className="scroll-mt-20 bg-fog py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            title="Tell us where you want to go"
            intro="A travel adviser replies within an hour, 10am to 8pm, Monday to Saturday."
          />
          <Reveal className="mt-10 space-y-6">
            <ContactLine label="WhatsApp" value="+92 300 123 4567" href="https://wa.me/923001234567" />
            <ContactLine label="Call the office" value="+92 51 123 4567" href="tel:+92511234567" />
            <ContactLine label="Email" value="hello@safarnama.pk" href="mailto:hello@safarnama.pk" />
            <ContactLine label="Visit" value="Office 14, Saeed Plaza, Blue Area, Islamabad" />
          </Reveal>
        </div>

        <Reveal className="rounded-[28px] bg-white p-6 shadow-[0_20px_60px_-35px_rgba(18,35,61,0.4)] sm:p-9">
          {sentTo ? (
            <div ref={doneRef} className="flex min-h-[420px] flex-col items-center justify-center text-center" role="status">
              <span className="grid size-16 place-items-center rounded-full bg-pine/10 text-pine">
                <svg viewBox="0 0 24 24" className="size-8" aria-hidden="true">
                  <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              </span>
              <h3 className="mt-6 font-display text-3xl font-bold">Request sent</h3>
              <p className="mt-3 max-w-sm text-slate">
                Thanks, {sentTo}. An adviser will message you on WhatsApp within the hour with options and prices.
              </p>
              <Button variant="outline" className="mt-8" onClick={() => setSentTo(null)}>
                Send another request
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
              <Field error={errors.name}>
                <Input label="Full name" name="name" autoComplete="name" aria-invalid={!!errors.name} />
              </Field>
              <Field error={errors.phone}>
                <Input label="Mobile / WhatsApp" name="phone" type="tel" autoComplete="tel" placeholder="0300 1234567" aria-invalid={!!errors.phone} />
              </Field>
              <Field error={errors.email}>
                <Input label="Email (optional)" name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} />
              </Field>
              <Select
                label="I need help with"
                name="service"
                defaultValue="visa"
                options={[...services.map((s) => ({ value: s.key, label: s.title })), { value: "all", label: "A complete trip" }]}
              />
              <Field error={errors.message} className="sm:col-span-2">
                <FieldLabel label="Trip details">
                  <textarea
                    name="message"
                    rows={5}
                    aria-invalid={!!errors.message}
                    placeholder="Where to, roughly when, and how many travellers"
                    className="mt-1.5 w-full resize-y rounded-xl border border-line bg-white px-3.5 py-3 text-[15px] text-ink outline-none focus:border-ink"
                  />
                </FieldLabel>
              </Field>
              <div className="sm:col-span-2">
                <Button type="submit" variant="dark" disabled={sending} className="w-full sm:w-auto">
                  {sending ? "Sending…" : "Send request"}
                </Button>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Field({ error, className = "", children }: { error?: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      {children}
      {error && <p className="mt-1.5 text-sm font-medium text-red-700">{error}</p>}
    </div>
  );
}

function ContactLine({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="border-b border-line pb-5">
      <p className="text-sm text-slate">{label}</p>
      {href ? (
        <a href={href} className="mt-1 block font-display text-xl font-semibold hover:text-amber-dark">
          {value}
        </a>
      ) : (
        <p className="mt-1 font-display text-xl font-semibold">{value}</p>
      )}
    </div>
  );
}
