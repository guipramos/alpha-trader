import { Timeframe } from "../components/types/TimeframeToolbarProps";
import {
  ChartCandle,
  ChartPayload,
  MarketQuote,
} from "./market-types";

const FINNHUB_SYMBOL = "BINANCE:BTCUSDT";
const BINANCE_SYMBOL = "BTCUSDT";
const CANDLE_COUNT = 80;
const QUOTE_CACHE_MS = 8_000;
const UP_VOLUME = "rgba(204, 255, 0, 0.45)";
const DOWN_VOLUME = "rgba(255, 59, 48, 0.45)";

const BINANCE_INTERVAL: Record<Timeframe, string> = {
  "1M": "1m",
  "5M": "5m",
  "1H": "1h",
  "4H": "4h",
  "1D": "1d",
};

type Ohlcv = ChartCandle & { volume: number };

type FinnhubQuoteResponse = {
  c?: number;
  dp?: number;
  h?: number;
  l?: number;
  error?: string;
};

type BinanceKline = [
  number,
  string,
  string,
  string,
  string,
  string,
  ...unknown[],
];

type BinanceTicker = {
  lastPrice?: string;
  priceChangePercent?: string;
  highPrice?: string;
  lowPrice?: string;
  volume?: string;
};

type QuoteCache = {
  expiresAt: number;
  value: MarketQuote;
};

let quoteCache: QuoteCache | null = null;

function getApiKey() {
  return process.env.FINNHUB_API_KEY;
}

async function fetchJson(url: URL) {
  const response = await fetch(url, { cache: "no-store" });
  const data: unknown = await response.json();

  if (!response.ok) {
    throw new Error("Falha ao consultar dados de mercado");
  }

  return data;
}

async function finnhubQuote() {
  const apiKey = getApiKey();

  if (!apiKey) {
    throw new Error("FINNHUB_API_KEY ausente");
  }

  const url = new URL("https://finnhub.io/api/v1/quote");
  url.searchParams.set("symbol", FINNHUB_SYMBOL);
  url.searchParams.set("token", apiKey);

  return (await fetchJson(url)) as FinnhubQuoteResponse;
}

function toChartPayload(candles: Ohlcv[]): ChartPayload {
  return {
    candles: candles.map(({ time, open, high, low, close }) => ({
      time,
      open,
      high,
      low,
      close,
    })),
    line: candles.map(({ time, close }) => ({ time, value: close })),
    volume: candles.map(({ time, open, close, volume }) => ({
      time,
      value: volume,
      color: close >= open ? UP_VOLUME : DOWN_VOLUME,
    })),
  };
}

export async function fetchMarketCandles(
  timeframe: Timeframe,
): Promise<ChartPayload> {
  try {
    const url = new URL("https://api.binance.com/api/v3/klines");
    url.searchParams.set("symbol", BINANCE_SYMBOL);
    url.searchParams.set("interval", BINANCE_INTERVAL[timeframe]);
    url.searchParams.set("limit", String(CANDLE_COUNT));

    const data = (await fetchJson(url)) as BinanceKline[];

    if (!Array.isArray(data) || data.length === 0) {
      return {
        candles: [],
        line: [],
        volume: [],
        error: "Sem dados para este período",
      };
    }

    const candles: Ohlcv[] = data.map((kline) => ({
      time: Math.floor(kline[0] / 1000),
      open: Number(kline[1]),
      high: Number(kline[2]),
      low: Number(kline[3]),
      close: Number(kline[4]),
      volume: Number(kline[5]),
    }));

    return toChartPayload(candles);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Falha ao carregar candles";

    return { candles: [], line: [], volume: [], error: message };
  }
}

export async function fetchMarketQuote(): Promise<MarketQuote> {
  if (quoteCache && quoteCache.expiresAt > Date.now()) {
    return quoteCache.value;
  }

  const tickerUrl = new URL("https://api.binance.com/api/v3/ticker/24hr");
  tickerUrl.searchParams.set("symbol", BINANCE_SYMBOL);
  const ticker = (await fetchJson(tickerUrl)) as BinanceTicker;
  const tickerPrice = Number(ticker.lastPrice);

  if (!Number.isFinite(tickerPrice)) {
    throw new Error("Cotação indisponível");
  }

  let price = tickerPrice;
  let changePercent = Number(ticker.priceChangePercent ?? 0);
  let high = Number(ticker.highPrice ?? tickerPrice);
  let low = Number(ticker.lowPrice ?? tickerPrice);

  try {
    const quote = await finnhubQuote();

    if (typeof quote.c === "number") {
      price = quote.c;
      changePercent = quote.dp ?? changePercent;
      high = quote.h ?? high;
      low = quote.l ?? low;
    }
  } catch {
    // Finnhub quote is best-effort; Binance 24h ticker keeps the header populated.
  }

  const value: MarketQuote = {
    symbol: "BTC / USDT",
    price,
    changePercent,
    high,
    low,
    volume: Number(ticker.volume ?? 0),
  };

  quoteCache = { expiresAt: Date.now() + QUOTE_CACHE_MS, value };

  return value;
}
