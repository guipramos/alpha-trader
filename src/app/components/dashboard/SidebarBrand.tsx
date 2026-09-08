import { Logo } from "../Logo";

export function SidebarBrand() {
  return (
    <div className="flex items-center gap-3 px-4 py-5">
      <Logo width={36} height={36} className="size-9 shrink-0" />
      <div className="min-w-0">
        <p className="truncate text-[15px] leading-5 font-semibold tracking-tight text-foreground">
          Alpha Terminal
        </p>
        <p className="text-[12px] leading-4 text-muted-foreground">Pro Trader</p>
      </div>
    </div>
  );
}
