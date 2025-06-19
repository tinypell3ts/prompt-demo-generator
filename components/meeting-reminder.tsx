import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, Send, Users } from "lucide-react";

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
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900">Meeting Reminder</h3>
            <p className="text-sm text-gray-600">Upcoming meeting with your manager</p>
          </div>
        </div>

        {/* Meeting Details */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-700">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="font-medium">{meetingTitle}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span>{meetingDate} at {meetingTime}</span>
          </div>

          <div className="flex items-start gap-2 text-sm text-gray-600">
            <Users className="w-4 h-4 text-gray-500 mt-0.5" />
            <div>
              <span className="font-medium">Attendees:</span>
              <div className="mt-1">
                {attendees.map((attendee, index) => (
                  <span key={index} className="block text-gray-600">
                    • {attendee}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Report Section */}
        <div className="bg-white rounded-lg p-4 border border-blue-100">
          <h4 className="font-medium text-gray-900 mb-2">Prepared Report</h4>
          <p className="text-sm text-gray-600 mb-3">{reportContent}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
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

        {/* Auto-schedule Option */}
        <div className="flex items-center justify-between p-3 bg-blue-100 rounded-lg">
          <div>
            <p className="text-sm font-medium text-blue-900">
              Auto-generate reports?
            </p>
            <p className="text-xs text-blue-700">
              Automatically send this report before each weekly meeting
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-blue-300 text-blue-700 hover:bg-blue-200"
            onClick={onActionComplete}
          >
            Enable
          </Button>
        </div>
      </div>
    </Card>
  );
} 