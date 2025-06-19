type Moderator = {
  initials: string;
  name: string;
  status: "Positive" | "Neutral" | "Negative";
  messages: number;
  avgResponse: string;
  activity: string;
};

const recommendedModerators: Moderator[] = [
  {
    initials: "SC",
    name: "Sarah Chen",
    status: "Positive",
    messages: 1247,
    avgResponse: "2.3 min avg",
    activity: "Most active",
  },
  {
    initials: "MR",
    name: "Mike Rodriguez",
    status: "Neutral",
    messages: 892,
    avgResponse: "4.1 min avg",
    activity: "High engagement",
  },
  {
    initials: "AT",
    name: "Alex Thompson",
    status: "Positive",
    messages: 756,
    avgResponse: "1.8 min avg",
    activity: "Quick responder",
  },
];

const statusStyles: Record<string, string> = {
  Positive: "bg-green-100 text-green-700",
  Neutral: "bg-gray-100 text-gray-700",
  Negative: "bg-red-100 text-red-700",
};

type Props = {
  onActionComplete?: () => void;
};

export default function ModeratorRecommendations({ onActionComplete }: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-4 max-w-md">
      <div className="flex items-center mb-2">
        <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white mr-3">
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
            <circle cx="10" cy="10" r="8" fill="white" fillOpacity="0.2" />
            <path d="M10 4a6 6 0 016 6c0 4-6 6-6 6s-6-2-6-6a6 6 0 016-6zm0 2a4 4 0 00-4 4c0 2.67 2.67 4 4 4s4-1.33 4-4a4 4 0 00-4-4zm0 2a2 2 0 110 4 2 2 0 010-4z" fill="white"/>
          </svg>
        </div>
        <div>
          <div className="font-semibold text-gray-900">Recommended Moderators</div>
          <div className="text-xs text-gray-500">
            Based on activity, message count, and response times
          </div>
        </div>
      </div>
      <div className="mt-2">
        {recommendedModerators.map((mod) => (
          <div key={mod.name} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center font-bold text-purple-700">
                {mod.initials}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{mod.name}</span>
                  <button
                    className="ml-1 px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-xs font-semibold hover:bg-indigo-200 transition"
                    onClick={onActionComplete}
                  >
                    Assign Discord Role
                  </button>
                </div>
                <div className="text-xs text-gray-500">{mod.activity}</div>
                <div
                  className={`inline-block px-2 py-0.5 rounded text-xs font-semibold mt-1 ${statusStyles[mod.status]}`}
                >
                  {mod.status}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-gray-900 font-medium">{mod.messages.toLocaleString()} msgs</div>
              <div className="text-xs text-gray-500">{mod.avgResponse}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}