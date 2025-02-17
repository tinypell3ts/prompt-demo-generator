import AgentView from "@/components/agent-view";
import ChatInterface from "@/components/chat-interface";

export default function Page() {
  return (
    <div>
      <div className="grid grid-cols-2">
        <ChatInterface />
        <AgentView />
      </div>
      <p className="text-sm font-bold mt-4 opacity-80 text-center">Powered with ❤️ by Open Format</p>
    </div>
  );
}
