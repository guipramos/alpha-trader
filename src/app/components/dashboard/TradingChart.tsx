"use client";

import {
  CandlestickSeries,
  ColorType,
  CrosshairMode,
  HistogramSeries,
  LineSeries,
  LineType,
  createChart,
  type UTCTimestamp,
} from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
import { ChartPayload } from "../../lib/market-types";
import { Timeframe } from "../types/TimeframeToolbarProps";

const UP_COLOR = "#ccff00";
const DOWN_COLOR = "#ff3b30";

type ChartStatus = "loading" | "ready" | "empty" | "error";

export function TradingChart({ timeframe }: { timeframe: Timeframe }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<ChartStatus>("loading");
  const [message, setMessage] = useState("Carregando gráfico...");

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const abortController = new AbortController();
    let disposed = false;

    setStatus("loading");
    setMessage("Carregando gráfico...");

    const chart = createChart(container, {
      autoSize: true,
      layout: {
        background: { type: ColorType.Solid, color: "#0c0e12" },
        textColor: "#989faf",
        fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
      },
      grid: {
        vertLines: { color: "#2a2d31" },
        horzLines: { color: "#2a2d31" },
      },
      crosshair: { mode: CrosshairMode.Normal },
      rightPriceScale: {
        borderColor: "#2a2d31",
        scaleMargins: { top: 0.08, bottom: 0.22 },
      },
      timeScale: {
        borderColor: "#2a2d31",
        timeVisible: timeframe !== "1D",
        secondsVisible: false,
      },
    });

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: UP_COLOR,
      downColor: DOWN_COLOR,
      borderVisible: false,
      wickUpColor: UP_COLOR,
      wickDownColor: DOWN_COLOR,
    });

    const trendSeries = chart.addSeries(LineSeries, {
      color: UP_COLOR,
      lineWidth: 2,
      lineType: LineType.Curved,
      lastValueVisible: false,
      priceLineVisible: false,
      crosshairMarkerVisible: false,
    });

    const volumeSeries = chart.addSeries(HistogramSeries, {
      priceFormat: { type: "volume" },
      priceScaleId: "",
    });

    volumeSeries.priceScale().applyOptions({
      scaleMargins: { top: 0.82, bottom: 0 },
    });

    async function loadCandles() {
      try {
        const response = await fetch(
          `/api/market/candles?timeframe=${timeframe}`,
          { signal: abortController.signal },
        );
        const data = (await response.json()) as ChartPayload;

        if (disposed) {
          return;
        }

        if (!data.candles?.length) {
          candleSeries.setData([]);
          trendSeries.setData([]);
          volumeSeries.setData([]);
          setStatus(response.ok ? "empty" : "error");
          setMessage(data.error ?? "Sem dados para este período");
          return;
        }

        candleSeries.setData(
          data.candles.map((candle) => ({
            ...candle,
            time: candle.time as UTCTimestamp,
          })),
        );
        trendSeries.setData(
          (data.line ?? []).map((point) => ({
            ...point,
            time: point.time as UTCTimestamp,
          })),
        );
        volumeSeries.setData(
          (data.volume ?? []).map((bar) => ({
            ...bar,
            time: bar.time as UTCTimestamp,
          })),
        );
        chart.timeScale().fitContent();
        setStatus("ready");
      } catch (error) {
        if (disposed || abortController.signal.aborted) {
          return;
        }

        setStatus("error");
        setMessage(
          error instanceof Error ? error.message : "Falha ao carregar o gráfico",
        );
      }
    }

    void loadCandles();

    return () => {
      disposed = true;
      abortController.abort();
      chart.remove();
    };
  }, [timeframe]);

  return (
    <div className="relative min-h-0 w-full flex-1">
      <div ref={containerRef} className="h-full min-h-0 w-full" />
      {status !== "ready" ? (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 text-[13px] text-muted-foreground">
          {message}
        </div>
      ) : null}
    </div>
  );
}
