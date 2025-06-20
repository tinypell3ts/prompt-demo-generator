import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import BaseWidget from "./base-widget";

export interface AIMessageWithActionProps {
  message: string;
  actionText?: string;
  onActionComplete?: () => void;
  onToastAction?: (message: string, type?: string) => void;
  variant?: "default" | "success" | "warning" | "info";
}

export default function AIMessageWithAction({ 
  message, 
  actionText = "Send", 
  onActionComplete,
  onToastAction,
  variant = "default" 
}: AIMessageWithActionProps) {
  
  const handleAction = () => {
    // Trigger toast notification
    if (onToastAction) {
      onToastAction("Message sent to #announcements", "discord");
    }
    
    // Continue with normal flow
    if (onActionComplete) {
      onActionComplete();
    }
  };

  return (
    <BaseWidget>
      <div className="space-y-4">
        <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-sm leading-relaxed">{message}</p>
        
        <div className="flex justify-end">
          <Button 
            onClick={handleAction}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 h-auto"
          >
            <Send className="w-3 h-3 mr-1" />
            {actionText}
          </Button>
        </div>
      </div>
    </BaseWidget>
  );
}