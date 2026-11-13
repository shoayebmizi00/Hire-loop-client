
import Hero from "@/components/Hero";
import StatsSection from "@/components/layout/StatsSection";
import NextRole from "@/components/NextRole";
import Pricing from "@/components/Pricing";
import JobDiscovery from "@/components/JobDiscovery";
import Image from "next/image";

// JobDiscovery reads live jobs from the API on every request — without this
// the landing page would be prerendered at build with an empty jobs list.
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main>
      {/* Shared Hero + Stats Background */}
      <div className="relative isolate overflow-hidden bg-black">

        {/* Shared Globe Background */}
        {/* `fill` images get inline left/top/width/height, so centering must come from this wrapper */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 -top-80 z-0 h-full w-full container -translate-x-1/2"
        >
          <Image
            src="/assets/globe.png"
            alt="globe"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top opacity-80"
          />
        </div>

        {/* Purple Globe Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 65% 45% at 50% 55%, rgba(77, 57, 255, 0.24), transparent 75%)",
          }}
        />

        {/* Hero and Stats */}
        <div className="relative z-10">
          <Hero />
          <StatsSection />
        </div>

      </div>
      <JobDiscovery />
      <Pricing />
      <NextRole />
    </main>
  );
}
