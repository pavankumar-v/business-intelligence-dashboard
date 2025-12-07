import DashboardLayout from "./components/layout/dashboard-layout";
import KpiSection from "./components/kpis/kpi-section";
import { TypographyH1, TypographyH3 } from "./components/ui/typography";
import ChartsSection from "./components/sections/charts-section";
import { ThemeProvider } from "./context/theme-context";
import { MetricsProvider, useMetrics } from "./context/metrics-context";
import { ModelWiseBarGraph } from "./components/charts/model-wise-bar-graph";
import { CompanyWiseSpends } from "./components/charts/company-wise-spends";
import { RegionFilterDropdown } from "./components/filters/region-filter-dropdown";
import { DateRangeFilter } from "./components/filters/date-range-filter";
import { Toaster } from "sonner";
import { CsvUploadForm } from "./components/transactions-upload";

function DashboardContent() {
  const { metrics } = useMetrics();

  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <DashboardLayout>
      <>
        <Toaster />
        <CsvUploadForm />
        <div className="flex items-end gap-2 w-full justify-between">
          <div className="">
            <TypographyH3 className="leading-none font-medium">
              Overall Total Spendings
            </TypographyH3>
            <TypographyH1 className="text-5xl font-medium mt-2">
              {USDollar.format(Number(metrics?.kpis?.total_spendings || 0))}
            </TypographyH1>
          </div>

          <div className="flex items-end gap-2">
            <DateRangeFilter />
            <RegionFilterDropdown />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row w-full gap-2">
          <KpiSection />
          <ModelWiseBarGraph />
        </div>

        <ChartsSection />

        <CompanyWiseSpends />
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
          end_date: "2024-03-08",
        }}
      >
        <DashboardContent />
      </MetricsProvider>
    </ThemeProvider>
  );
}

export default App;
