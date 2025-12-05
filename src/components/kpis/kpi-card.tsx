import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TypographyH2, TypographyLead } from "@/components/ui/typography";
interface KPICardProps {
  title: string;
  icon: React.ReactNode;
  value?: number;
  loading?: boolean;
  prefix?: string;
  suffix?: string;
  currency?: string;
  children?: React.ReactNode;
}
const KPICard = ({
  title,
  icon,
  value,
  loading = false,
  prefix,
  suffix,
  currency,
  children,
}: KPICardProps) => {
  // Add debugging
  console.log("KPICard Debug:", {
    title,
    value,
    loading,
    prefix,
    suffix,
    currency,
  });

  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <Card className="p-4 gap-2 border-0 shadow-none">
      <CardHeader className="p-0 gap-0">
        <CardTitle className="flex items-center gap-2">
          <div className="p-1 bg-accent rounded-sm">{icon}</div>
          <TypographyLead className="font-medium">{title}</TypographyLead>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 pt-2">
        {loading ? (
          <Skeleton className="h-[32px] w-[80px] rounded-md" />
        ) : children ? (
          children
        ) : (
          <TypographyH2 className="text-5xl font-semibold">
            {USDollar.format(value || 0)}
          </TypographyH2>
        )}
      </CardContent>
    </Card>
  );
};

export default KPICard;
