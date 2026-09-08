import { IconBell, IconUser } from "@tabler/icons-react";
import { IconButton } from "../ui/IconButton";
import { SearchBar } from "./SearchBar";

export function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-3 border-b border-border px-4">
      <SearchBar />
      <span className="hidden h-8 items-center rounded-md border border-border px-2.5 text-[12px] font-medium text-muted-foreground sm:inline-flex">
        UTC-0
      </span>
      <IconButton aria-label="Notifications">
        <IconBell className="size-5" />
      </IconButton>
      <IconButton aria-label="Profile">
        <IconUser className="size-5" />
      </IconButton>
    </header>
  );
}
