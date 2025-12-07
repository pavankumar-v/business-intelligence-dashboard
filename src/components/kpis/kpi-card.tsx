import { Card, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TypographyH2, TypographyLead } from "@/components/ui/typography";
interface KPICardProps {
  title: string;
  icon: React.ReactNode;
  value?: number;
  loading?: boolean;
  prefix?: string;
  suffix?: string;
  children?: React.ReactNode;
}
const KPICard = ({
  title,
  icon,
  value,
  loading = false,
  children,
}: KPICardProps) => {
  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <Card className="flex flex-col justify-between gap-3">
      <CardTitle className="flex items-center gap-2">
        <div className="p-1 bg-accent rounded-sm">{icon}</div>
        <TypographyLead className="font-medium">{title}</TypographyLead>
      </CardTitle>
      <div className="p-0 pt-2">
        {loading ? (
          <Skeleton className="h-[76px] w-[300px] rounded-xl" />
        ) : children ? (
          children
        ) : (
          <TypographyH2 className="text-5xl font-semibold">
            {USDollar.format(value || 0)}
          </TypographyH2>
        )}
      </div>
    </Card>
  );
};

export default KPICard;
