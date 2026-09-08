export type Timeframe = "1M" | "5M" | "1H" | "4H" | "1D";

export interface TimeframeToolbarProps {
  value: Timeframe;
  onChange: (timeframe: Timeframe) => void;
  onFullscreen: () => void;
}
