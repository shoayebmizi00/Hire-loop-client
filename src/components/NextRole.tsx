import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NextRole() {
  return (
    <section className="relative isolate flex min-h-128 w-full items-center justify-center overflow-hidden bg-black px-5 py-20 sm:px-8">
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 bg-contain bg-center bg-no-repeat container mx-auto"
        style={{
          backgroundImage: "url('/assets/cta-bg.png')",
        }}
        aria-hidden="true"
      />

      {/* Blue / Purple glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(79,70,229,0.85)_0%,rgba(67,56,202,0.55)_35%,rgba(30,27,75,0.2)_60%,transparent_80%)]"
        aria-hidden="true"
      />

      {/* Dark overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-linear-to-b from-transparent via-black/20 to-black/90"
        aria-hidden="true"
      />

      {/* Hero content */}
      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
          Your next role is
          <br />
          already looking for you
        </h1>

        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
          Build a profile in three minutes. The matches start arriving tomorrow
          morning.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button className="h-12 rounded-xl border border-white bg-white px-6 text-sm font-medium text-[#101019] shadow-none transition-colors hover:bg-white/90 hover:text-[#101019]">
            <Link href="/signup">Create a free account</Link>
          </Button>

          <Button
            variant="outline"
            className="h-12 rounded-xl border-white/20 bg-[#111019]/90 px-6 text-sm font-medium text-white shadow-none transition-colors hover:border-white/40 hover:bg-[#1b1925] hover:text-white"
          >
            <Link href="/pricing">View pricing</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
