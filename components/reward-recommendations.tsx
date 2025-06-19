import { Button } from "@/components/ui/button";
import { Award, Github, Send } from "lucide-react";
import { BsDiscord, BsTelegram } from "react-icons/bs";
import BaseWidget from "./base-widget";

interface Contributor {
  name: string;
  platform: "github" | "discord" | "telegram";
  contribution: string;
  recommendedReward: string;
  contributionMetrics?: string;
  avatar?: string;
}

export interface RewardRecommendationsProps {
  contributors?: Contributor[];
  onRewardAll?: () => void;
  onRewardSingle?: (contributor: Contributor) => void;
  onActionComplete?: () => void;
}

export default function RewardRecommendations({
  contributors = [
    {
      name: "Sarah Chen",
      platform: "discord",
      contribution: "Led Feature X discussions and helped 24 community members",
      recommendedReward: "50 $OPEN",
      contributionMetrics: "47 replies, 89% positive sentiment",
      avatar: "SC"
    },
    {
      name: "Mike Rodriguez",
      platform: "github",
      contribution: "Submitted 3 PRs improving smart contract security",
      recommendedReward: "75 $OPEN",
      contributionMetrics: "128 additions, 45 deletions, 4 files changed",
      avatar: "MR"
    },
    {
      name: "Alex Thompson",
      platform: "telegram",
      contribution: "Provided technical support and documentation improvements",
      recommendedReward: "35 $OPEN",
      contributionMetrics: "56 messages, 12 resources shared",
      avatar: "AT"
    }
  ],
  onRewardAll,
  onRewardSingle,
  onActionComplete
}: RewardRecommendationsProps) {
  const handleRewardAll = () => {
    if (onRewardAll) {
      onRewardAll();
    }
    if (onActionComplete) {
      onActionComplete();
    }
  };

  const handleRewardSingle = (contributor: Contributor) => {
    if (onRewardSingle) {
      onRewardSingle(contributor);
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "github":
        return <Github className="w-4 h-4 text-gray-400" />;
      case "discord":
        return <BsDiscord className="w-4 h-4 text-purple-400" />;
      case "telegram":
        return <BsTelegram className="w-4 h-4 text-blue-400" />;
      default:
        return null;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "github":
        return "bg-gray-500";
      case "discord":
        return "bg-purple-500";
      case "telegram":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <BaseWidget>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <Award className="w-4 h-4 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-white font-medium text-sm">Reward Recommendations</h3>
              <p className="text-gray-400 text-xs mt-0.5">Based on community contributions</p>
            </div>
          </div>
          <Button
            onClick={handleRewardAll}
            size="sm"
            className="bg-yellow-600 hover:bg-yellow-700 text-white text-xs px-3 py-1 h-auto"
          >
            <Send className="w-3 h-3 mr-1" />
            Reward All
          </Button>
        </div>

        {/* Contributors List */}
        <div className="space-y-4">
          {contributors.map((contributor, index) => (
            <div
              key={index}
              className="bg-gray-900/50 rounded-lg p-4 border border-gray-800 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {/* Avatar and Platform */}
                  <div className="relative">
                    <div className={`w-8 h-8 ${getPlatformColor(contributor.platform)} rounded-full flex items-center justify-center text-white text-sm font-medium`}>
                      {contributor.avatar}
                    </div>
                    <div className="absolute -bottom-1 -right-1 p-1 bg-gray-900 rounded-full">
                      {getPlatformIcon(contributor.platform)}
                    </div>
                  </div>

                  {/* Contributor Info */}
                  <div className="flex-1">
                    <h4 className="text-white text-sm font-medium">{contributor.name}</h4>
                    <p className="text-gray-400 text-sm mt-1">{contributor.contribution}</p>
                    {contributor.contributionMetrics && (
                      <p className="text-gray-500 text-xs mt-1">{contributor.contributionMetrics}</p>
                    )}
                  </div>
                </div>

                {/* Reward Amount and Button */}
                <div className="flex flex-col items-end gap-2">
                  <span className="text-yellow-400 font-medium text-sm">{contributor.recommendedReward}</span>
                  <Button
                    onClick={() => handleRewardSingle(contributor)}
                    variant="outline"
                    size="sm"
                    className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10 text-xs px-3 py-1 h-auto"
                  >
                    Send Reward
                  </Button>
                </div>
              </div>

              {/* Platform-specific metrics could go here */}
              <div className="pt-2 border-t border-gray-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Recommended based on recent activity</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          <div className="text-xs text-gray-500">
            <p>Total Rewards: {contributors.reduce((sum, c) => sum + parseInt(c.recommendedReward), 0)} $OPEN</p>
            <p className="mt-0.5">Across {contributors.length} contributors</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <Github className="w-3 h-3" />
              <span>GitHub</span>
            </div>
            <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
            <div className="flex items-center gap-1">
              <BsDiscord className="w-3 h-3" />
              <span>Discord</span>
            </div>
            <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
            <div className="flex items-center gap-1">
              <BsTelegram className="w-3 h-3" />
              <span>Telegram</span>
            </div>
          </div>
        </div>
      </div>
    </BaseWidget>
  );
} 