import { ChartLineDefault } from "../charts/line-chart";
import { RegionWiseDistribution } from "../charts/region-wise-distribution";
import { Card } from "../ui/card";
import { TypographyH3 } from "../ui/typography";

const ChartsSection = ({
  spends_trend,
}: {
  spends_trend:
    | {
        date: string;
        cost: number;
      }[]
    | [];
}) => {
  return (
    <div className="flex gap-2 w-full">
      <Card className="w-[70%]">
        <TypographyH3 indicatorColor="bg-accent-indicator-green" withIndicator>
          Charts
        </TypographyH3>

        <ChartLineDefault chartData={spends_trend} />
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
