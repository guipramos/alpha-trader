"use client";

import { useRef, useState } from "react";
import { Timeframe } from "../types/TimeframeToolbarProps";
import { TimeframeToolbar } from "./TimeframeToolbar";
import { TradingChart } from "./TradingChart";

export function ChartPanel() {
  const [timeframe, setTimeframe] = useState<Timeframe>("1H");
  const panelRef = useRef<HTMLDivElement>(null);

  function handleFullscreen() {
    const panel = panelRef.current;

    if (!panel) {
      return;
    }

    if (document.fullscreenElement) {
      void document.exitFullscreen();
      return;
    }

    void panel.requestFullscreen();
  }

  return (
    <div
      ref={panelRef}
      className="flex h-full min-h-0 flex-1 flex-col gap-3 bg-background"
    >
      <TimeframeToolbar
        value={timeframe}
        onChange={setTimeframe}
        onFullscreen={handleFullscreen}
      />
      <TradingChart timeframe={timeframe} />
    </div>
  );
}
