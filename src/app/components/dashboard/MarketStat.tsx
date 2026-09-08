import { MarketStatProps } from "../types/MarketStatProps";

export function MarketStat({ label, value }: MarketStatProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[11px] leading-4 font-medium tracking-[0.08em] text-muted-foreground uppercase">
        {label}
      </span>
      <span className="text-[13px] leading-5 font-medium text-foreground">
        {value}
      </span>
    </div>
  );
}
