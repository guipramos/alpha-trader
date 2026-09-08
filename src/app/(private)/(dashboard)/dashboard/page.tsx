import { ChartPanel } from "../../../components/dashboard/ChartPanel";
import { MarketOverview } from "../../../components/dashboard/MarketOverview";

export default function Dashboard() {
  return (
    <section className="flex h-full flex-col gap-4">
      <MarketOverview />
      <ChartPanel />
    </section>
  );
}
