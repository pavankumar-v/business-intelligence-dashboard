import DashboardLayout from "./components/layout/dashboard-layout";
import KpiSection from "./components/kpis/kpi-section";
import { TypographyH1, TypographyH3 } from "./components/ui/typography";
import ChartsSection from "./components/sections/charts-section";
import { ThemeProvider } from "./context/theme-context";
import { MetricsProvider, useMetrics } from "./context/metrics-context";
import { ModelWiseBarGraph } from "./components/charts/model-wise-bar-graph";

function DashboardContent() {
  const { metrics } = useMetrics();

  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <DashboardLayout>
      <>
        <TypographyH3 className="leading-none">Total Spendings</TypographyH3>
        <TypographyH1 className="">
          {USDollar.format(metrics?.total_cost || 0)}
        </TypographyH1>

        <div className="flex flex-col lg:flex-row w-full gap-2">
          <KpiSection />
          <ModelWiseBarGraph />
        </div>

        <ChartsSection />
      </>
    </DashboardLayout>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <MetricsProvider
        defaultFilters={{
          regions: [],
          start_date: "2024-01-01",
          end_date: "2024-02-29",
        }}
      >
        <DashboardContent />
      </MetricsProvider>
    </ThemeProvider>
  );
}

export default App;
