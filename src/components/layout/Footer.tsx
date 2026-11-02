import { Logo } from "./Logo";

const columns = [
  {
    title: "Services",
    links: [
      { label: "Visa services", href: "#search" },
      { label: "Flight tickets", href: "#search" },
      { label: "Hotel booking", href: "#search" },
      { label: "Car rental", href: "#search" },
    ],
  },
  {
    title: "Popular trips",
    links: [
      { label: "Dubai", href: "#destinations" },
      { label: "Istanbul", href: "#destinations" },
      { label: "Maldives", href: "#destinations" },
      { label: "London", href: "#destinations" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Reviews", href: "#reviews" },
      { label: "Contact", href: "#contact" },
      { label: "Terms of booking", href: "#top" },
      { label: "Privacy", href: "#top" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-sm">
          <Logo tone="light" />
          <p className="mt-5 leading-relaxed text-white/70">
            Visas, flights, hotels and cars for travellers from Pakistan, planned by one team that answers
            on WhatsApp.
          </p>
          <address className="mt-6 space-y-1.5 text-[15px] not-italic text-white/80">
            <p>Office 14, Saeed Plaza, Blue Area, Islamabad</p>
            <p>
              <a href="tel:+92511234567" className="hover:text-amber">+92 51 123 4567</a>
            </p>
            <p>
              <a href="mailto:hello@safarnama.pk" className="hover:text-amber">hello@safarnama.pk</a>
            </p>
          </address>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="font-display text-lg font-semibold">{col.title}</h3>
            <ul className="mt-4 space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-white/70 hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-sm text-white/55 sm:flex-row sm:justify-between sm:px-8">
          <p>© 2026 Safarnama Travel (Pvt) Ltd. Demo project with mock data.</p>
          <p>IATA-accredited agent no. 0000000 (sample)</p>
        </div>
      </div>
    </footer>
  );
}
