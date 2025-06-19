import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

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
  const getVariantStyles = (variant: string) => {
    switch (variant) {
      case "success":
        return "border-green-200 bg-green-50";
      case "warning":
        return "border-yellow-200 bg-yellow-50";
      case "info":
        return "border-blue-200 bg-blue-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  const getButtonVariant = (variant: string) => {
    switch (variant) {
      case "success":
        return "default";
      case "warning":
        return "secondary";
      case "info":
        return "outline";
      default:
        return "default";
    }
  };

  return (
    <Card className={`p-4 ${getVariantStyles(variant)}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-gray-800 leading-relaxed">{message}</p>
        </div>
        <div className="flex-shrink-0">
          <Button 
            onClick={onActionComplete}
            variant={getButtonVariant(variant) as any}
            size="sm"
            className="flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            {actionText}
          </Button>
        </div>
      </div>
    </Card>
  );
} 