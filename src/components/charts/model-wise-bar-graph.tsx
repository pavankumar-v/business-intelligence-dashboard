"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
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
import { useMetrics } from "@/hooks/use-metrics";

export const description = "A bar chart showing cost distribution by model";

const chartConfig = {
  cost: {
    label: "Cost",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export function ModelWiseBarGraph() {
  const { metrics, isLoading } = useMetrics();

  if (isLoading || !metrics) {
    return (
      <Card className="w-full lg:w-[40%]">
        <TypographyH3 indicatorColor="bg-accent-indicator-purple" withIndicator>
          Models
        </TypographyH3>
        <CardHeader className="p-0">
          <CardTitle>Model Wise Cost Distribution</CardTitle>
          <CardDescription>Loading...</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex items-center justify-center">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  const chartData =
    metrics.cost_distribution_by_model?.map((item) => ({
      model: item.mode,
      cost: item.cost,
    })) || [];

  return (
    <Card className="w-full sm:w-[30%]">
      <TypographyH3 indicatorColor="bg-accent-indicator-purple" withIndicator>
        Model Spends
      </TypographyH3>
      <CardHeader className="p-0">
        <CardTitle>Model Wise Spendings</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer config={chartConfig} className="">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="model"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="cost" fill="var(--color-green-500)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                fontSize={12}
                formatter={(value: string) => `$${Number(value).toFixed(2)}`}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
