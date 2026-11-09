"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  UserRound,
  UserSearch,
  BriefcaseBusiness,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("seeker");
  // NEW: Prevent multiple signup requests
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <section className="relative isolate flex min-h-[75svh] items-center justify-center overflow-hidden bg-black px-5 py-24">
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

      {/* Sign Up Card */}
      <div className="relative z-10 w-full max-w-110 rounded-2xl border border-[#333337] bg-[#111113]/90 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.4)] backdrop-blur-sm sm:p-10">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3">
          <span aria-hidden="true" className="size-1.75 bg-[#3b5cf5]" />
          <span className="font-mono text-[13px] font-medium tracking-[0.25em] text-white">
            CREATE ACCOUNT
          </span>
          <span aria-hidden="true" className="size-1.75 bg-[#3b5cf5]" />
        </div>

        {/* Heading */}
        <h1 className="mt-4 text-center text-3xl font-semibold tracking-[-1.5px] text-white sm:text-4xl">
          Create your account
        </h1>

        <p className="mt-3 text-center text-sm text-[#aaa9ad]">
          Build a profile in three minutes. The matches start arriving tomorrow
          morning.
        </p>

        {/* Social Sign Up */}
        <div className="mt-8 flex flex-col gap-3">
          <button
            type="button"
            className="flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-white text-sm font-medium text-[#101019] transition-colors hover:bg-white/90"
          >
            {/* Google logo */}
            <svg
              aria-hidden="true"
              className="size-5"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.25-4.53 6.16-4.53z"
              />
              <path
                fill="#4285F4"
                d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58l3.58 2.78c2.07-1.92 3.44-4.74 3.44-8.6z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09L2.18 7.07C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.58-2.78c-.98.66-2.23 1.06-3.7 1.06-2.98 0-5.4-2-6.25-4.72l-3.66 2.84c1.81 3.6 5.53 6.26 9.91 6.26z"
              />
            </svg>
            Sign up with Google
          </button>

          <button
            type="button"
            className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-white/15 bg-[#0f0f12] text-sm font-medium text-white transition-colors hover:border-white/30 hover:bg-[#1b1925]"
          >
            {/* GitHub logo */}
            <svg
              aria-hidden="true"
              className="size-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            Sign up with GitHub
          </button>
        </div>

        {/* Divider */}
        <div className="my-7 flex items-center gap-4">
          <span className="h-px flex-1 bg-[#38304e]" />
          <span className="font-mono text-xs tracking-[0.25em] text-[#85858a]">
            OR
          </span>
          <span className="h-px flex-1 bg-[#38304e]" />
        </div>

        {/* Role Selection */}
        <div className="mb-2">
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                value: "seeker",
                label: "Seeker",
                description: "Find jobs",
                icon: UserSearch,
              },
              {
                value: "recruiter",
                label: "Recruiter",
                description: "Hire talent",
                icon: BriefcaseBusiness,
              },
              {
                value: "admin",
                label: "Admin",
                description: "Manage app",
                icon: ShieldCheck,
              },
            ].map((role) => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.value;

              return (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => setSelectedRole(role.value)}
                  className={`flex flex-col items-center gap-2 rounded-xl border p-3 transition-all ${
                    isSelected
                      ? "border-[#6052ff] bg-[#6052ff]/15 text-white"
                      : "border-[#303034] bg-[#19191c] text-[#aaa9ad] hover:border-white/30"
                  }`}
                >
                  <Icon
                    className={`size-6 ${
                      isSelected ? "text-[#8b80ff]" : "text-[#aaa9ad]"
                    }`}
                  />

                  <span className="text-sm font-medium">{role.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sign Up Form */}
        <form
          className="flex flex-col gap-4"
          onSubmit={async (event) => {
            event.preventDefault();

            if (isSubmitting) return;

            setIsSubmitting(true);

            try {
              const formData = new FormData(event.currentTarget);

              const name = (formData.get("name") as string).trim();
              const email = (formData.get("email") as string)
                .trim()
                .toLowerCase();
              const password = formData.get("password") as string;
              const role = selectedRole;

              const { data, error } = await authClient.signUp.email({
                name,
                email,
                password,
                role,
                callbackURL: "/signin",
              });

              if (error) {
                console.error("Sign up error:", error);

                // NEW: Detect an existing account
                const errorCode = error.code?.toUpperCase();
                const errorMessage = error.message?.toLowerCase() || "";

                const accountExists =
                  errorCode === "USER_ALREADY_EXISTS" ||
                  errorCode === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL" ||
                  errorMessage.includes("already exists");

                if (accountExists) {
                  // NEW: Specific duplicate account message
                  toast.error("Account already exists!", {
                    description:
                      "This email is already registered. Please sign in instead.",
                    action: {
                      label: "Sign In",
                      onClick: () => {
                        redirect("/signin");
                      },
                    },
                  });

                  return;
                }

                // Other errors
                toast.error("Sign up failed", {
                  description: error.message || "Please try again.",
                });

                return;
              }

              console.log("Sign up successful:", data);

              toast.success("Account created successfully!", {
                description: "Welcome! Please sign in to continue.",
              });
            } catch (err) {
              console.error("Unexpected signup error:", err);

              toast.error("Something went wrong", {
                description: "Please try again later.",
              });
            } finally {
              setIsSubmitting(false);
            }
          }}
        >
          {/* Full Name */}
          <div className="flex items-center gap-2.5 rounded-xl border border-[#303034] bg-[#19191c] px-4 transition-colors focus-within:border-[#6052ff]">
            <UserRound className="size-5 shrink-0 text-white" />
            <input
              type="text"
              name="name"
              placeholder="Full name"
              autoComplete="name"
              required
              aria-label="Full name"
              className="h-12 w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-[#aaa9ad]"
            />
          </div>

          {/* Email */}
          <div className="flex items-center gap-2.5 rounded-xl border border-[#303034] bg-[#19191c] px-4 transition-colors focus-within:border-[#6052ff]">
            <Mail className="size-5 shrink-0 text-white" />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              autoComplete="email"
              required
              aria-label="Email address"
              className="h-12 w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-[#aaa9ad]"
            />
          </div>

          {/* Password */}
          <div className="flex items-center gap-2.5 rounded-xl border border-[#303034] bg-[#19191c] px-4 transition-colors focus-within:border-[#6052ff]">
            <Lock className="size-5 shrink-0 text-white" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password (min. 8 characters)"
              autoComplete="new-password"
              minLength={8}
              required
              aria-label="Password"
              className="h-12 w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-[#aaa9ad]"
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((show) => !show)}
              className="shrink-0 text-[#aaa9ad] transition-colors hover:text-white"
            >
              {showPassword ? (
                <EyeOff className="size-5" />
              ) : (
                <Eye className="size-5" />
              )}
            </button>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="h-12 w-full rounded-xl bg-[#6052ff] text-sm font-medium text-white shadow-none transition-colors hover:bg-[#756aff]"
          >
            Create Account
          </Button>
        </form>

        {/* Terms Note */}
        <p className="mt-5 text-center text-xs leading-relaxed text-[#85858a]">
          By creating an account, you agree to our{" "}
          <a
            href="#"
            className="text-[#aaa9ad] underline underline-offset-2 transition-colors hover:text-white"
          >
            Terms &amp; Policy
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="text-[#aaa9ad] underline underline-offset-2 transition-colors hover:text-white"
          >
            Privacy Guideline
          </a>
          .
        </p>

        {/* Switch to Sign In */}
        <p className="mt-4 text-center text-sm text-[#aaa9ad]">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-medium text-[#7165ff] transition-colors hover:text-[#948aff]"
          >
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}
