import { IconSearch } from "@tabler/icons-react";

export function SearchBar() {
  return (
    <div className="relative min-w-0 flex-1">
      <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground">
        <IconSearch className="size-4" />
      </span>
      <input
        type="search"
        name="search"
        aria-label="Search markets, orders, symbols"
        placeholder="Search markets, orders, symbols..."
        autoComplete="off"
        className="h-10 w-full rounded-md border border-border bg-neutral-900 pr-3 pl-10 text-[14px] text-foreground outline-none placeholder:text-muted-foreground focus:border-neutral-600"
      />
    </div>
  );
}
