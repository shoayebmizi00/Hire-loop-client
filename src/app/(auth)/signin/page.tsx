"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);

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

      {/* Sign In Card */}
      <div className="relative z-10 w-full max-w-110 rounded-2xl border border-[#333337] bg-[#111113]/90 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.4)] backdrop-blur-sm sm:p-10">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3">
          <span aria-hidden="true" className="size-1.75 bg-[#3b5cf5]" />
          <span className="font-mono text-[13px] font-medium tracking-[0.25em] text-white">
            SIGN IN
          </span>
          <span aria-hidden="true" className="size-1.75 bg-[#3b5cf5]" />
        </div>

        {/* Heading */}
        <h1 className="mt-4 text-center text-3xl font-semibold tracking-[-1.5px] text-white sm:text-4xl">
          Welcome back
        </h1>

        <p className="mt-3 text-center text-sm text-[#aaa9ad]">
          Sign in to continue your search — your next role is already looking
          for you.
        </p>

        {/* Social Sign In */}
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
            Continue with Google
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
            Continue with GitHub
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

        {/* Sign In Form */}
        <form
          className="flex flex-col gap-4"
          onSubmit={async (event) => {
            // TODO: wire up better-auth credentials sign-in
            event.preventDefault();
            const formData = new FormData(event.currentTarget);

            const email = formData.get("email") as string;
            const password = formData.get("password") as string;
            const rememberMe = formData.get("remember") === "on";

            const { data, error } = await authClient.signIn.email({
              email,
              password,
              rememberMe,
              callbackURL: "/",
            });
            if (error) {
              console.error("Sign in error:", error);

              toast.error("Sign in failed", {
                description: "Please check your credentials and try again.",
              });
            } else {
              console.log("Sign in successful:", data);

              toast.success("Sign in successful!", {
                description: "Welcome back!",
              });
            }
          }}
        >
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
              placeholder="Password"
              autoComplete="current-password"
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

          {/* Remember / Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex cursor-pointer select-none items-center gap-2.5 text-sm text-[#aaa9ad]">
              <input
                type="checkbox"
                name="remember"
                className="size-4 accent-[#6052ff]"
              />
              Remember me
            </label>

            <button
              type="button"
              className="text-sm text-[#7165ff] transition-colors hover:text-[#948aff]"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="h-12 w-full rounded-xl bg-[#6052ff] text-sm font-medium text-white shadow-none transition-colors hover:bg-[#756aff]"
          >
            Sign In
          </Button>
        </form>

        {/* Switch to Sign Up */}
        <p className="mt-8 text-center text-sm text-[#aaa9ad]">
          New to HireLoop?{" "}
          <Link
            href="/signup"
            className="font-medium text-[#7165ff] transition-colors hover:text-[#948aff]"
          >
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
}
