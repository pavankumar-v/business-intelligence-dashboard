import { ChartLineDefault } from "../charts/line-chart";
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
    <Card>
      <TypographyH3 indicatorColor="bg-green-200" withIndicator>
        Charts
      </TypographyH3>

      <ChartLineDefault chartData={spends_trend} />
    </Card>
  );
};

export default ChartsSection;
