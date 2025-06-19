import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, ArrowRight, Clock, MessageSquare, TrendingUp } from "lucide-react";
import BaseWidget from "./base-widget";

export interface Action {
  id: string;
  type: 'alert' | 'positive' | 'neutral' | 'action';
  title: string;
  description: string;
  time: string;
  action: string;
}

interface CommunityActionsProps {
  actions: Action[];
  onActionComplete?: () => void;
}

export default function CommunityActions({ actions, onActionComplete }: CommunityActionsProps) {
  const getTypeConfig = (type: Action['type']) => {
    switch (type) {
      case 'alert':
        return {
          icon: AlertTriangle,
          badgeVariant: 'destructive' as const,
          badgeText: 'Alert',
          buttonVariant: 'destructive' as const
        };
      case 'positive':
        return {
          icon: TrendingUp,
          badgeVariant: 'default' as const,
          badgeText: 'Positive',
          buttonVariant: 'default' as const
        };
      case 'neutral':
        return {
          icon: MessageSquare,
          badgeVariant: 'secondary' as const,
          badgeText: 'Neutral',
          buttonVariant: 'secondary' as const
        };
      case 'action':
        return {
          icon: Clock,
          badgeVariant: 'outline' as const,
          badgeText: 'Action Required',
          buttonVariant: 'default' as const
        };
      default:
        return {
          icon: MessageSquare,
          badgeVariant: 'secondary' as const,
          badgeText: 'Info',
          buttonVariant: 'secondary' as const
        };
    }
  };

  const hasAlerts = actions.some(action => action.type === 'alert');

  return (
    <BaseWidget 
      title="Community Actions" 
      icon={MessageSquare}
      variant={hasAlerts ? "destructive" : "default"}
    >
      <div className="space-y-4">
        {actions.map((action, index) => {
          const config = getTypeConfig(action.type);
          const IconComponent = config.icon;
          
          return (
            <div key={action.id}>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    action.type === 'alert' ? 'bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400' :
                    action.type === 'positive' ? 'bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400' :
                    action.type === 'action' ? 'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400' :
                    'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                  }`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-base">{action.title}</h3>
                        <Badge variant={config.badgeVariant} className="text-xs">
                          {config.badgeText}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {action.time}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {action.description}
                    </p>
                    <div className="pt-1">
                      <Button 
                        variant={config.buttonVariant}
                        size="sm"
                        onClick={onActionComplete}
                        className="group"
                      >
                        {action.action}
                        <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              {index < actions.length - 1 && <Separator className="my-4" />}
            </div>
          );
        })}
      </div>
    </BaseWidget>
  );
}