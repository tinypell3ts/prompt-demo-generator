import { Card } from "./ui/card";

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
  const getTypeStyles = (type: Action['type']) => {
    switch (type) {
      case 'alert':
        return 'bg-red-100 text-red-800';
      case 'positive':
        return 'bg-green-100 text-green-800';
      case 'neutral':
        return 'bg-gray-100 text-gray-800';
      case 'action':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">Community Actions</h2>
      {actions.map((action) => (
        <Card key={action.id} className="p-4 bg-transparent">
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeStyles(action.type)}`}>
                  {action.type.charAt(0).toUpperCase() + action.type.slice(1)}
                </span>
                <span className="text-sm text-gray-500">{action.time}</span>
              </div>
              <h3 className="font-semibold text-lg">{action.title}</h3>
              <p className="text-gray-600">{action.description}</p>
              <button className="mt-2 text-blue-600 hover:text-blue-800 font-medium" onClick={onActionComplete}>
                {action.action} →
              </button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
} 