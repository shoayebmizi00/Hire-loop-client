
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserDropdown from "../UserDropDown";

const navLinks = [
  { name: "Browse Jobs", href: "/jobs" },
  { name: "Company", href: "/company" },
  { name: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-black py-4.25">
      <nav className="mx-auto flex h-16 container items-center justify-between rounded-2xl bg-[#1e1e1e] px-5 sm:px-6">

        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/assets/logo.png"
            alt="HireLoop"
            width={130}
            height={45}
            priority
            className="h-auto w-32.5 object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[13px] font-normal text-white transition-colors hover:text-gray-400"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="h-5 w-px bg-[#444444]" />

          {/* Authentication */}
         <UserDropdown />
        </div>

        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen(!isOpen)}
          className="text-white hover:bg-[#303030] hover:text-white md:hidden"
        >
          {isOpen ? (
            <X className="size-5" />
          ) : (
            <Menu className="size-5" />
          )}
        </Button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div
          id="mobile-navigation"
          className="mx-auto mt-2 max-w-280 rounded-2xl bg-[#1e1e1e] p-5 md:hidden"
        >
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm text-white transition-colors hover:text-[#7165ff]"
              >
                {link.name}
              </Link>
            ))}

            <div className="h-px w-full bg-[#444444]" />

            <UserDropdown />
          </div>
        </div>
      )}
    </header>
  );
}
