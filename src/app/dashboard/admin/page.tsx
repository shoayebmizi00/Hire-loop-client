import {
  Building2,
  Briefcase,
  DollarSign,
  Users,
  type LucideIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Stat = {
  label: string;
  value: string;
  icon: LucideIcon;
};

const stats: Stat[] = [
  { label: "Total Users", value: "1,240", icon: Users },
  { label: "Companies", value: "36", icon: Building2 },
  { label: "Active Jobs", value: "112", icon: Briefcase },
  { label: "Revenue (MTD)", value: "$8.4k", icon: DollarSign },
];

const adminDashboard = () => {
  return (
    <div className="mx-auto w-full max-w-6xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="size-[7px] bg-[#3b5cf5]" />
        <span className="font-mono text-[13px] font-medium tracking-[0.25em] text-white">
          ADMIN DASHBOARD
        </span>
        <span aria-hidden="true" className="size-[7px] bg-[#3b5cf5]" />
      </div>

      <h1 className="mt-4 text-3xl font-semibold tracking-[-1.5px] text-white sm:text-4xl">
        Platform overview
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-[#aaa9ad]">
        Monitor users, companies and platform-wide activity from one place.
      </p>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className="gap-3 rounded-2xl border-[#29292d] bg-linear-to-b from-[#080808] via-[#101010] to-[#1b1b1b] py-5"
          >
            <CardHeader className="flex-row items-center justify-between gap-2">
              <CardDescription>{stat.label}</CardDescription>
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#6052ff]/15 text-[#948aff]">
                <stat.icon className="size-4" />
              </span>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-2xl tracking-[-1px] text-white">
                {stat.value}
              </CardTitle>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default adminDashboard;
