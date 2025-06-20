import { Button } from "@/components/ui/button";
import { AlertTriangle, BarChart3, FileText, TrendingUp, Users, X } from "lucide-react";
import BaseWidget from "./base-widget";

export interface ViewReportProps {
  onClose?: () => void;
  onActionComplete?: () => void;
}

export default function ViewReport({ onClose, onActionComplete }: ViewReportProps) {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    if (onActionComplete) {
      onActionComplete();
    }
  };

  return (
    <BaseWidget className="max-w-3xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <FileText className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-white dark:text-white light:text-gray-900 font-medium text-lg">Community Health Report</h3>
              <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-sm">Generated on {new Date().toLocaleDateString()}</p>
            </div>
          </div>
          <Button
            onClick={handleClose}
            size="sm"
            variant="ghost"
            className="text-gray-400 dark:text-gray-400 light:text-gray-600 hover:text-white dark:hover:text-white light:hover:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-800 light:hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Moderation Issues Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
            <h4 className="text-white dark:text-white light:text-gray-900 font-medium text-sm">Moderation Issues</h4>
          </div>
          <div className="bg-gray-900/50 dark:bg-gray-900/50 light:bg-gray-50 rounded-lg p-4 border border-gray-800 dark:border-gray-800 light:border-gray-200 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-sm">Average Response Time</span>
              <span className="text-yellow-400 text-sm font-medium">4.2 hours (+35%)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-sm">Active Reports</span>
              <span className="text-red-400 text-sm font-medium">23 pending</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-sm">Spam Alerts</span>
              <span className="text-orange-400 text-sm font-medium">8 flagged accounts</span>
            </div>
            <div className="mt-3 p-3 bg-yellow-500/10 rounded border border-yellow-500/20">
              <p className="text-yellow-400 text-xs">
                <strong>Recommendation:</strong> Add 1-2 new moderators during peak hours (12PM-6PM EST)
              </p>
            </div>
          </div>
        </div>

        {/* Engagement Metrics Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-green-400" />
            <h4 className="text-white dark:text-white light:text-gray-900 font-medium text-sm">Engagement Metrics</h4>
          </div>
          <div className="bg-gray-900/50 dark:bg-gray-900/50 light:bg-gray-50 rounded-lg p-4 border border-gray-800 dark:border-gray-800 light:border-gray-200 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-sm">Daily Active Users</span>
              <span className="text-green-400 text-sm font-medium">2,847 (+12%)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-sm">Feature X Mentions</span>
              <span className="text-green-400 text-sm font-medium">156 (+40%)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-sm">Community Sentiment</span>
              <span className="text-green-400 text-sm font-medium">89% positive</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-sm">Thread Engagement</span>
              <span className="text-blue-400 text-sm font-medium">47 replies avg</span>
            </div>
          </div>
        </div>

        {/* Upcoming Initiatives Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <h4 className="text-white dark:text-white light:text-gray-900 font-medium text-sm">Upcoming Initiatives</h4>
          </div>
          <div className="bg-gray-900/50 dark:bg-gray-900/50 light:bg-gray-50 rounded-lg p-4 border border-gray-800 dark:border-gray-800 light:border-gray-200 space-y-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-sm">Dark Mode Feature Discussion</span>
                <span className="text-xs text-gray-500 dark:text-gray-500 light:text-gray-600 ml-auto">This week</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-sm">Twitter Spaces: Feature X Deep Dive</span>
                <span className="text-xs text-gray-500 dark:text-gray-500 light:text-gray-600 ml-auto">24 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-sm">Moderator Recruitment Drive</span>
                <span className="text-xs text-gray-500 dark:text-gray-500 light:text-gray-600 ml-auto">Next week</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-sm">Community Guidelines Update</span>
                <span className="text-xs text-gray-500 dark:text-gray-500 light:text-gray-600 ml-auto">Month end</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Contributors Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-cyan-400" />
            <h4 className="text-white dark:text-white light:text-gray-900 font-medium text-sm">Key Contributors</h4>
          </div>
          <div className="bg-gray-900/50 dark:bg-gray-900/50 light:bg-gray-50 rounded-lg p-4 border border-gray-800 dark:border-gray-800 light:border-gray-200">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white font-medium">SC</div>
                  <div>
                    <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-sm">Sarah Chen</p>
                    <p className="text-gray-500 dark:text-gray-500 light:text-gray-600 text-xs">Leading Feature X discussions</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs text-white font-medium">MR</div>
                  <div>
                    <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-sm">Mike Rodriguez</p>
                    <p className="text-gray-500 dark:text-gray-500 light:text-gray-600 text-xs">High engagement in help channels</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-xs text-white font-medium">AT</div>
                  <div>
                    <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-sm">Alex Thompson</p>
                    <p className="text-gray-500 dark:text-gray-500 light:text-gray-600 text-xs">Quick response moderator</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-xs text-white font-medium">ED</div>
                  <div>
                    <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-sm">Emily Davis</p>
                    <p className="text-gray-500 dark:text-gray-500 light:text-gray-600 text-xs">Community event organizer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseWidget>
  );
}