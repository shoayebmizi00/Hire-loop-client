import { SpinnerCustom } from "@/app/loading";

// Shown while any dashboard route is pending (server components fetching data)
export default function DashboardLoading() {
  return <SpinnerCustom className="min-h-svh bg-black" />;
}
