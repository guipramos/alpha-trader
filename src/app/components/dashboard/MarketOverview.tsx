"use client";

import { useEffect, useState } from "react";
import { MarketQuote } from "../../lib/market-types";
import { MarketStat } from "./MarketStat";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const volumeFormat = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
});

function formatChange(value: number) {
  const prefix = value > 0 ? "+" : "";
  return `${prefix}${value.toFixed(2)}%`;
}

export function MarketOverview() {
  const [quote, setQuote] = useState<MarketQuote | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const abortController = new AbortController();
    let disposed = false;

    async function loadQuote() {
      try {
        const response = await fetch("/api/market/quote", {
          signal: abortController.signal,
        });
        const data = (await response.json()) as MarketQuote & { error?: string };

        if (disposed) {
          return;
        }

        if (!response.ok || typeof data.price !== "number") {
          setError(data.error ?? "Cotação indisponível");
          return;
        }

        setQuote(data);
        setError("");
      } catch (loadError) {
        if (disposed || abortController.signal.aborted) {
          return;
        }

        setError(
          loadError instanceof Error
            ? loadError.message
            : "Falha ao carregar cotação",
        );
      }
    }

    void loadQuote();
    const intervalId = window.setInterval(() => {
      void loadQuote();
    }, 10_000);

    return () => {
      disposed = true;
      abortController.abort();
      window.clearInterval(intervalId);
    };
  }, []);

  const changeClass =
    (quote?.changePercent ?? 0) >= 0 ? "text-primary" : "text-tertiary";

  return (
    <div className="flex flex-wrap items-end gap-x-8 gap-y-3">
      <div>
        <p className="text-[12px] leading-4 font-medium tracking-wide text-muted-foreground">
          {quote?.symbol ?? "BTC / USDT"}
        </p>
        <div className="mt-1 flex items-baseline gap-3">
          <span className="text-[28px] leading-8 font-semibold tracking-tight text-foreground">
            {quote ? currency.format(quote.price) : "—"}
          </span>
          <span className={`text-[14px] leading-5 font-medium ${changeClass}`}>
            {quote ? formatChange(quote.changePercent) : error || "Carregando..."}
          </span>
        </div>
      </div>
      <MarketStat
        label="24H HIGH"
        value={quote ? currency.format(quote.high) : "—"}
      />
      <MarketStat
        label="24H LOW"
        value={quote ? currency.format(quote.low) : "—"}
      />
      <MarketStat
        label="24H VOLUME"
        value={quote ? volumeFormat.format(quote.volume) : "—"}
      />
    </div>
  );
}
