import { BotMessageSquare, Coins, DollarSign, User } from "lucide-react";
import { TypographyH3, TypographyMuted } from "../ui/typography";
import KPICard from "./kpi-card";
import { Card } from "../ui/card";
import { useMetrics } from "@/context/metrics-context";
import ModelLogo from "../utils/model-logo";
import { USDollar } from "@/lib/utils";

const KpiSection = () => {
  const { metrics, isLoading } = useMetrics();

  return (
    <Card className="w-full lg:w-[70%]">
      <TypographyH3 indicatorColor="bg-accent-indicator-orange" withIndicator>
        Metrics
      </TypographyH3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 bg-accent p-2 rounded-xl">
        <KPICard
          title="Top Model Used"
          loading={isLoading}
          icon={<BotMessageSquare className="w-4 h-4" />}
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-2 relative capitalize">
              <ModelLogo name={metrics?.kpis.heighest_model_used || ""} />
              <span className="text-[2.5rem] font-medium text-text">
                {metrics?.kpis.heighest_model_used}
              </span>
            </div>
            <TypographyMuted className="text-md text-gray-400 flex items-center gap-2">
              Highest used by users
            </TypographyMuted>
          </div>
        </KPICard>

        <KPICard
          title="Avg Token Comsumption"
          loading={isLoading}
          icon={<Coins className="w-4 h-4 text-yellow-500" />}
        >
          <div className="flex flex-col">
            <span className="text-5xl font-medium text-text">
              {new Intl.NumberFormat().format(
                metrics?.kpis.average_token_consumption || 0
              )}
            </span>
            <TypographyMuted className="text-md text-gray-400">
              Tokens utilised per day
            </TypographyMuted>
          </div>
        </KPICard>

        <KPICard
          title="Average Spendings"
          loading={isLoading}
          icon={<DollarSign className="w-4 h-4 text-green-400" />}
        >
          <div className="flex flex-col">
            <span className="text-5xl font-medium text-text">
              {USDollar.format(metrics?.kpis.average_per_day_spending || 0)}
            </span>
            <TypographyMuted className="text-md text-gray-400">
              avgerage spending per day
            </TypographyMuted>
          </div>
        </KPICard>

        <KPICard
          title="Active Sub Utilzation"
          loading={isLoading}
          icon={<User className="w-4 h-4 text-purple-400" />}
        >
          <div className="flex flex-col">
            <span className="text-5xl font-medium text-text">
              {Number(
                ((metrics?.kpis.active_sub_utilization || 0) * 100).toFixed(2)
              )}{" "}
              %
            </span>
            <TypographyMuted className="text-md text-gray-400">
              {Number(
                ((metrics?.kpis.active_sub_utilization || 0) * 100).toFixed(2)
              )}
              % Of active subscribers use per day
            </TypographyMuted>
          </div>
        </KPICard>
      </div>
    </Card>
  );
};

export default KpiSection;
