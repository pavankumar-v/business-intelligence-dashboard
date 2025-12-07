import { useMetrics } from "@/context/metrics-context";
import { SpendsTrendGraph } from "../charts/line-chart";
import { RegionWiseDistribution } from "../charts/region-wise-distribution";
import { Card } from "../ui/card";
import { TypographyH3 } from "../ui/typography";
import { Skeleton } from "../ui/skeleton";

const ChartsSection = () => {
  const { metrics, isLoading } = useMetrics();

  return (
    <div className="flex flex-col lg:flex-row w-full gap-2">
      <Card className="w-full lg:w-[70%]">
        <TypographyH3 indicatorColor="bg-accent-indicator-green" withIndicator>
          Spends Trend
        </TypographyH3>

        {isLoading ? (
          <Skeleton className="w-full h-[400px] rounded-xl" />
        ) : !metrics ? (
          <p>Error Loading Metrics</p>
        ) : (
          <SpendsTrendGraph chartData={metrics.kips?.spends_trend} />
        )}
      </Card>

      <Card className="w-full lg:w-[30%]">
        <TypographyH3 indicatorColor="bg-accent-indicator-purple" withIndicator>
          Region Wise
        </TypographyH3>

        <RegionWiseDistribution />
      </Card>
    </div>
  );
};

export default ChartsSection;
