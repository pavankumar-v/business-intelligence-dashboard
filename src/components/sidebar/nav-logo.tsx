import { useSidebar } from "@/components/ui/sidebar";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import logo from "@/assets/logo2.png";

const NavLogo = () => {
  const sidebar = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center mt-2 px-1">
        <img src={logo} alt="Logo" className="h-6 w-6" />
        {sidebar.state === "expanded" && (
          <span className="ml-2 font-semibold whitespace-nowrap">
            Business Intelligence
          </span>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavLogo;
