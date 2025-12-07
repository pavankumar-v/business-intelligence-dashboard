"use client";

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
import { useMetrics } from "@/context/metrics-context";
import { Skeleton } from "../ui/skeleton";
import { TypographyH3 } from "../ui/typography";
import { formatDateRange } from "@/lib/utils";

const chartConfig = {
  cost: {
    label: "cost",
    color: "var(--color-chart-green)",
  },
} satisfies ChartConfig;

export function ModelWiseBarGraph() {
  const { metrics, isLoading, filters } = useMetrics();

  const chartData =
    metrics?.models_metrics?.map((item) => ({
      model: item.model,
      cost: item.total_cost,
    })) || [];

  return (
    <Card className="w-full lg:w-[30%]">
      <TypographyH3 indicatorColor="bg-accent-indicator-purple" withIndicator>
        Model Spends
      </TypographyH3>
      <CardHeader className="p-0">
        <CardTitle>Model Wise Bar Chart</CardTitle>
        <CardDescription>
          {formatDateRange(filters?.start_date, filters?.end_date)}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <Skeleton className="w-full h-[200px] rounded-xl" />
        ) : !metrics ? (
          <p>Error Loading Metrics</p>
        ) : (
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 40,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="model"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="cost" fill="var(--color-chart-green)" radius={8}>
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                  formatter={(value: number) => `$${value.toFixed(2)}`}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm p-0">
        <div className="flex gap-2 leading-none font-medium">
          Compare models to understand cost effectiveness
        </div>
        <div className="text-muted-foreground leading-none">
          Highest Model Vs Lowest Model
        </div>
      </CardFooter>
    </Card>
  );
}
