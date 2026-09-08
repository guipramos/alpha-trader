import { Timeframe } from "../components/types/TimeframeToolbarProps";

export const TIMEFRAMES: Timeframe[] = ["1M", "5M", "1H", "4H", "1D"];

export function isTimeframe(value: string): value is Timeframe {
  return TIMEFRAMES.includes(value as Timeframe);
}

export type ChartCandle = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
};

export type ChartLinePoint = {
  time: number;
  value: number;
};

export type ChartVolumeBar = {
  time: number;
  value: number;
  color: string;
};

export type ChartPayload = {
  candles: ChartCandle[];
  line: ChartLinePoint[];
  volume: ChartVolumeBar[];
  error?: string;
};

export type MarketQuote = {
  symbol: string;
  price: number;
  changePercent: number;
  high: number;
  low: number;
  volume: number;
};
