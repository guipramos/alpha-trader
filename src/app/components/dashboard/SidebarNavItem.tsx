import Link from "next/link";
import { SidebarNavItemProps } from "../types/SidebarNavItemProps";

export function SidebarNavItem({
  href,
  label,
  icon,
  isActive,
}: SidebarNavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 border-l-2 px-4 py-2.5 text-[14px] leading-5 transition-colors ${
        isActive
          ? "border-foreground bg-neutral-800/60 font-medium text-foreground"
          : "border-transparent text-muted-foreground hover:bg-neutral-800/40 hover:text-foreground"
      }`}
    >
      <span className="[&>svg]:size-5">{icon}</span>
      {label}
    </Link>
  );
}
