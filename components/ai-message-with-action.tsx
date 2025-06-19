import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Send, MessageCircle } from "lucide-react";
import BaseWidget from "./base-widget";

export interface AIMessageWithActionProps {
  message: string;
  actionText?: string;
  onActionComplete?: () => void;
  variant?: "default" | "success" | "warning" | "info";
}

export default function AIMessageWithAction({ 
  message, 
  actionText = "Send", 
  onActionComplete,
  variant = "default" 
}: AIMessageWithActionProps) {
  const getVariantConfig = () => {
    switch (variant) {
      case "success":
        return { badgeText: "Success", badgeVariant: "default" as const };
      case "warning":
        return { badgeText: "Warning", badgeVariant: "secondary" as const };
      case "info":
        return { badgeText: "Info", badgeVariant: "outline" as const };
      default:
        return { badgeText: "Message", badgeVariant: "secondary" as const };
    }
  };

  const config = getVariantConfig();

  return (
    <BaseWidget 
      title="AI Assistant" 
      icon={MessageCircle} 
      variant={variant}
    >
      <div className="space-y-4">
        <div className="flex items-start gap-2">
          <Badge variant={config.badgeVariant} className="text-xs">
            {config.badgeText}
          </Badge>
        </div>
        
        <p className="text-sm leading-relaxed">{message}</p>
        
        <div className="flex justify-end">
          <Button 
            onClick={onActionComplete}
            size="sm"
            className="flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            {actionText}
          </Button>
        </div>
      </div>
    </BaseWidget>
  );
}