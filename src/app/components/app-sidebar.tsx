import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Plus } from "lucide-react";

const MenuItemByRole = [
    {
        role: "admin",
        items: ["Dashboard", "Users", "Company", "Jobs", "Payment", "Settings"]
    },
    {
        role: "recruiter",
        items: ["Dashboard", "Manage Jobs", "Applications", "Settings"]
    },
    {
        role: "seeker",
        items: ["Dashboard", "Jobs", "Saved Jobs", "Applications","Billing", "Settings"]
    }
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupAction>
            <Plus /> <span className="sr-only">Add Project</span>
          </SidebarGroupAction>
          <SidebarGroupContent></SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
