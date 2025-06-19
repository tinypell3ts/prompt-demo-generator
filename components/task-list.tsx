import { Button } from "@/components/ui/button";
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
  const getDifficultyColor = (difficulty: Task['difficulty']) => {
    switch (difficulty) {
      case "Beginner":
        return 'bg-green-500/20 text-green-400';
      case "Intermediate":
        return 'bg-yellow-500/20 text-yellow-400';
      case "Advanced":
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <BaseWidget>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-green-400" />
          <h3 className="text-white font-medium text-sm">Open Source Tasks</h3>
        </div>
        
        <div className="space-y-4">
          {tasks.map((task, index) => (
            <div key={task.id} className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="text-white font-medium text-sm">{task.title}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded ${getDifficultyColor(task.difficulty)}`}>
                      {task.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {task.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="text-blue-400 text-sm font-medium">
                      {task.amount} {task.currency}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <ExternalLink className="h-3 w-3" />
                      <span>{task.repository}</span>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => onActionComplete && onActionComplete(task)}
                  className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 h-auto ml-4"
                >
                  Accept Task
                </Button>
              </div>
              {index < tasks.length - 1 && (
                <div className="border-b border-gray-800 my-4" />
              )}
            </div>
          ))}
        </div>
      </div>
    </BaseWidget>
  );
}