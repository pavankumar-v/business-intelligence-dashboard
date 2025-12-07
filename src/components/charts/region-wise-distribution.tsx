"use client";

import { Pie, PieChart } from "recharts";

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
import { useMetrics } from "@/hooks/use-metrics";
import { COUNTRIES } from "@/lib/constants";

export const description = "A pie chart showing region wise spends";

const countryToColorMap: Record<string, string> = {
  Japan: "var(--color-japan)",
  India: "var(--color-india)",
  "United States": "var(--color-united-states)",
  "European Union": "var(--color-european-union)",
  Canada: "var(--color-canada)",
  Australia: "var(--color-australia)",
};

const regionToNameMap = COUNTRIES.reduce((acc, country) => {
  acc[country.code] = country.name;
  return acc;
}, {} as Record<string, string>);

export function RegionWiseDistribution() {
  const { metrics, isLoading } = useMetrics();

  if (isLoading || !metrics) {
    return (
      <Card className="flex flex-col p-0">
        <CardHeader className="items-center p-0">
          <CardTitle>Region Wise Spends</CardTitle>
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

  const chartData =
    metrics.region_wise_spends?.map((spend) => ({
      country: regionToNameMap[spend.region] || spend.region,
      spends: spend.total_spends,
      fill:
        countryToColorMap[regionToNameMap[spend.region] || spend.region] ||
        "#ccc",
    })) || [];

  const chartConfig: ChartConfig = {};
  COUNTRIES.forEach((country) => {
    chartConfig[country.name] = {
      label: country.name,
      color: countryToColorMap[country.name] || "#ccc",
    };
  });

  return (
    <Card className="flex flex-col p-0">
      <CardHeader className="items-center p-0">
        <CardTitle>Region Wise Spends</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie data={chartData} dataKey="spends" label nameKey="country" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm p-0">
        <div className="flex items-center gap-2 leading-none font-medium text-center">
          Understand the distribution of spends across regions
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total spends for the last period
        </div>
      </CardFooter>
    </Card>
  );
}
