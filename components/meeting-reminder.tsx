import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, Send, Users } from "lucide-react";
import BaseWidget from "./base-widget";

export interface MeetingReminderProps {
  meetingTitle?: string;
  meetingTime?: string;
  meetingDate?: string;
  attendees?: string[];
  reportContent?: string;
  onSendReport?: () => void;
  onActionComplete?: () => void;
}

export default function MeetingReminder({
  meetingTitle = "Weekly Manager Meeting",
  meetingTime = "2:00 PM",
  meetingDate = "Today",
  attendees = ["Your Manager", "Team Lead"],
  reportContent = "Community health report covering moderation issues, engagement metrics, and upcoming initiatives",
  onSendReport,
  onActionComplete
}: MeetingReminderProps) {
  const handleSendReport = () => {
    if (onSendReport) {
      onSendReport();
    }
    if (onActionComplete) {
      onActionComplete();
    }
  };

  return (
    <BaseWidget title="Meeting Reminder" icon={Calendar} variant="info">
      <div className="space-y-4">
        {/* Meeting Details */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-950 rounded-lg">
              <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-base">{meetingTitle}</h3>
              <p className="text-sm text-muted-foreground">{meetingDate} at {meetingTime}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <Users className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <span className="font-medium text-sm">Attendees:</span>
              <div className="mt-1 space-y-1">
                {attendees.map((attendee, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">{attendee}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Report Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-base">Prepared Report</h4>
            <Badge variant="outline" className="text-xs">Ready</Badge>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{reportContent}</p>
          
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-muted-foreground">
              Report will be automatically sent before each meeting
            </span>
            <Button
              onClick={handleSendReport}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Report
            </Button>
          </div>
        </div>

        <Separator />

        {/* Auto-schedule Option */}
        <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div>
            <p className="text-sm font-medium">Auto-generate reports?</p>
            <p className="text-xs text-muted-foreground">
              Automatically send this report before each weekly meeting
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onActionComplete}
            className="border-blue-300 text-blue-700 hover:bg-blue-100 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-950"
          >
            Enable
          </Button>
        </div>
      </div>
    </BaseWidget>
  );
}