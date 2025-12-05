import { type NavItemType } from "./app-sidebar";
import { SidebarMenuItem } from "@/components/ui/sidebar";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const NavItem = ({
  item,
  currentActive,
}: {
  item: NavItemType;
  currentActive: string;
  setCurrentActive: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton
        disabled={item.comingSoon}
        className={cn(
          item.path.includes(currentActive) ? "bg-sidebar-accent" : "",
          item.comingSoon ? "opacity-65 pointer-events-none" : ""
        )}
      >
        <>
          {item.icon && <item.icon />}
          <span>{item.title}</span>
          {item.comingSoon && <Badge variant="outline">Coming Soon</Badge>}
        </>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default NavItem;
