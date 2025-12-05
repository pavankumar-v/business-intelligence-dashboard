import DashboardLayout from "./components/layout/dashboard-layout";
import KpiSection from "./components/kpis/kpi-section";
import { TypographyH1 } from "./components/ui/typography";
import { useQuery } from "@tanstack/react-query";
import { ThemeProvider } from "./context/theme-context";

function App() {
  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <DashboardLayout>
        <>
          <TypographyH1>
            Total Spendings <br />
            {USDollar.format(1234567.89)}
          </TypographyH1>

          <KpiSection />
        </>
      </DashboardLayout>
    </ThemeProvider>
  );
}

export default App;
