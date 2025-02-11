import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type React from "react";

interface RewardSummaryProps {
  taskName: string;
  rewardAmount: number;
  currency: string;
}

const RewardSummary: React.FC<RewardSummaryProps> = ({ taskName, rewardAmount, currency }) => {
  return (
    <Card className="bg-[#1A1A1A] border-0 rounded-xl w-full text-white">
      <CardHeader>
        <CardTitle>Task Summary</CardTitle>
        <CardDescription>Review the task details below:</CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="space-y-2">
          <p>
            <strong>Task:</strong> {taskName}
          </p>
          <p>
            <strong>Reward:</strong> {rewardAmount} {currency}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RewardSummary;
