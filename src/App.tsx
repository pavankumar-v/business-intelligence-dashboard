import DashboardLayout from "./components/layout/dashboard-layout";
import KpiSection from "./components/kpis/kpi-section";
import { TypographyH1 } from "./components/ui/typography";
import ChartsSection from "./components/sections/charts-section";
import { ThemeProvider } from "./context/theme-context";
import { MetricsProvider, useMetrics } from "./context/metrics-context";

function DashboardContent() {
  const { metrics } = useMetrics();

  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <DashboardLayout>
      <>
        <TypographyH1 className="">
          Total Spendings <br />
          {USDollar.format(metrics?.total_cost || 0)}
        </TypographyH1>

        <KpiSection />

        <ChartsSection spends_trend={metrics?.spends_trend ?? []} />
      </>
    </DashboardLayout>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <MetricsProvider>
        <DashboardContent />
      </MetricsProvider>
    </ThemeProvider>
  );
}

export default App;
