import * as React from "react";
import { NavMain } from "./nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { DualToneDashboardIcon } from "@/components/icons/main";
import { useState } from "react";
import NavLogo from "./nav-logo";

export type NavItemType = {
  title: string;
  path: string[];
  comingSoon?: boolean;
  icon: React.ComponentType<{ className?: string }>;
};

const useNavItems = () => {
  const defaultItems: NavItemType[] = [
    {
      title: "Dashboard",
      path: ["/dashboard", "/"],
      icon: DualToneDashboardIcon,
      comingSoon: false,
    },
  ];

  return defaultItems;
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeItem, setActiveItem] = useState<string>(location.pathname);
  const items = useNavItems();

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* head */}
      <SidebarHeader>
        <NavLogo />
      </SidebarHeader>

      {/* links */}
      <SidebarContent>
        <NavMain
          items={items}
          currentActive={activeItem}
          setCurrentActive={setActiveItem}
        />
      </SidebarContent>

      {/* footer */}
      <SidebarFooter>
        <div className="text-sm text-muted-foreground">© 2025 BI</div>
      </SidebarFooter>

      {/* rail */}
      <SidebarRail />
    </Sidebar>
  );
}
