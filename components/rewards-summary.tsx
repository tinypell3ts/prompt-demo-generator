import { Award } from "lucide-react";
import BaseWidget from "./base-widget";

interface RewardSummaryProps {
  taskName: string;
  rewardAmount: number;
  currency: string;
}

export default function RewardSummary({ taskName, rewardAmount, currency }: RewardSummaryProps) {
  return (
    <BaseWidget>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-yellow-400" />
          <h3 className="text-white font-medium text-sm">Task Summary</h3>
        </div>
        
        <div className="space-y-3">
          <div>
            <p className="text-gray-400 text-xs mb-1">Task Completed</p>
            <p className="text-white text-sm font-medium">{taskName}</p>
          </div>
          
          <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium text-sm">Reward Earned</h4>
                <p className="text-gray-400 text-xs">Payment processed successfully</p>
              </div>
              <div className="text-right">
                <div className="text-green-400 font-bold text-lg">
                  {rewardAmount} {currency}
                </div>
                <span className="text-green-400 text-xs">Confirmed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseWidget>
  );
}