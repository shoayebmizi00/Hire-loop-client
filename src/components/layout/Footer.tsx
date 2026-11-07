
import Image from "next/image";
import Link from "next/link";

const footerGroups = [
  {
    title: "Product",
    links: [
      { name: "Job discovery", href: "/jobs" },
      { name: "Worker AI", href: "/worker-ai" },
      { name: "Companies", href: "/companies" },
      { name: "Salary data", href: "/salary-data" },
    ],
  },
  {
    title: "Navigations",
    links: [
      { name: "Help center", href: "/help" },
      { name: "Career library", href: "/career-library" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Brand Guideline", href: "/brand-guideline" },
      { name: "Newsroom", href: "/newsroom" },
    ],
  },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
        <path d="M13.5 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.5 1.6-1.5h1.7V3.1c-.3 0-1.4-.1-2.7-.1-2.7 0-4.5 1.6-4.5 4.7v1.9h-3v3.2h3V21z" />
      </svg>
    ),
  },
  {
    name: "Pinterest",
    href: "https://pinterest.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
        <path d="M12 2a10 10 0 0 0-3.64 19.32c-.09-.82-.17-2.08.04-2.98l1.3-5.52s-.33-.66-.33-1.63c0-1.53.89-2.67 2-2.67.94 0 1.4.71 1.4 1.57 0 .96-.61 2.4-.93 3.74-.26 1.12.56 2.03 1.66 2.03 1.99 0 3.52-2.1 3.52-5.13 0-2.68-1.93-4.55-4.68-4.55-3.19 0-5.06 2.39-5.06 4.86 0 .96.37 1.99.83 2.55.09.11.1.21.07.33l-.31 1.27c-.05.2-.16.24-.37.15-1.4-.65-2.28-2.7-2.28-4.34 0-3.53 2.57-6.77 7.42-6.77 3.89 0 6.92 2.77 6.92 6.47 0 3.86-2.43 6.96-5.8 6.96-1.13 0-2.2-.59-2.56-1.29l-.7 2.65c-.25.96-.94 2.16-1.4 2.89A10 10 0 1 0 12 2" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
        <path d="M5.2 3a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4M3.3 9h3.8v12H3.3zm6.2 0h3.6v1.6h.1A4 4 0 0 1 16.8 8c3.9 0 4.6 2.6 4.6 6v7h-3.8v-6.2c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3V21H9.5z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-[#030305] text-white">

      {/* Decorative background pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 opacity-70"
        style={{
          backgroundImage: `
            repeating-radial-gradient(
              ellipse at 50% -25%,
              transparent 0px,
              transparent 25px,
              rgba(100, 100, 150, 0.12) 26px,
              transparent 27px
            )
          `,
        }}
      />

      <div className="mx-auto container  px-5 pt-24 pb-8 sm:px-6 lg:pt-28">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[2.2fr_0.7fr_0.7fr_0.7fr] lg:gap-12">

          {/* Brand Section */}
          <div className="max-w-[280px]">
            <Link href="/" className="inline-flex">
              <Image
                src="/assets/logo.png"
                alt="HireLoop"
                width={130}
                height={45}
                className="h-auto w-[130px] object-contain"
              />
            </Link>

            <p className="mt-6 text-sm leading-[26px] text-[#55555d]">
              The AI-native career platform. Built for
              people who take their work seriously.
            </p>
          </div>

          {/* Footer Link Groups */}
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="mb-6 text-sm font-medium text-[#5146c9]">
                {group.title}
              </h3>

              <ul className="space-y-3.5">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#55555d] transition-colors duration-200 hover:text-white"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="mt-16 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            {socialLinks.map((social, index) => (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className={`flex size-[35px] items-center justify-center rounded-lg transition-colors ${
                  index === 1
                    ? "bg-[#3930a2] text-[#aaa2ff] hover:bg-[#5146c9]"
                    : "bg-[#101013] text-[#77777d] hover:bg-[#24242b] hover:text-white"
                }`}
              >
                {social.icon}
              </Link>
            ))}
          </div>

          {/* Copyright and Legal Links */}
          <div className="flex flex-col gap-3 text-sm text-[#55555d] sm:flex-row sm:items-center sm:gap-6">
            <p>
              All reserved © {new Date().getFullYear()} HireLoop. Made with ❤️ by{"Developer MIZI"}
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/terms"
                className="transition-colors hover:text-white"
              >
                Terms &amp; Policy
              </Link>

              <span>-</span>

              <Link
                href="/privacy"
                className="transition-colors hover:text-white"
              >
                Privacy Guideline
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
