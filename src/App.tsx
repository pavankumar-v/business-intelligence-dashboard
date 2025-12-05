import DashboardLayout from "./components/layout/dashboard-layout";
import KpiSection from "./components/kpis/kpi-section";
import { TypographyH1 } from "./components/ui/typography";

function App() {
  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <DashboardLayout>
      <>
        <TypographyH1>
          Total Spendings <br />
          {USDollar.format(1234567.89)}
        </TypographyH1>

        <KpiSection />
      </>
    </DashboardLayout>
  );
}

export default App;
