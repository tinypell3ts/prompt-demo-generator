import { Badge } from "@/components/ui/badge";
import { Award } from "lucide-react";
import BaseWidget from "./base-widget";

interface RewardSummaryProps {
  taskName: string;
  rewardAmount: number;
  currency: string;
}

export default function RewardSummary({ taskName, rewardAmount, currency }: RewardSummaryProps) {
  return (
    <BaseWidget title="Task Summary" icon={Award} variant="success">
      <div className="space-y-4">
        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Task Completed</h3>
            <p className="text-base font-semibold">{taskName}</p>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
            <div>
              <h4 className="text-sm font-medium">Reward Earned</h4>
              <p className="text-xs text-muted-foreground">Payment processed successfully</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-green-600 dark:text-green-400">
                {rewardAmount} {currency}
              </div>
              <Badge variant="outline" className="text-xs border-green-300 text-green-700 dark:border-green-700 dark:text-green-400">
                Confirmed
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </BaseWidget>
  );
}