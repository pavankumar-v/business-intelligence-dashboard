"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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
import { useMetrics } from "@/context/metrics-context";
import { formatDateRange } from "@/lib/utils";

export const description = "A line chart";

const chartConfig = {
  cost: {
    label: "cost",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function SpendsTrendGraph() {
  const { metrics, isLoading, filters } = useMetrics();

  if (isLoading) {
    return <p>Loading Metrics</p>;
  }

  if (!metrics || !metrics.kpis) {
    return <p>Error Loading Metrics</p>;
  }

  return (
    <Card className="p-0">
      <CardHeader className="p-0">
        <CardTitle>Cost Consumption Trend</CardTitle>
        <CardDescription>
          {formatDateRange(filters?.start_date, filters?.end_date)}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart
            accessibilityLayer
            data={metrics.kpis.spends_trend}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="cost"
              type="natural"
              stroke="var(--color-cost)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm p-0">
        <div className="flex gap-2 leading-none font-medium">
          Understand the trend of cost consumption
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total cost for the last period
        </div>
      </CardFooter>
    </Card>
  );
}
