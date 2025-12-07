import { BotMessageSquare, Coins, User } from "lucide-react";
import { TypographyH3, TypographyMuted } from "../ui/typography";
import KPICard from "./kpi-card";
import { Card } from "../ui/card";
import { useMetrics } from "@/context/metrics-context";
import ModelLogo from "../utils/model-logo";

const KpiSection = () => {
  const { metrics } = useMetrics();

  return (
    <Card>
      <TypographyH3 indicatorColor="bg-accent-indicator-orange" withIndicator>
        Metrics
      </TypographyH3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 bg-accent p-2 rounded-xl">
        <KPICard
          title="Top Model Used"
          icon={<BotMessageSquare className="w-4 h-4" />}
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-2 relative capitalize">
              <ModelLogo name={metrics?.highest_model_used || ""} />
              <span className="text-[2.2rem] font-semibold text-text">
                {metrics?.highest_model_used}
              </span>
            </div>
            <TypographyMuted className="text-md text-gray-400 flex items-center gap-2">
              Highest used by users
            </TypographyMuted>
          </div>
        </KPICard>

        <KPICard
          title="Active Sub Utilzation"
          icon={<User className="w-4 h-4 text-purple-400" />}
        >
          <div className="flex flex-col">
            <span className="text-5xl font-semibold text-text">
              {Number(metrics?.active_subscriber_utilization_rate.toFixed(2))} %
            </span>
            <TypographyMuted className="text-md text-gray-400">
              {Number(metrics?.active_subscriber_utilization_rate.toFixed(2))}%
              Of active subscribers use per day
            </TypographyMuted>
          </div>
        </KPICard>

        <KPICard
          title="Avg Token Comsumption"
          icon={<Coins className="w-4 h-4 text-yellow-500" />}
        >
          <div className="flex flex-col">
            <span className="text-5xl font-semibold text-text">
              {new Intl.NumberFormat().format(
                metrics?.avg_token_consumption_per_day || 0
              )}
            </span>
            <TypographyMuted className="text-md text-gray-400">
              Tokens utilised per day
            </TypographyMuted>
          </div>
        </KPICard>
      </div>
    </Card>
  );
};

export default KpiSection;
