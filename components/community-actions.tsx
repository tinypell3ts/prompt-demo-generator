import { Button } from "@/components/ui/button";
import { AlertTriangle, TrendingUp, MessageSquare, Clock } from "lucide-react";
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
          color: 'text-red-400',
          bg: 'bg-red-500/10'
        };
      case 'positive':
        return {
          icon: TrendingUp,
          color: 'text-green-400',
          bg: 'bg-green-500/10'
        };
      case 'neutral':
        return {
          icon: MessageSquare,
          color: 'text-gray-400 dark:text-gray-400 light:text-gray-600',
          bg: 'bg-gray-500/10'
        };
      case 'action':
        return {
          icon: Clock,
          color: 'text-blue-400',
          bg: 'bg-blue-500/10'
        };
      default:
        return {
          icon: MessageSquare,
          color: 'text-gray-400 dark:text-gray-400 light:text-gray-600',
          bg: 'bg-gray-500/10'
        };
    }
  };

  return (
    <BaseWidget>
      <div className="space-y-4">
        {actions.map((action, index) => {
          const config = getTypeConfig(action.type);
          const IconComponent = config.icon;
          
          return (
            <div key={action.id} className="space-y-3">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${config.bg}`}>
                  <IconComponent className={`h-4 w-4 ${config.color}`} />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-white dark:text-white light:text-gray-900 text-sm">{action.title}</h3>
                    <span className="text-xs text-gray-500 dark:text-gray-500 light:text-gray-600">{action.time}</span>
                  </div>
                  <p className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed">
                    {action.description}
                  </p>
                  <Button 
                    variant="ghost"
                    size="sm"
                    onClick={onActionComplete}
                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 p-0 h-auto font-normal"
                  >
                    {action.action} →
                  </Button>
                </div>
              </div>
              {index < actions.length - 1 && (
                <div className="border-b border-gray-800 dark:border-gray-800 light:border-gray-200 my-4" />
              )}
            </div>
          );
        })}
      </div>
    </BaseWidget>
  );
}