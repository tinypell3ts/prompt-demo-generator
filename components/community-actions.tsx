import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, ArrowRight, Clock, MessageSquare, TrendingUp } from "lucide-react";

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
          variant: 'destructive' as const,
          icon: AlertTriangle,
          badgeVariant: 'destructive' as const,
          badgeText: 'Alert'
        };
      case 'positive':
        return {
          variant: 'default' as const,
          icon: TrendingUp,
          badgeVariant: 'default' as const,
          badgeText: 'Positive'
        };
      case 'neutral':
        return {
          variant: 'default' as const,
          icon: MessageSquare,
          badgeVariant: 'secondary' as const,
          badgeText: 'Neutral'
        };
      case 'action':
        return {
          variant: 'default' as const,
          icon: Clock,
          badgeVariant: 'outline' as const,
          badgeText: 'Action Required'
        };
      default:
        return {
          variant: 'default' as const,
          icon: MessageSquare,
          badgeVariant: 'secondary' as const,
          badgeText: 'Info'
        };
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Community Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {actions.map((action, index) => {
          const config = getTypeConfig(action.type);
          const IconComponent = config.icon;
          
          return (
            <div key={action.id}>
              <Alert className={action.type === 'alert' ? 'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive' : ''}>
                <IconComponent className="h-4 w-4" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <AlertTitle className="flex items-center gap-2">
                      {action.title}
                      <Badge variant={config.badgeVariant} className="text-xs">
                        {config.badgeText}
                      </Badge>
                    </AlertTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {action.time}
                    </div>
                  </div>
                  <AlertDescription className="text-sm leading-relaxed">
                    {action.description}
                  </AlertDescription>
                  <div className="pt-2">
                    <Button 
                      variant={action.type === 'alert' ? 'destructive' : 'default'}
                      size="sm"
                      onClick={onActionComplete}
                      className="group"
                    >
                      {action.action}
                      <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </Alert>
              {index < actions.length - 1 && <Separator className="my-4" />}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}