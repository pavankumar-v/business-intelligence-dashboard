import { useMetrics } from "@/context/metrics-context";
import { ChartLineDefault } from "../charts/line-chart";
import { RegionWiseDistribution } from "../charts/region-wise-distribution";
import { Card } from "../ui/card";
import { TypographyH3 } from "../ui/typography";
import { Skeleton } from "../ui/skeleton";

const ChartsSection = () => {
  const { metrics, isLoading } = useMetrics();
  return (
    <div className="flex gap-2 w-full">
      <Card className="w-[70%]">
        <TypographyH3 indicatorColor="bg-accent-indicator-green" withIndicator>
          Charts
        </TypographyH3>

        {isLoading ? (
          <Skeleton className="w-full h-[400px] rounded-xl" />
        ) : !metrics ? (
          <p>Error Loading Metrics</p>
        ) : (
          <ChartLineDefault chartData={metrics.spends_trend} />
        )}
      </Card>
      <Card>
        <TypographyH3 indicatorColor="bg-accent-indicator-purple" withIndicator>
          Company Wise
        </TypographyH3>

        <RegionWiseDistribution />
      </Card>
    </div>
  );
};

export default ChartsSection;
