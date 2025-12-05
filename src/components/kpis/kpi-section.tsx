import { BotMessageSquare, Coins, User } from "lucide-react";
import { TypographyH3, TypographyMuted } from "../ui/typography";
import KPICard from "./kpi-card";
import claudeLogo from "../../assets/claude.png";
import { Card } from "../ui/card";
import { useQuery } from "@tanstack/react-query";
import { kpiMetrics } from "@/services/metrics.service";

const KpiSection = () => {
  const { data: metrics } = useQuery({
    queryKey: ["metrics"],
    queryFn: () =>
      kpiMetrics({
        regions: ["EU"],
        start_date: "2024-01-01",
        end_date: "2024-03-31",
      }),
  });
  // const queryClient = useQueryClient()

  console.log(metrics);

  // Queries
  return (
    <Card>
      <TypographyH3 indicatorColor="bg-orange-200" withIndicator>
        Metrics
      </TypographyH3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 bg-accent p-2 rounded-xl">
        <KPICard
          title="Top Model Used"
          icon={<BotMessageSquare className="w-4 h-4" />}
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-2 relative capitalize">
              <img
                src={claudeLogo}
                alt="Claude"
                className="w-9 h-9 left-[-14px] top-[-5px] rounded-md bg-accent p-2"
              />
              <span className="text-[2.2rem] font-semibold">
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
            <span className="text-5xl font-semibold">
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
            <span className="text-5xl font-semibold">
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
