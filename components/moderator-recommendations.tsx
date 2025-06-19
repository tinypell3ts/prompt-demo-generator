import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Users } from "lucide-react";
import BaseWidget from "./base-widget";

type Moderator = {
  initials: string;
  name: string;
  status: "Positive" | "Neutral" | "Negative";
  messages: number;
  avgResponse: string;
  activity: string;
};

const recommendedModerators: Moderator[] = [
  {
    initials: "SC",
    name: "Sarah Chen",
    status: "Positive",
    messages: 1247,
    avgResponse: "2.3 min avg",
    activity: "Most active",
  },
  {
    initials: "MR",
    name: "Mike Rodriguez",
    status: "Neutral",
    messages: 892,
    avgResponse: "4.1 min avg",
    activity: "High engagement",
  },
  {
    initials: "AT",
    name: "Alex Thompson",
    status: "Positive",
    messages: 756,
    avgResponse: "1.8 min avg",
    activity: "Quick responder",
  },
];

const statusStyles: Record<string, string> = {
  Positive: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
  Neutral: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  Negative: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
};

type Props = {
  onActionComplete?: () => void;
};

export default function ModeratorRecommendations({ onActionComplete }: Props) {
  return (
    <BaseWidget title="Recommended Moderators" icon={Users} variant="info">
      <div className="space-y-1 mb-4">
        <p className="text-sm text-muted-foreground">
          Based on activity, message count, and response times
        </p>
      </div>
      <div className="space-y-4">
        {recommendedModerators.map((mod, index) => (
          <div key={mod.name}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-950 flex items-center justify-center font-bold text-purple-700 dark:text-purple-400">
                  {mod.initials}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-base">{mod.name}</span>
                    <Badge
                      className={`text-xs ${statusStyles[mod.status]}`}
                      variant="secondary"
                    >
                      {mod.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">{mod.activity}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="font-medium text-sm">{mod.messages.toLocaleString()} msgs</div>
                  <div className="text-xs text-muted-foreground">{mod.avgResponse}</div>
                </div>
                <Button
                  size="sm"
                  onClick={onActionComplete}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Assign Role
                </Button>
              </div>
            </div>
            {index < recommendedModerators.length - 1 && <Separator className="my-4" />}
          </div>
        ))}
      </div>
    </BaseWidget>
  );
}