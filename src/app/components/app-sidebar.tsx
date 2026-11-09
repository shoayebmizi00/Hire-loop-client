"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Bookmark,
  Briefcase,
  Building2,
  CreditCard,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { signOut, useSession } from "@/lib/auth-client";
import { cn } from "cn";

type Role = "seeker" | "recruiter" | "admin";

type MenuItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const MENU_ITEMS_BY_ROLE: Record<Role, MenuItem[]> = {
  admin: [
    { label: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
    { label: "Users", href: "/dashboard/admin/users", icon: Users },
    { label: "Companies", href: "/dashboard/admin/company", icon: Building2 },
    { label: "Jobs", href: "/dashboard/admin/jobs", icon: Briefcase },
    { label: "Payments", href: "/dashboard/admin/payment", icon: CreditCard },
    { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
  ],
  recruiter: [
    { label: "Dashboard", href: "/dashboard/recruiter", icon: LayoutDashboard },
    { label: "Manage Jobs", href: "/dashboard/recruiter/manage-jobs", icon: Briefcase },
    { label: "Applications", href: "/dashboard/recruiter/applications", icon: FileText },
    { label: "Settings", href: "/dashboard/recruiter/settings", icon: Settings },
  ],
  seeker: [
    { label: "Dashboard", href: "/dashboard/seeker", icon: LayoutDashboard },
    { label: "Jobs", href: "/dashboard/seeker/jobs", icon: Briefcase },
    { label: "Saved Jobs", href: "/dashboard/seeker/saved-jobs", icon: Bookmark },
    { label: "Applications", href: "/dashboard/seeker/applications", icon: FileText },
    { label: "Billing", href: "/dashboard/seeker/billing", icon: CreditCard },
    { label: "Settings", href: "/dashboard/seeker/settings", icon: Settings },
  ],
};

/** Label shown under the logo ("Admin Console", …). */
const ROLE_TITLE: Record<Role, string> = {
  admin: "Admin Console",
  recruiter: "Recruiter Console",
  seeker: "Seeker Console",
};

/** Subtitle shown in the footer user card. */
const ROLE_SUBTITLE: Record<Role, string> = {
  admin: "Super Admin",
  recruiter: "Recruiter",
  seeker: "Seeker",
};

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const user = session?.user;
  const name = user?.name ?? "Guest User";
  const email = user?.email ?? "—";

  // Session role wins; otherwise infer from the visited dashboard section.
  const sessionRole = user?.role;
  const pathRole: Role = pathname.startsWith("/dashboard/admin")
    ? "admin"
    : pathname.startsWith("/dashboard/recruiter")
      ? "recruiter"
      : "seeker";
  const role: Role =
    sessionRole === "admin" || sessionRole === "recruiter"
      ? sessionRole
      : pathRole;

  const items = MENU_ITEMS_BY_ROLE[role];

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    // Near-black sidebar + subtle active row, like the dashboard reference UI
    <Sidebar className="[--sidebar:#0b0b0e] [--sidebar-border:transparent] [--sidebar-foreground:#b4b4ba] [--sidebar-accent:#1c1c22] [--sidebar-accent-foreground:#ffffff] [--sidebar-ring:#6052ff]">
      {/* Logo + Console title */}
      <SidebarHeader className="p-3 pb-1">
        <Link href="/" className="flex w-fit items-center px-2 py-2">
          <Image
            src="/assets/logo.png"
            alt="HireLoop"
            width={154}
            height={44}
            priority
          />
        </Link>
        <p className="px-2 text-sm font-medium text-[#8f8f96]">
          {ROLE_TITLE[role]}
        </p>
      </SidebarHeader>

      {/* Role-based navigation */}
      <SidebarContent className="px-0 pt-4">
        <SidebarGroup className="p-2">
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5">
              {items.map((item) => {
                const active =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      isActive={active}
                      render={<Link href={item.href} />}
                      className={cn(
                        "h-10 gap-3 rounded-lg px-3 text-sm font-medium data-active:font-semibold",
                        active
                          ? "text-white"
                          : "text-[#b4b4ba] hover:text-white"
                      )}
                    >
                      {/* Active indicator at the row's left edge */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute top-1/2 left-0 h-5 w-[3px] -translate-y-1/2 rounded-full bg-[#6052ff] transition-opacity",
                          active ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <item.icon className="size-4.5! shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User card + Logout */}
      <SidebarFooter className="p-3">
        <div className="flex items-center gap-2.5 rounded-xl border border-[#26262b] bg-[#131317] p-2.5">
          {/* Avatar: user photo when available, initials fallback */}
          {user?.image ? (
            <Image
              src={user.image}
              alt=""
              width={32}
              height={32}
              className="size-8 shrink-0 rounded-full object-cover"
            />
          ) : (
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#3b5cf5] to-[#6052ff] text-[11px] font-semibold text-white">
              {initials(name)}
            </span>
          )}

          <div
            title={`${name}${user?.email ? ` · ${email}` : ""}`}
            className="min-w-0 flex-1"
          >
            <p className="truncate text-sm font-semibold text-white">{name}</p>
            <p className="truncate text-xs text-[#8f8f96]">
              {ROLE_SUBTITLE[role]}
            </p>
          </div>

          <button
            type="button"
            aria-label="Log out"
            title="Log out"
            onClick={handleSignOut}
            className="shrink-0 rounded-lg p-2 text-[#8f8f96] transition-colors hover:bg-white/5 hover:text-white"
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
