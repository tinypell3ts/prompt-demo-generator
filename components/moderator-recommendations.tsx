import { Button } from "@/components/ui/button";
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

type Props = {
  onActionComplete?: () => void;
};

export default function ModeratorRecommendations({ onActionComplete }: Props) {
  return (
    <BaseWidget>
      <div className="space-y-4">
        <div>
          <h3 className="text-white dark:text-white light:text-gray-900 font-medium text-sm mb-1">Recommended Moderators</h3>
          <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-xs">
            Based on activity, message count, and response times
          </p>
        </div>
        
        <div className="space-y-3">
          {recommendedModerators.map((mod, index) => (
            <div key={mod.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <span className="text-purple-400 font-medium text-xs">{mod.initials}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white dark:text-white light:text-gray-900 text-sm font-medium">{mod.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      mod.status === 'Positive' ? 'bg-green-500/20 text-green-400' :
                      mod.status === 'Negative' ? 'bg-red-500/20 text-red-400' :
                      'bg-gray-500/20 text-gray-400 dark:text-gray-400 light:text-gray-600'
                    }`}>
                      {mod.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 light:text-gray-600">{mod.activity}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-white dark:text-white light:text-gray-900 text-sm">{mod.messages.toLocaleString()}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 light:text-gray-600">{mod.avgResponse}</div>
                </div>
                <Button
                  size="sm"
                  onClick={onActionComplete}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3 py-1 h-auto"
                >
                  Assign Discord Role
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseWidget>
  );
}