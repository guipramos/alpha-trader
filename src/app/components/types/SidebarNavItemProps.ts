import { ReactNode } from "react";

export interface SidebarNavItemProps {
  href: string;
  label: string;
  icon: ReactNode;
  isActive: boolean;
}
