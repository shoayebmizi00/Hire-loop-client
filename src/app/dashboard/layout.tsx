import { AppSidebar } from "@/app/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-h-svh overflow-hidden bg-black">
        <header className="flex items-center gap-3 border-b border-[#333337] bg-[#111113] px-4 py-2.5">
          <SidebarTrigger className="text-white hover:bg-white/10 hover:text-white" />
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
