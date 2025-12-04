import DashboardLayout from "./components/layout/dashboard-layout";

import { TypographyH4 } from "./components/ui/typography";

function App() {
  return (
    <DashboardLayout>
      <>
        <TypographyH4
          className="mb-4"
          indicatorColor="bg-orange-200"
          withIndicator
        >
          Overview
        </TypographyH4>
      </>
    </DashboardLayout>
  );
}

export default App;
