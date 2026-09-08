import { fetchMarketQuote } from "../../../lib/market";

export async function GET() {
  try {
    const quote = await fetchMarketQuote();
    return Response.json(quote);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Falha ao carregar cotação";

    return Response.json({ error: message }, { status: 502 });
  }
}
