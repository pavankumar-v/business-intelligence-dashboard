import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { type NavItemType } from "./app-sidebar";
import NavItem from "./nav-item";

export type NavItemProps = {
  items: NavItemType[];

  currentActive: string;
  setCurrentActive: React.Dispatch<React.SetStateAction<string>>;
};

export function NavMain({
  items,
  currentActive,
  setCurrentActive,
}: NavItemProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Application</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <NavItem
              key={item.title}
              item={item}
              currentActive={currentActive}
              setCurrentActive={setCurrentActive}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
      {/* <SidebarGroupLabel>Organization</SidebarGroupLabel> */}
    </SidebarGroup>
  );
}
