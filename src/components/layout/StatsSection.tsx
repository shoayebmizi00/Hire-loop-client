
import {
  BriefcaseBusiness,
  ChartNoAxesColumnIncreasing,
  UsersRound,
  Star,
} from "lucide-react";

const stats = [
  {
    value: "50K",
    label: "Active Jobs",
    icon: BriefcaseBusiness,
  },
  {
    value: "12K",
    label: "Companies",
    icon: ChartNoAxesColumnIncreasing,
  },
  {
    value: "2M",
    label: "Job Seekers",
    icon: UsersRound,
  },
  {
    value: "97%",
    label: "Satisfaction Rate",
    icon: Star,
  },
];

export default function StatsSection() {
  return (
    <section className="relative min-h-162.5 bg-transparent px-5 py-20 sm:min-h-170 sm:px-8">
      {/* Content */}
      <div className="mx-auto container">

        {/* Heading */}
        <div className="relative z-10 mx-auto max-w-162.5 pt-8 text-center sm:pt-16">
          <h2 className="text-2xl font-normal leading-[1.35] tracking-[-1px] text-[#c7c5db] sm:text-3xl md:text-[34px]">
            Assisting over{" "}
            <span className="text-white">15,000 job seekers</span>
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            find their dream positions.
          </h2>
        </div>

        {/* Statistics Cards */}
        <div className="relative z-20 mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4 lg:gap-5">

          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="group flex min-h-47.5 flex-col justify-between rounded-[14px] border border-[#29292d] bg-linear-to-br from-[#080808] via-[#101010] to-[#1b1b1b] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#5146c9]/60 sm:min-h-50 sm:p-6 lg:h-54"
              >
                {/* Icon */}
                <div>
                  <Icon
                    className="size-4.75 text-white transition-colors group-hover:text-[#8b80ff]"
                    strokeWidth={1.8}
                  />
                </div>

                {/* Statistic */}
                <div>
                  <h3 className="text-[42px] font-medium leading-none tracking-[-1.5px] text-white sm:text-5xl">
                    {stat.value}
                  </h3>

                  <p className="mt-5 text-sm font-normal text-white">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
