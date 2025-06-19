import { Button } from "@/components/ui/button";
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
    <BaseWidget>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Calendar className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <h3 className="text-white font-medium text-sm">Meeting Reminder</h3>
            <p className="text-gray-400 text-xs">Upcoming meeting with your manager</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-white text-sm font-medium">{meetingTitle}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-gray-400 text-sm">{meetingDate} at {meetingTime}</span>
          </div>

          <div className="flex items-start gap-2">
            <Users className="w-4 h-4 text-gray-500 mt-0.5" />
            <div>
              <span className="text-gray-400 text-sm">Attendees:</span>
              <div className="mt-1">
                {attendees.map((attendee, index) => (
                  <div key={index} className="text-gray-400 text-sm">
                    • {attendee}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
          <h4 className="text-white font-medium text-sm mb-2">Prepared Report</h4>
          <p className="text-gray-400 text-sm mb-3">{reportContent}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              Report will be automatically sent before each meeting
            </span>
            <Button
              onClick={handleSendReport}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 h-auto"
            >
              <Send className="w-3 h-3 mr-1" />
              Send Report
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <div>
            <p className="text-white text-sm font-medium">Auto-generate reports?</p>
            <p className="text-gray-400 text-xs">
              Automatically send this report before each weekly meeting
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onActionComplete}
            className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 text-xs px-3 py-1 h-auto"
          >
            Enable
          </Button>
        </div>
      </div>
    </BaseWidget>
  );
}