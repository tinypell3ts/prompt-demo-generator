import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type React from "react";

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

const TaskList: React.FC<TaskListProps> = ({ tasks, onActionComplete }) => {
  return (
    <Card className="bg-[#1A1A1A] border-0 rounded-xl w-full text-white">
      <CardHeader>
        <CardTitle>Open Source Tasks</CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0 space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="border-b border-gray-800 pb-4 last:border-b-0">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">{task.title}</h3>
                <p className="text-gray-400 text-sm">{task.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`
                    px-2 py-1 rounded-full text-xs
                    ${
                      task.difficulty === "Beginner"
                        ? "bg-green-600/20 text-green-400"
                        : task.difficulty === "Intermediate"
                        ? "bg-yellow-600/20 text-yellow-400"
                        : "bg-red-600/20 text-red-400"
                    }
                  `}
                  >
                    {task.difficulty}
                  </span>
                  <span className="text-blue-400 text-sm">
                    {task.amount} {task.currency}
                  </span>
                </div>
              </div>
              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => onActionComplete && onActionComplete(task)}
              >
                Accept Task
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TaskList;
