import Link from "next/link";
import {
  Bug,
  Briefcase,
  Code2,
  Globe,
  MapPin,
  Megaphone,
  Palette,
  Server,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getJobs } from "@/lib/actions/jobs";
import { JobRowActions } from "./job-actions";

// pick an icon + color for the category chip (fallback: Briefcase)
function categoryChip(category: string): { icon: LucideIcon; color: string } {
  if (category.includes("Engineering")) return { icon: Code2, color: "text-[#9b8cff] bg-[#6052ff]/15" };
  if (category.includes("Design")) return { icon: Palette, color: "text-[#f59e0b] bg-[#f59e0b]/10" };
  if (category.includes("Marketing")) return { icon: Megaphone, color: "text-[#f472b6] bg-[#f472b6]/10" };
  if (category.toLowerCase().includes("infra")) return { icon: Server, color: "text-[#60a5fa] bg-[#60a5fa]/10" };
  if (category.toLowerCase().includes("qualit")) return { icon: Bug, color: "text-[#a1a1aa] bg-[#a1a1aa]/10" };
  return { icon: Briefcase, color: "text-[#9b8cff] bg-[#6052ff]/15" };
}

// "€90k" for big yearly numbers, "€25" for hourly ones
function formatSalary(n: number) {
  if (n >= 1000) return `€${Math.round(n / 1000)}k`;
  return `€${n}`;
}

// "per hour" -> "hr", "per year" -> "yr", ...
function shortFrequency(payFrequency: string) {
  if (payFrequency === "per hour") return "hr";
  if (payFrequency === "per year") return "yr";
  if (payFrequency === "per month") return "mo";
  if (payFrequency === "per day") return "day";
  return payFrequency;
}

// "2025-05-30" -> "May 30, 2025"
function formatDate(deadline: string) {
  if (!deadline) return "—";
  return new Date(deadline).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// "Posted 3d ago" / "Posted today"
function postedAgo(createdAt: string) {
  const days = Math.floor(
    (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24)
  );
  if (days < 1) return "Posted today";
  return `Posted ${days}d ago`;
}

// expired when the deadline is in the past
function isExpired(deadline: string) {
  if (!deadline) return true;
  return new Date(deadline).getTime() < Date.now();
}

const ManageJobs = async () => {
  const jobs = await getJobs();

  return (
    <div className="mx-auto w-full max-w-6xl pb-10">
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
            <span>Job Listings &amp; Postings</span>
          </div>

          <h1 className="mt-2 text-2xl font-semibold tracking-[-1px] text-white sm:text-3xl">
            Manage Job Posts
          </h1>
          <p className="mt-2 text-sm text-[#8f8f96]">
            Review live listings, monitor applicants, and update job details
            across your organization.
          </p>
        </div>

        <Button
          render={<Link href="/dashboard/recruiter/add-jobs" />}
          className="h-11 rounded-xl bg-[#6052ff] px-5 text-sm font-medium text-white shadow-[0_0_28px_rgba(96,82,255,0.35)] hover:bg-[#756aff]"
        >
          + New Job Post
        </Button>
      </div>

      {/* Table card (scrolls horizontally on narrow screens) */}
      <div className="mt-8 overflow-x-auto rounded-2xl border border-[#1e1e24] bg-[#101013]">
        {/* Table head */}
        <div className="grid min-w-[1120px] grid-cols-[minmax(180px,1.4fr)_minmax(160px,1.2fr)_90px_minmax(120px,1fr)_minmax(110px,0.9fr)_90px_minmax(140px,1fr)_minmax(150px,1.1fr)] items-center gap-3 border-b border-[#1c1c21] px-5 py-3.5 font-mono text-[10.5px] tracking-[0.08em] text-[#8f8f96] uppercase">
          <span>Job Title &amp; Dept</span>
          <span>Company &amp; Location</span>
          <span>Type</span>
          <span>Compensation</span>
          <span>Applicants</span>
          <span>Status</span>
          <span>Deadline</span>
          <span className="text-right">Actions</span>
        </div>

        {jobs.length === 0 ? (
          // Empty state
          <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
            <Briefcase className="size-8 text-[#3a3a41]" />
            <p className="text-sm font-medium text-white">No job posts yet</p>
            <p className="max-w-xs text-xs text-[#8f8f96]">
              Create your first listing and it will show up here with live
              applicant tracking.
            </p>
            <Button
              render={<Link href="/dashboard/recruiter/add-jobs" />}
              className="mt-1 h-10 rounded-xl bg-[#6052ff] px-4 text-sm font-medium text-white hover:bg-[#756aff]"
            >
              + New Job Post
            </Button>
          </div>
        ) : (
          jobs.map((job) => {
            const chip = categoryChip(job.category);
            const expired = isExpired(job.deadline);

            return (
              <div
                key={job.id}
                className="grid min-w-[1120px] grid-cols-[minmax(180px,1.4fr)_minmax(160px,1.2fr)_90px_minmax(120px,1fr)_minmax(110px,0.9fr)_90px_minmax(140px,1fr)_minmax(150px,1.1fr)] items-center gap-3 border-b border-[#1c1c21] px-5 py-3.5 transition-colors last:border-b-0 hover:bg-white/[0.02]"
              >
                {/* Job title & dept */}
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${chip.color}`}
                  >
                    <chip.icon className="size-4.5" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {job.title}
                    </p>
                    <p className="truncate text-xs text-[#8f8f96]">
                      {job.category}
                    </p>
                  </div>
                </div>

                {/* Company & location */}
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">
                    {job.company}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1.5 truncate text-xs text-[#8f8f96]">
                    {job.isRemote ? (
                      <Globe className="size-3.5 shrink-0" />
                    ) : (
                      <MapPin className="size-3.5 shrink-0" />
                    )}
                    <span className="truncate">
                      {job.isRemote
                        ? `Remote${job.location ? ` (${job.location})` : ""}`
                        : job.location || "—"}
                    </span>
                  </p>
                </div>

                {/* Type */}
                <span className="w-fit rounded-md bg-[#1c1c22] px-2 py-1 text-[11px] font-medium text-[#b4b4ba]">
                  {job.jobType}
                </span>

                {/* Compensation */}
                <span className="truncate text-sm text-white">
                  {job.minSalary !== null && job.maxSalary !== null
                    ? `${formatSalary(job.minSalary)} – ${formatSalary(job.maxSalary)} / ${shortFrequency(job.payFrequency)}`
                    : "—"}
                </span>

                {/* Applicants (no applications feature yet, so 0 for now) */}
                <span className="flex items-center gap-1.5 truncate text-sm text-white">
                  <Users className="size-4 shrink-0 text-[#8f8f96]" />
                  0 Candidates
                </span>

                {/* Status */}
                <span
                  className={`flex w-fit items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-medium ${
                    expired
                      ? "bg-[#a1a1aa]/10 text-[#a1a1aa]"
                      : "bg-[#4ade80]/10 text-[#4ade80]"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`size-1.5 rounded-full ${
                      expired ? "bg-[#a1a1aa]" : "bg-[#4ade80]"
                    }`}
                  />
                  {expired ? "Expired" : "Active"}
                </span>

                {/* Deadline */}
                <div className="min-w-0">
                  <p className="truncate text-sm text-white">
                    {formatDate(job.deadline)}
                  </p>
                  <p className="truncate text-xs text-[#8f8f96]">
                    {postedAgo(job.createdAt)}
                  </p>
                </div>

                {/* Actions (edit / delete dialogs + kebab menu) */}
                <div className="flex items-center justify-end gap-1.5">
                  <JobRowActions job={job} />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ManageJobs;
