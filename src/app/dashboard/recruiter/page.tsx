import Link from "next/link";
import { headers } from "next/headers";
import {
  CircleCheck,
  FileText,
  Plus,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { auth } from "@/lib/atuh";
import { getJobs } from "@/lib/actions/jobs";

// read fresh data on every request (jobs come from the API with no-store)
export const dynamic = "force-dynamic";

type Stat = {
  label: string;
  value: number;
  icon: LucideIcon;
};

// Applications don't exist in the API yet — demo text, replace with real
// data when the applications feature is built.
type Application = {
  name: string;
  role: string;
  appliedAt: string;
  experience: string;
  status: "Interviewing" | "New" | "Reviewing" | "Rejected";
};

const DEMO_APPLICATIONS: Application[] = [
  { name: "Julianne Moore", role: "Senior Product Designer", appliedAt: "Oct 24, 2023", experience: "6 years", status: "Interviewing" },
  { name: "Robert Downey", role: "Backend Engineer", appliedAt: "Oct 23, 2023", experience: "4 years", status: "New" },
  { name: "Emma Stone", role: "Marketing Lead", appliedAt: "Oct 22, 2023", experience: "8 years", status: "Reviewing" },
  { name: "Chris Pratt", role: "Product Manager", appliedAt: "Oct 21, 2023", experience: "5 years", status: "Rejected" },
];

const STATUS_STYLES: Record<Application["status"], string> = {
  Interviewing: "bg-[#8b5cf6]/15 text-[#a78bfa]",
  New: "bg-[#3b82f6]/15 text-[#60a5fa]",
  Reviewing: "bg-[#f59e0b]/15 text-[#f59e0b]",
  Rejected: "bg-[#ef4444]/15 text-[#f87171]",
};

// "Chris" -> "C", "Julianne Moore" -> "JM"
function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const recruiterDashboard = async () => {
  // signed-in user for the "Welcome back, …" heading
  const session = await auth.api.getSession({ headers: await headers() });
  const name = session?.user?.name ?? "Recruiter";

  // stats from the real jobs data
  const jobs = await getJobs();
  const now = Date.now();
  const activeJobs = jobs.filter(
    (job) => job.deadline && new Date(job.deadline).getTime() >= now
  );

  const stats: Stat[] = [
    { label: "Total Job Posts", value: jobs.length, icon: FileText },
    { label: "Total Applicants", value: 0, icon: Users }, // no applications yet
    { label: "Active Jobs", value: activeJobs.length, icon: Zap },
    {
      label: "Jobs Closed",
      value: jobs.length - activeJobs.length, // past deadline = closed
      icon: CircleCheck,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl pb-10">
      {/* Welcome */}
      <h1 className="text-2xl font-semibold tracking-[-1px] text-white sm:text-3xl">
        Welcome back, {name}
      </h1>

      {/* Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-[#1e1e24] bg-[#101013] p-5"
          >
            <span className="flex size-10 items-center justify-center rounded-lg bg-[#1c1c22] text-[#948aff]">
              <stat.icon className="size-5" />
            </span>
            <p className="mt-4 text-sm text-[#8f8f96]">{stat.label}</p>
            <p className="mt-1 text-3xl font-semibold tracking-[-1px] text-white">
              {stat.value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Applications */}
      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-[-1px] text-white">
          Recent Applications
        </h2>
        <Link
          href="/dashboard/recruiter/applications"
          className="text-sm text-[#8f8f96] transition-colors hover:text-white"
        >
          View all
        </Link>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-[#1e1e24] bg-[#101013]">
        {/* Table head */}
        <div className="grid grid-cols-[minmax(160px,1.4fr)_minmax(140px,1.2fr)_minmax(110px,1fr)_90px_110px] items-center gap-3 border-b border-[#1c1c21] px-5 py-3.5 font-mono text-[10.5px] tracking-[0.08em] text-[#8f8f96] uppercase">
          <span>Candidate Name</span>
          <span>Role</span>
          <span>Date Applied</span>
          <span>Experience</span>
          <span>Status</span>
        </div>

        {/* Table rows (demo data for now) */}
        {DEMO_APPLICATIONS.map((application) => (
          <div
            key={application.name}
            className="grid grid-cols-[minmax(160px,1.4fr)_minmax(140px,1.2fr)_minmax(110px,1fr)_90px_110px] items-center gap-3 border-b border-[#1c1c21] px-5 py-3.5 transition-colors last:border-b-0 hover:bg-white/[0.02]"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#3b5cf5] to-[#6052ff] text-[11px] font-semibold text-white">
                {initials(application.name)}
              </span>
              <p className="truncate text-sm font-medium text-white">
                {application.name}
              </p>
            </div>
            <p className="truncate text-sm text-[#b4b4ba]">{application.role}</p>
            <p className="truncate text-sm text-[#b4b4ba]">
              {application.appliedAt}
            </p>
            <p className="truncate text-sm text-[#b4b4ba]">
              {application.experience}
            </p>
            <span
              className={`w-fit rounded-full px-2.5 py-1 text-[11px] font-medium ${STATUS_STYLES[application.status]}`}
            >
              {application.status}
            </span>
          </div>
        ))}
      </div>

      {/* Floating action button: new job post */}
      <Link
        href="/dashboard/recruiter/add-jobs"
        aria-label="New job post"
        className="fixed right-6 bottom-6 z-20 flex size-14 items-center justify-center rounded-full bg-white text-black shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-transform hover:scale-105"
      >
        <Plus className="size-6" />
      </Link>
    </div>
  );
};

export default recruiterDashboard;
