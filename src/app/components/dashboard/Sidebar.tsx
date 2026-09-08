import { LogoutButton } from "./LogoutButton";
import { SidebarBrand } from "./SidebarBrand";
import { SidebarNav } from "./SidebarNav";

export function Sidebar() {
  return (
    <aside className="flex h-full w-60 shrink-0 flex-col border-r border-border bg-neutral-900">
      <SidebarBrand />
      <div className="min-h-0 flex-1 overflow-y-auto">
        <SidebarNav />
      </div>
      <LogoutButton />
    </aside>
  );
}
