import { Button } from "@/components/ui/button";
import { Calendar, MoreHorizontal, Users } from "lucide-react";
import BaseWidget from "./base-widget";

export interface TwitterSpaceProps {
  title?: string;
  host?: string;
  date?: string;
  time?: string;
  attendees?: number;
  isVerified?: boolean;
  onJoin?: () => void;
  onActionComplete?: () => void;
}

export default function TwitterSpace({
  title = "Threadreader x TwitterDev",
  host = "Twitter Dev",
  date = "14 Sep",
  time = "11:30 pm",
  attendees = 6,
  isVerified = true,
  onJoin,
  onActionComplete
}: TwitterSpaceProps) {
  const handleJoin = () => {
    if (onJoin) {
      onJoin();
    }
    if (onActionComplete) {
      onActionComplete();
    }
  };

  return (
    <BaseWidget className="bg-gradient-to-br from-purple-600 to-blue-600 border-0 text-white">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-current"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
              <div>
                <span className="text-white font-medium text-sm">{host}</span>
                {isVerified && (
                  <div className="flex items-center gap-1 mt-0.5">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4 fill-current text-white"
                      aria-hidden="true"
                    >
                      <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.27 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z" />
                    </svg>
                    <span className="text-xs text-white/80">Host</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10"
          >
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>

        {/* Title */}
        <div>
          <h2 className="text-white font-bold text-xl leading-tight">
            {title}
          </h2>
        </div>

        {/* Event Details */}
        <div className="flex items-center gap-4 text-white/90">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">{date}, {time}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span className="text-sm">{attendees} going</span>
          </div>
        </div>

        {/* Live Indicator */}
        <div className="flex items-center gap-2 pt-2">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-white/80">Scheduled</span>
          </div>
        </div>
      </div>
    </BaseWidget>
  );
}