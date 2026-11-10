"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Globe,
  MapPin,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "cn";
import { createJob } from "@/lib/actions/jobs";

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"] as const;

const JOB_CATEGORIES = [
  "Engineering & Tech",
  "Design",
  "Marketing",
  "Finance",
  "Operations",
];

const PAY_FREQUENCIES = ["per hour", "per day", "per month", "per year"];

/** Numbered section card: header with purple dot + divider, then content. */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="gap-0 rounded-2xl border-[#1e1e24] bg-[#101013] py-0">
      <CardHeader className="flex-row items-center gap-2.5 border-b border-[#1c1c21] px-6 py-5">
        <span
          aria-hidden="true"
          className="size-1.5 shrink-0 rounded-full bg-[#6052ff]"
        />
        <CardTitle className="text-[15px] font-semibold text-white">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 px-6 py-6">{children}</CardContent>
    </Card>
  );
}

export default function AddJobPage() {
  const router = useRouter();
  const [jobType, setJobType] =
    useState<(typeof JOB_TYPES)[number]>("Full-time");
  const [isRemote, setIsRemote] = useState(true);

  return (
    <form
      className="mx-auto w-full max-w-4xl pb-10"
      onSubmit={async (event) => {
        event.preventDefault();

        const result = await createJob(new FormData(event.currentTarget));

        if (result.success) {
          toast.success("Job posted!", {
            description: "Your listing is now live.",
          });
          router.push("/dashboard/recruiter/manage-jobs");
        } else {
          toast.error("Failed to post job", {
            description: "Please check the fields and try again.",
          });
        }
      }}
    >
      {/* Segmented buttons + Switch live in state, so carry them in the form data */}
      <input type="hidden" name="jobType" value={jobType} />
      <input type="hidden" name="isRemote" value={isRemote ? "true" : "false"} />
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-[#8f8f96]">
            <Link
              href="/dashboard/recruiter/manage-jobs"
              className="transition-colors hover:text-[#aaa9ad]"
            >
              Manage Jobs
            </Link>
            <span aria-hidden="true">{">"}</span>
            <span>Create New Listing</span>
          </div>

          <h1 className="mt-2 text-2xl font-semibold tracking-[-1px] text-white sm:text-3xl">
            Post a New Job
          </h1>
          <p className="mt-2 text-sm text-[#8f8f96]">
            Fill in the position specifications to attract qualified talent
            across our network.
          </p>
        </div>

        <Button
          type="submit"
          className="h-11 rounded-xl bg-[#6052ff] px-5 text-sm font-medium text-white shadow-[0_0_28px_rgba(96,82,255,0.35)] hover:bg-[#756aff]"
        >
          Publish Job
          <ArrowRight className="ml-1.5 size-4" />
        </Button>
      </div>

      {/* Sections */}
      <div className="mt-8 flex flex-col gap-7">
        {/* 1. Basic Information */}
        <Section title="1. Basic Information">
          {/* Job Title */}
          <div>
            <Label htmlFor="job-title" className="mb-2 text-white">
              Job Title <span className="text-[#aaa9ad]">*</span>
            </Label>
            <Input
              id="job-title"
              name="title"
              required
              placeholder="Frontend Developer"
              className="h-11 rounded-[10px] border-[#303034] bg-[#19191c] px-4 text-white placeholder:text-[#8f8f96] focus-visible:border-[#6052ff] focus-visible:ring-[#6052ff]/20"
            />
          </div>

          {/* Company Name + Job Category */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="job-company" className="mb-2 text-white">
                Company Name <span className="text-[#aaa9ad]">*</span>
              </Label>
              <div className="relative">
                <Building2 className="pointer-events-none absolute top-1/2 left-3.5 size-4.5 -translate-y-1/2 text-[#aaa9ad]" />
                <Input
                  id="job-company"
                  name="company"
                  required
                  placeholder="HirePulse Network"
                  className="h-11 rounded-[10px] border-[#303034] bg-[#19191c] pr-4 pl-10.5 text-white placeholder:text-[#8f8f96] focus-visible:border-[#6052ff] focus-visible:ring-[#6052ff]/20"
                />
              </div>
            </div>
            <div>
              <Label className="mb-2 text-white">
                Job Category <span className="text-[#aaa9ad]">*</span>
              </Label>
              <Select name="category" defaultValue={JOB_CATEGORIES[0]}>
                <SelectTrigger
                  className="w-full rounded-[10px] border-[#303034] bg-[#19191c] px-4 text-white focus-visible:border-[#6052ff] focus-visible:ring-[#6052ff]/20 data-[size=default]:h-11 hover:text-white"
                  aria-label="Job Category"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {JOB_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Job Type */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Label className="text-white">
                Job Type <span className="text-[#aaa9ad]">*</span>
              </Label>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {JOB_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  aria-pressed={jobType === type}
                  onClick={() => setJobType(type)}
                  className={cn(
                    "h-11 rounded-[10px] border text-sm font-medium transition-colors",
                    jobType === type
                      ? "border-[#6052ff] bg-[#6052ff]/10 text-white"
                      : "border-[#26262b] bg-[#0b0b0e] text-[#8f8f96] hover:border-[#3a3a41] hover:text-[#b4b4ba]"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </Section>

        {/* 2. Location, Compensation & Timeline */}
        <Section title="2. Location, Compensation & Timeline">
          {/* Remote toggle */}
          <div className="flex items-center gap-3 rounded-[10px] border border-[#26262b] bg-[#0b0b0e] p-3.5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#1c1c22] text-[#aaa9ad]">
              <Globe className="size-4.5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-white">
                Remote Work Allowed (isRemote)
              </p>
              <p className="mt-0.5 truncate text-xs text-[#8f8f96]">
                Enable worldwide or distributed candidate applications
              </p>
            </div>
            {/* White thumb on a dark track, like the reference */}
            <Switch
              checked={isRemote}
              onCheckedChange={setIsRemote}
              aria-label="Remote Work Allowed"
              className="data-[size=default]:h-5! data-[size=default]:w-9! data-unchecked:bg-[#26262b]! data-checked:bg-[#19191c]! border-[#303034] [&_[data-slot=switch-thumb]]:bg-white!"
            />
          </div>

          {/* Job Location + Application Deadline */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <Label htmlFor="job-location" className="text-white">
                  Job Location (location)
                </Label>
                <span className="text-[11px] text-[#8f8f96]">Required</span>
              </div>
              <div className="relative">
                <MapPin className="pointer-events-none absolute top-1/2 left-3.5 size-4.5 -translate-y-1/2 text-[#aaa9ad]" />
                <Input
                  id="job-location"
                  name="location"
                  placeholder="New York, USA"
                  className="h-11 rounded-[10px] border-[#303034] bg-[#19191c] pr-4 pl-10.5 text-white placeholder:text-[#8f8f96] focus-visible:border-[#6052ff] focus-visible:ring-[#6052ff]/20"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="job-deadline" className="mb-2 text-white">
                Application Deadline (deadline)
              </Label>
              <div className="relative">
                <CalendarDays className="pointer-events-none absolute top-1/2 left-3.5 size-4.5 -translate-y-1/2 text-[#aaa9ad]" />
                <Input
                  id="job-deadline"
                  name="deadline"
                  type="date"
                  className="h-11 rounded-[10px] border-[#303034] bg-[#19191c] pr-4 pl-10.5 text-white focus-visible:border-[#6052ff] focus-visible:ring-[#6052ff]/20 [color-scheme:dark]"
                />
              </div>
            </div>
          </div>

          {/* Salary + Frequency */}
          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <Label htmlFor="job-min-salary" className="mb-2 text-white">
                Min Salary / Rate
              </Label>
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 left-3.5 text-sm text-[#8f8f96]"
                >
                  €
                </span>
                <Input
                  id="job-min-salary"
                  name="minSalary"
                  type="number"
                  placeholder="25"
                  className="h-11 rounded-[10px] border-[#303034] bg-[#19191c] pr-4 pl-8 text-white placeholder:text-[#8f8f96] focus-visible:border-[#6052ff] focus-visible:ring-[#6052ff]/20"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="job-max-salary" className="mb-2 text-white">
                Max Salary / Rate
              </Label>
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 left-3.5 text-sm text-[#8f8f96]"
                >
                  €
                </span>
                <Input
                  id="job-max-salary"
                  name="maxSalary"
                  type="number"
                  placeholder="40"
                  className="h-11 rounded-[10px] border-[#303034] bg-[#19191c] pr-4 pl-8 text-white placeholder:text-[#8f8f96] focus-visible:border-[#6052ff] focus-visible:ring-[#6052ff]/20"
                />
              </div>
            </div>
            <div>
              <Label className="mb-2 text-white">Frequency</Label>
              <Select name="payFrequency" defaultValue={PAY_FREQUENCIES[0]}>
                <SelectTrigger
                  className="w-full rounded-[10px] border-[#303034] bg-[#19191c] px-4 text-white focus-visible:border-[#6052ff] focus-visible:ring-[#6052ff]/20 data-[size=default]:h-11 hover:text-white"
                  aria-label="Frequency"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PAY_FREQUENCIES.map((frequency) => (
                    <SelectItem key={frequency} value={frequency}>
                      {frequency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Section>

        {/* 3. Responsibilities & Requirements */}
        <Section title="3. Responsibilities & Requirements">
          <div>
            <Label htmlFor="job-responsibilities" className="mb-2 text-white">
              Key Responsibilities <span className="text-[#aaa9ad]">*</span>
            </Label>
            <Textarea
              id="job-responsibilities"
              name="responsibilities"
              required
              rows={4}
              defaultValue="Showcase your commitment to delivering exceptional user interfaces and digital experiences. You will collaborate directly with systems designers and backend engineers to craft responsive, micro-interaction rich products."
              className="min-h-28 rounded-[10px] border-[#303034] bg-[#19191c] px-4 py-3 leading-relaxed text-white placeholder:text-[#8f8f96] focus-visible:border-[#6052ff] focus-visible:ring-[#6052ff]/20"
            />
          </div>
          <div>
            <Label htmlFor="job-qualifications" className="mb-2 text-white">
              Qualifications & Requirements{" "}
              <span className="text-[#aaa9ad]">*</span>
            </Label>
            <Textarea
              id="job-qualifications"
              name="qualifications"
              required
              rows={4}
              defaultValue={
                "• 3+ years of experience with React, TypeScript, and modern state architectures\n" +
                "• Solid understanding of DOM performance and component-driven designs\n" +
                "• Experience partnering closely with product teams and UI/UX designers"
              }
              className="min-h-28 rounded-[10px] border-[#303034] bg-[#19191c] px-4 py-3 leading-relaxed text-white placeholder:text-[#8f8f96] focus-visible:border-[#6052ff] focus-visible:ring-[#6052ff]/20"
            />
          </div>
        </Section>
      </div>
    </form>
  );
}
