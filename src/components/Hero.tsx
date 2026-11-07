
import Link from "next/link";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
];

export default function Hero() {
  return (
    <section className="relative min-h-145 bg-transparent">

      {/* Hero Content */}
      <div className="mx-auto flex container flex-col items-center px-5 pt-36.25 pb-36.25 text-center sm:px-6">

        {/* Job Count Badge */}
        <div className="relative mb-7 flex items-center justify-center">

          {/* Horizontal lines */}
          <div className="absolute right-full top-1/2 h-px w-12 bg-linear-to-l from-[#38304e] to-transparent sm:w-14" />

          <div className="flex items-center gap-3 rounded-full border border-[#29292d] bg-[#111113]/90 px-5 py-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">

            <span className="text-lg">💼</span>

            <span className="font-mono text-sm font-bold tracking-wide text-white">
              50,000+
            </span>

            <span className="whitespace-nowrap font-mono text-sm text-[#85858a]">
              NEW JOBS THIS MONTH
            </span>
          </div>

          <div className="absolute left-full top-1/2 h-px w-12 bg-linear-to-r from-[#38304e] to-transparent sm:w-14" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-semibold tracking-[-1.5px] text-white sm:text-4xl md:text-5xl">
          Find Your Dream Job Today
        </h1>

        {/* Description */}
        <p className="mt-4 max-w-162 text-sm leading-6.75 text-[#aaa9ad] sm:text-base">
          HireLoop connects top talent with world-class companies.
          Browse thousands of curated opportunities and land your next
          role — faster.
        </p>

        {/* Search Form */}
        <form
          action="/jobs"
          method="GET"
          className="mt-10 flex w-full max-w-166.5 flex-col gap-3 rounded-2xl border border-[#333337] bg-[#111113] p-2 sm:h-13.75 sm:flex-row sm:items-center sm:gap-0 sm:rounded-[14px] sm:p-1.5"
        >

          {/* Job Search */}
          <div className="flex min-w-0 flex-1 items-center gap-2.5 px-3">
            <Search className="size-5 shrink-0 text-white" />

            <input
              type="text"
              name="title"
              placeholder="Job title, skill or company"
              aria-label="Job title, skill or company"
              className="h-10 w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-[#aaa9ad]"
            />
          </div>

          {/* Divider */}
          <div className="hidden h-5 w-px bg-[#39393d] sm:block" />

          {/* Location Search */}
          <div className="flex min-w-0 flex-1 items-center gap-2.5 px-3">
            <MapPin className="size-5 shrink-0 text-white" />

            <input
              type="text"
              name="location"
              placeholder="Location or Remote"
              aria-label="Location or Remote"
              className="h-10 w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-[#aaa9ad]"
            />
          </div>

          {/* Search Button */}
          <Button
            type="submit"
            size="icon"
            aria-label="Search jobs"
            className="size-10 shrink-0 self-end rounded-xl bg-[#6052ff] text-white shadow-none transition-colors hover:bg-[#756aff] sm:self-auto"
          >
            <Search className="size-5" />
          </Button>
        </form>

        {/* Trending Positions */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">

          <span className="mr-1 text-sm text-[#aaa9ad]">
            Trending Position
          </span>

          {trendingPositions.map((position) => (
            <Link
              key={position}
              href={`/jobs?title=${encodeURIComponent(position)}`}
              className="rounded-full border border-[#303034] bg-[#19191c] px-3 py-1.5 text-xs text-[#e0e0e3] transition-all duration-200 hover:border-[#6052ff] hover:bg-[#25213c]"
            >
              {position}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
