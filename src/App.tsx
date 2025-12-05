import DashboardLayout from "./components/layout/dashboard-layout";
import KpiSection from "./components/kpis/kpi-section";
import { TypographyH1 } from "./components/ui/typography";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <QueryClientProvider client={queryClient}>
      <DashboardLayout>
        <>
          <TypographyH1>
            Total Spendings <br />
            {USDollar.format(1234567.89)}
          </TypographyH1>

          <KpiSection />
        </>
      </DashboardLayout>
    </QueryClientProvider>
  );
}

export default App;
