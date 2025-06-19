import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Code2, ExternalLink } from "lucide-react";
import BaseWidget from "./base-widget";

export interface Task {
  id: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  amount: number;
  currency: string;
  repository: string;
  issueLink: string;
}

interface TaskListProps {
  tasks: Task[];
  onActionComplete?: (task: Task) => void;
}

export default function TaskList({ tasks, onActionComplete }: TaskListProps) {
  const getDifficultyConfig = (difficulty: Task['difficulty']) => {
    switch (difficulty) {
      case "Beginner":
        return { variant: 'default' as const, color: 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400' };
      case "Intermediate":
        return { variant: 'secondary' as const, color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400' };
      case "Advanced":
        return { variant: 'destructive' as const, color: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400' };
      default:
        return { variant: 'secondary' as const, color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' };
    }
  };

  return (
    <BaseWidget title="Open Source Tasks" icon={Code2} variant="success">
      <div className="space-y-4">
        {tasks.map((task, index) => {
          const difficultyConfig = getDifficultyConfig(task.difficulty);
          
          return (
            <div key={task.id}>
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-base">{task.title}</h3>
                      <Badge className={`text-xs ${difficultyConfig.color}`} variant="secondary">
                        {task.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {task.description}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                          {task.amount} {task.currency}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <ExternalLink className="h-3 w-3" />
                        <span>{task.repository}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => onActionComplete && onActionComplete(task)}
                    className="bg-green-600 hover:bg-green-700 text-white ml-4"
                  >
                    Accept Task
                  </Button>
                </div>
              </div>
              {index < tasks.length - 1 && <Separator className="my-4" />}
            </div>
          );
        })}
      </div>
    </BaseWidget>
  );
}