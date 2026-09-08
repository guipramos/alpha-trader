import { IconMaximize } from "@tabler/icons-react";
import { TIMEFRAMES } from "../../lib/market-types";
import { TimeframeToolbarProps } from "../types/TimeframeToolbarProps";

export function TimeframeToolbar({
  value,
  onChange,
  onFullscreen,
}: TimeframeToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-1" role="tablist" aria-label="Chart timeframe">
        {TIMEFRAMES.map((timeframe) => {
          const isActive = timeframe === value;

          return (
            <button
              key={timeframe}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(timeframe)}
              className={`h-8 min-w-10 cursor-pointer rounded-md px-2.5 text-[12px] font-medium transition-colors ${
                isActive
                  ? "bg-neutral-800 text-foreground"
                  : "text-muted-foreground hover:bg-neutral-800/60 hover:text-foreground"
              }`}
            >
              {timeframe}
            </button>
          );
        })}
      </div>
      <button
        type="button"
        onClick={onFullscreen}
        aria-label="Toggle fullscreen"
        className="flex size-8 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-neutral-800/60 hover:text-foreground"
      >
        <IconMaximize className="size-4" />
      </button>
    </div>
  );
}
