import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-svh items-center justify-center overflow-hidden bg-black px-5 py-24">
      {/* Shared Globe Background */}
      {/* `fill` images get inline left/top/width/height, so centering must come from this wrapper */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <Image
          src="/assets/globe.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-80"
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

      {/* 404 Card */}
      <div className="relative z-10 w-full max-w-110 rounded-2xl border border-[#333337] bg-[#111113]/90 p-6 text-center shadow-[0_4px_20px_rgba(0,0,0,0.4)] backdrop-blur-sm sm:p-10">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3">
          <span aria-hidden="true" className="size-[7px] bg-[#3b5cf5]" />
          <span className="font-mono text-[13px] font-medium tracking-[0.25em] text-white">
            404
          </span>
          <span aria-hidden="true" className="size-[7px] bg-[#3b5cf5]" />
        </div>

        {/* Heading */}
        <h1 className="mt-4 text-3xl font-semibold tracking-[-1.5px] text-white sm:text-4xl">
          Page not found
        </h1>

        <p className="mt-3 text-sm text-[#aaa9ad]">
          Could not find the requested resource — the page may have been
          moved or never existed.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            render={<Link href="/" />}
            className="h-11 rounded-xl bg-[#6052ff] px-5 text-sm font-medium text-white hover:bg-[#756aff]"
          >
            Back to Home
          </Button>
          <Button
            render={<Link href="/dashboard/seeker" />}
            className="h-11 rounded-xl border border-[#2e2e35] bg-[#0f0f12] px-5 text-sm font-medium text-white hover:border-white/30 hover:bg-[#1b1925]"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </section>
  );
}
