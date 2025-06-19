import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DivideIcon as LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface BaseWidgetProps {
  title: string;
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
  variant?: "default" | "success" | "warning" | "info" | "destructive";
}

export default function BaseWidget({ 
  title, 
  icon: Icon, 
  children, 
  className = "",
  variant = "default" 
}: BaseWidgetProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20";
      case "warning":
        return "border-yellow-200 bg-yellow-50/50 dark:border-yellow-800 dark:bg-yellow-950/20";
      case "info":
        return "border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20";
      case "destructive":
        return "border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20";
      default:
        return "border-gray-200 bg-gray-50/50 dark:border-gray-800 dark:bg-gray-950/20";
    }
  };

  return (
    <Card className={`w-full max-w-2xl mx-auto ${getVariantStyles()} ${className}`}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          {Icon && <Icon className="h-5 w-5" />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {children}
      </CardContent>
    </Card>
  );
}