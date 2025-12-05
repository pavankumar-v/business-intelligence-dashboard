import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import { Upload } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 bg-background flex w-full border-b h-14 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 z-50">
      <div className="w-full flex items-center justify-between gap-2 px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1 cursor-pointer" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
        </div>

        <div className="flex gap-2 items-center justify-between">
          <Button variant="safe">
            <Upload />
            Upload Transactions
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
