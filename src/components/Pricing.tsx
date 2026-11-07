"use client";

import { useState } from "react";
import { cn } from "cn";
import {
  ArrowRight,
  ChartNoAxesColumnIncreasing,
  Crown,
  Plus,
  Zap,
} from "lucide-react";

type Billing = "monthly" | "yearly";

type Plan = {
  name: string;
  icon: typeof Crown;
  iconClassName: string;
  monthly: string;
  yearly: string;
  featured?: boolean;
  features: string[];
};

const plans: Plan[] = [
  {
    name: "Starter",
    icon: Crown,
    iconClassName: "text-[#e879f9]",
    monthly: "$0",
    yearly: "$0",
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
  },
  {
    name: "Growth",
    icon: ChartNoAxesColumnIncreasing,
    iconClassName: "text-[#a78bfa]",
    monthly: "$17",
    yearly: "$13",
    featured: true,
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
  },
  {
    name: "Premium",
    icon: Zap,
    iconClassName: "text-[#a78bfa]",
    monthly: "$99",
    yearly: "$74",
    features: [
      "Everything in Pro",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
    ],
  },
];

export default function Pricing() {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <section className="relative bg-black px-5 pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-24">
      <div className="mx-auto w-full max-w-[1160px]">

        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3">
          <span aria-hidden="true" className="size-[7px] bg-[#3b5cf5]" />
          <span className="font-mono text-sm font-medium tracking-[0.25em] text-white">
            PRICING
          </span>
          <span aria-hidden="true" className="size-[7px] bg-[#3b5cf5]" />
        </div>

        {/* Heading */}
        <h2 className="mx-auto mt-6 max-w-[640px] text-center text-3xl font-semibold leading-[1.15] tracking-[-1.5px] text-white sm:text-4xl md:text-5xl">
          Pay for the leverage,
          <br />
          not the listings
        </h2>

        {/* Billing Toggle */}
        <div className="mt-10 flex justify-center sm:mt-12">
          <div className="flex items-center gap-1 rounded-full border border-[#262626] bg-[#141414] p-1.5">
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              aria-pressed={billing === "monthly"}
              className={cn(
                "rounded-full px-6 py-2 text-sm font-medium transition-colors",
                billing === "monthly"
                  ? "bg-white text-black"
                  : "text-[#9b9b9f] hover:text-white",
              )}
            >
              Monthly
            </button>

            <button
              type="button"
              onClick={() => setBilling("yearly")}
              aria-pressed={billing === "yearly"}
              className={cn(
                "flex items-center gap-2 rounded-full px-6 py-2 text-sm font-medium transition-colors",
                billing === "yearly"
                  ? "bg-white text-black"
                  : "text-[#9b9b9f] hover:text-white",
              )}
            >
              Yearly
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[11px] font-bold leading-none",
                  billing === "yearly"
                    ? "bg-[#f42a9d] text-white"
                    : "bg-[#f42a9d] text-white",
                )}
              >
                25%
              </span>
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:mt-7 lg:grid-cols-3">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const price = billing === "monthly" ? plan.monthly : plan.yearly;

            return (
              <div
                key={plan.name}
                className={cn(
                  "flex flex-col rounded-[16px] border p-5 transition-all duration-300 hover:-translate-y-1 sm:p-6",
                  plan.featured
                    ? "border-[#333333] bg-gradient-to-br from-[#141414] via-[#1a1a1a] to-[#212121]"
                    : "border-[#262626] bg-gradient-to-br from-[#080808] via-[#0d0d0d] to-[#151515]",
                )}
              >
                {/* Plan header */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-[10px] bg-[#1a1a1a]">
                      <Icon
                        className={cn("size-5", plan.iconClassName)}
                        strokeWidth={1.8}
                      />
                    </span>
                    <span className="truncate text-xl font-normal text-white sm:text-2xl">
                      {plan.name}
                    </span>
                  </div>

                  <div className="flex shrink-0 items-baseline gap-1">
                    <span className="text-3xl font-semibold tracking-[-1px] text-white sm:text-4xl">
                      {price}
                    </span>
                    <span className="text-sm text-[#8a8a8e]">/month</span>
                  </div>
                </div>

                {/* Feature intro */}
                <p className="mt-12 text-[15px] font-medium text-white">
                  Start building your insights hub:
                </p>

                {/* Features */}
                <ul className="mt-4 flex flex-col gap-3.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <span className="flex size-[22px] shrink-0 items-center justify-center rounded-md bg-[#1f1f1f]">
                        <Plus
                          className="size-3.5 text-[#d4d4d6]"
                          strokeWidth={2.5}
                        />
                      </span>
                      <span className="text-sm text-[#c9c9c9]">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  type="button"
                  className={cn(
                    "mt-15 flex h-11 w-full items-center justify-between rounded-[10px] px-5 text-[15px] font-medium transition-colors",
                    plan.featured
                      ? "bg-white text-black hover:bg-[#e9e9e9]"
                      : "bg-[#1f1f1f] text-white hover:bg-[#282828]",
                  )}
                >
                  Choose This Plan
                  <ArrowRight className="size-4" strokeWidth={2} />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
