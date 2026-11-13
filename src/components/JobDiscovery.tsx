import Link from "next/link";
import { ArrowRight, Briefcase, Euro, MapPin } from "lucide-react";
import { getJobs, type Job } from "@/lib/actions/jobs";

// Turns the salary numbers into a short chip text like "€ 25-40/hour"
function formatSalary(job: Job) {
  if (job.minSalary === null && job.maxSalary === null) return null;

  const min = job.minSalary ?? job.maxSalary;
  const max = job.maxSalary ?? job.minSalary;
  // "per hour" -> "hour"
  const frequency = job.payFrequency.replace(/^per\s+/, "") || "hour";

  return `€ ${min}-${max}/${frequency}`;
}

export default async function JobDiscovery() {
  // Real jobs from the Express backend (hire-loop-server), newest first
  const jobs = await getJobs();
  const visibleJobs = jobs.slice(0, 6);

  return (
    <section className="relative bg-black px-5 pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-24">
      <div className="mx-auto w-full max-w-290">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3">
          <span aria-hidden="true" className="size-1.75 bg-[#3b5cf5]" />
          <span className="font-mono text-sm font-medium tracking-[0.25em] text-white">
            SMART JOB DISCOVERY
          </span>
          <span aria-hidden="true" className="size-1.75 bg-[#3b5cf5]" />
        </div>

        {/* Heading */}
        <h2 className="mx-auto mt-6 max-w-160 text-center text-3xl font-semibold leading-[1.15] tracking-[-1.5px] text-white sm:text-4xl md:text-5xl">
          The roles you&apos;d never
          <br />
          find by searching
        </h2>

        {/* Job cards */}
        {visibleJobs.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
            {visibleJobs.map((job) => {
              const salary = formatSalary(job);
              const description = job.responsibilities || job.qualifications;

              return (
                <div
                  key={job.id}
                  className="flex flex-col rounded-2xl border border-[#232326] bg-[#141416] p-6 transition-colors hover:border-[#333337]"
                >
                  {/* Job title */}
                  <h3 className="text-xl font-semibold tracking-[-0.5px] text-white sm:text-2xl">
                    {job.title}
                  </h3>

                  {/* Short description */}
                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[#9b9b9f]">
                    {description}
                  </p>

                  {/* Info chips */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {job.location && (
                      <span className="flex items-center gap-1.5 rounded-full bg-[#1c1c1f] px-3 py-1.5 text-xs font-medium text-white">
                        <MapPin
                          className="size-3.5 text-[#e879f9]"
                          strokeWidth={2.2}
                        />
                        {job.location}
                      </span>
                    )}

                    {job.jobType && (
                      <span className="flex items-center gap-1.5 rounded-full bg-[#1c1c1f] px-3 py-1.5 text-xs font-medium text-white">
                        <Briefcase
                          className="size-3.5 text-[#e879f9]"
                          strokeWidth={2.2}
                        />
                        {job.jobType}
                      </span>
                    )}

                    {salary && (
                      <span className="flex items-center gap-1.5 rounded-full bg-[#1c1c1f] px-3 py-1.5 text-xs font-medium text-white">
                        <Euro
                          className="size-3.5 text-[#e879f9]"
                          strokeWidth={2.2}
                        />
                        {salary}
                      </span>
                    )}
                  </div>

                  {/* Apply */}
                  <Link
                    href="/dashboard/seeker"
                    className="mt-auto flex items-center gap-1.5 pt-8 text-sm font-medium text-white transition-colors hover:text-[#948aff]"
                  >
                    Apply Now
                    <ArrowRight className="size-4" strokeWidth={2} />
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="mt-10 text-center text-sm text-[#9b9b9f]">
            No jobs have been posted yet. Check back soon!
          </p>
        )}

        {/* View all button */}
        {visibleJobs.length > 0 && (
          <div className="mt-12 flex justify-center">
            <Link
              href="/dashboard/seeker"
              className="flex h-11 items-center rounded-lg bg-white px-5 text-sm font-medium text-black transition-colors hover:bg-[#e9e9e9]"
            >
              View all job open
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
