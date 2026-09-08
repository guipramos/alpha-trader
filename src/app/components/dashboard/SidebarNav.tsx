"use client";

import {
  IconBell,
  IconDeviceLaptop,
  IconLayoutGrid,
  IconSettings,
  IconWallet,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { SidebarNavItem } from "./SidebarNavItem";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: IconLayoutGrid },
  { href: "/live-orders", label: "Live Orders", icon: IconDeviceLaptop },
  { href: "/portfolio", label: "Portfolio", icon: IconWallet },
  { href: "/alerts", label: "Alerts", icon: IconBell },
  { href: "/settings", label: "Settings", icon: IconSettings },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-0.5 py-2" aria-label="Main">
      {NAV_ITEMS.map((item) => (
        <SidebarNavItem
          key={item.href}
          href={item.href}
          label={item.label}
          icon={<item.icon />}
          isActive={pathname === item.href}
        />
      ))}
    </nav>
  );
}
