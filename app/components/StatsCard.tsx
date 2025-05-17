
import { Card, CardContent } from "../components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change?: string;
  positive?: boolean;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  change,
  positive = true,
  className,
}) => {
  return (
    <Card className={cn("bg-secondary border-border/40 overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <h4 className="text-2xl font-bold text-white mt-1">{value}</h4>
            {change && (
              <div className="flex items-center mt-1">
                <span
                  className={cn(
                    "text-xs font-medium",
                    positive ? "text-green-500" : "text-red-500"
                  )}
                >
                  {positive ? "+" : "-"}{change}
                </span>
                <span className="text-xs text-muted-foreground ml-1">vs. last week</span>
              </div>
            )}
          </div>
          <div className="p-2 rounded-full bg-tellnearn-yellow/20 text-tellnearn-yellow">
            <Icon size={20} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
