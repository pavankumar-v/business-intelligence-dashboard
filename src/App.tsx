import DashboardLayout from "./components/layout/dashboard-layout";
import KpiSection from "./components/kpis/kpi-section";
import { TypographyH1 } from "./components/ui/typography";
import { useQuery } from "@tanstack/react-query";
import ChartsSection from "./components/sections/charts-section";
import { kpiMetrics } from "./services/metrics.service";
import { ThemeProvider } from "./context/theme-context";

function App() {
  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const { data: metrics } = useQuery({
    queryKey: ["metric"],
    queryFn: () =>
      kpiMetrics({
        regions: [],
        start_date: "2024-01-01",
        end_date: "2024-03-10",
      }),
  });
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <DashboardLayout>
        <>
          <TypographyH1 className="">
            Total Spendings <br />
            {USDollar.format(metrics?.total_cost || 0)}
          </TypographyH1>

          <KpiSection />

          <ChartsSection spends_trend={metrics?.spends_trend || []} />
        </>
      </DashboardLayout>
    </ThemeProvider>
  );
}

export default App;
