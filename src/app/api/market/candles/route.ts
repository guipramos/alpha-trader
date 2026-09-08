import { NextRequest } from "next/server";
import { fetchMarketCandles } from "../../../lib/market";
import { isTimeframe } from "../../../lib/market-types";

export async function GET(request: NextRequest) {
  const timeframe = request.nextUrl.searchParams.get("timeframe") ?? "1H";

  if (!isTimeframe(timeframe)) {
    return Response.json(
      { candles: [], line: [], volume: [], error: "Timeframe inválido" },
      { status: 400 },
    );
  }

  const payload = await fetchMarketCandles(timeframe);
  const status = payload.error && !payload.candles.length ? 502 : 200;

  return Response.json(payload, { status });
}
