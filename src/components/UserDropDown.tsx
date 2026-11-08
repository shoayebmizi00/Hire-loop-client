"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  UserRound,
  LayoutDashboard,
  LogOut,
  ChevronDown,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function UserDropdown() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [isOpen, setIsOpen] = useState(false);

  // Loading
  if (isPending) {
    return (
      <div className="size-10 animate-pulse rounded-full bg-white/10" />
    );
  }

  // Not authenticated
  if (!session) {
    return (
      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          href="/signin"
          className="text-xs text-white transition hover:text-[#948aff] sm:text-sm"
        >
          Sign In
        </Link>

        <Link
          href="/signup"
          className="rounded-lg bg-[#6052ff] px-3 py-2 text-xs font-medium text-white transition hover:bg-[#756aff] sm:px-4 sm:text-sm"
        >
          Get Started
        </Link>
      </div>
    );
  }

  const user = session.user;

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error("Sign out failed");
      return;
    }

    toast.success("Successfully signed out!");

    setIsOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <div className="relative">
      {/* Dropdown Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open user menu"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="flex items-center gap-2 rounded-xl border border-white/15 bg-[#19191c] p-1.5 text-white transition hover:border-[#6052ff] sm:px-3 sm:py-2"
      >
        {/* Avatar */}
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#6052ff]">
          <UserRound className="size-4 sm:size-5" />
        </div>

        {/* Username: Hidden on mobile */}
        <span className="hidden max-w-28 truncate text-sm font-medium sm:block">
          {user.name || "My Account"}
        </span>

        <ChevronDown
          className={`hidden size-4 transition-transform sm:block ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Mobile backdrop */}
          <button
            type="button"
            aria-label="Close user menu"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 cursor-default bg-black/20 sm:hidden"
          />

          <div
            role="menu"
            className="
              absolute right-0 top-full z-50 mt-3
              w-[min(280px,calc(100vw-2rem))]
              overflow-hidden rounded-xl
              border border-[#333337]
              bg-[#111113] p-2 shadow-2xl
              sm:w-60
            "
          >
            {/* User Information */}
            <div className="border-b border-white/10 px-3 py-3">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#6052ff]">
                  <UserRound className="size-5 text-white" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">
                    {user.name || "My Account"}
                  </p>

                  <p className="truncate text-xs text-[#aaa9ad]">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Dashboard */}
            <Link
              href="/dashboard"
              role="menuitem"
              onClick={() => setIsOpen(false)}
              className="mt-2 flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-[#d1d1d5] transition hover:bg-white/10 hover:text-white"
            >
              <LayoutDashboard className="size-4 shrink-0" />
              Dashboard
            </Link>

            {/* My Profile */}
            <Link
              href="/profile"
              role="menuitem"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-[#d1d1d5] transition hover:bg-white/10 hover:text-white"
            >
              <UserRound className="size-4 shrink-0" />
              My Profile
            </Link>

            {/* Sign Out */}
            <button
              type="button"
              role="menuitem"
              onClick={handleSignOut}
              className="mt-2 flex w-full items-center gap-3 border-t border-white/10 px-3 py-3 text-sm text-red-400 transition hover:bg-red-500/10"
            >
              <LogOut className="size-4 shrink-0" />
              Sign Out
            </button>
          </div>
        </>
      )}
    </div>
  );
}