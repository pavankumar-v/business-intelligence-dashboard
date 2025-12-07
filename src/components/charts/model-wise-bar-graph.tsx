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
import { TrendingUp } from "lucide-react";

const chartConfig = {
  cost: {
    label: "cost",
    color: "var(--color-green-500)",
  },
} satisfies ChartConfig;

export function ModelWiseBarGraph() {
  const { metrics, isLoading } = useMetrics();

  const chartData =
    metrics?.cost_distribution_by_model?.map((item) => ({
      model: item.model,
      cost: item.cost,
    })) || [];

  return (
    <Card className="w-full lg:w-[30%]">
      <TypographyH3 indicatorColor="bg-accent-indicator-purple" withIndicator>
        Model Spends
      </TypographyH3>
      <CardHeader className="p-0">
        <CardTitle>Model Wise Bar Chart</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <Skeleton className="w-full h-[400px] rounded-xl" />
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
              <Bar dataKey="cost" fill="var(--color-green-500)" radius={8}>
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
          Trending up by 5.2% this date <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 dates
        </div>
      </CardFooter>
    </Card>
  );
}
