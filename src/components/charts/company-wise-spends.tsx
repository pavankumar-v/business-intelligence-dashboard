import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TypographyH3 } from "../ui/typography";
import { useMetrics } from "@/context/metrics-context";

export const description = "A bar chart with a label";

const chartConfig = {
  total_spends: {
    label: "total_spends",
    color: "var(--color-chart-green)",
  },
} satisfies ChartConfig;

export function CompanyWiseSpends() {
  const { metrics, isLoading } = useMetrics();

  if (isLoading || !metrics) {
    return (
      <Card className="flex flex-col p-0">
        <CardHeader className="items-center p-0">
          <CardTitle>Company Wise Spends</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <div className="flex items-center justify-center h-[250px]">
            Loading...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <TypographyH3 indicatorColor="bg-accent-indicator-purple" withIndicator>
        Company Wise Spends
      </TypographyH3>
      <CardHeader className="p-0">
        <CardTitle>Company Wise Spends</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={metrics.company_wise_spends}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="company"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              //   tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="total_spends"
              fill="var(--color-total_spends)"
              radius={8}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this company <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 companys
        </div>
      </CardFooter>
    </Card>
  );
}
