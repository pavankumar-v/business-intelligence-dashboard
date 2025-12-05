import { BotMessageSquare, DollarSign } from "lucide-react";
import { TypographyH3, TypographyH4, TypographySmall } from "../ui/typography";
import { Badge } from "../ui/badge";
import KPICard from "./kpi-card";
import claudeLogo from "../../assets/claude.png";
import { Card } from "../ui/card";

const KpiSection = () => {
  return (
    <Card>
      <TypographyH3 indicatorColor="bg-orange-200" withIndicator>
        Metrics
      </TypographyH3>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 bg-accent p-2 rounded-xl">
        <KPICard
          title="Top Model Used"
          icon={<BotMessageSquare className="w-4 h-4" />}
        >
          <div className="flex items-center gap-2">
            <span className="text-3xl font-semibold w-[50%]">
              <div className="flex items-baseline relative">
                <img
                  src={claudeLogo}
                  alt="Claude"
                  className="w-5 h-5 absolute left-[-14px] top-[-5px] rounded-md bg-background"
                />
                Claude 3.5 Sonnet
              </div>
            </span>
            <div className="flex flex-col gap-2 h-full!">
              <Badge variant="success">42%</Badge>
              <TypographySmall>Increase</TypographySmall>
            </div>
          </div>
        </KPICard>
        <KPICard
          title="Total Revenue"
          icon={<DollarSign className="w-4 h-4" />}
          value={125000}
          currency="INR"
        />
        <KPICard
          title="Total Users"
          icon={<DollarSign className="w-4 h-4" />}
          value={1500}
        />
        <div className="p-3 bg-background rounded-lg">
          <div className="flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-purple-400 p-1 bg-accent rounded-md" />
            <TypographyH4 className="">Value</TypographyH4>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default KpiSection;
