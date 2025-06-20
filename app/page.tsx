import ChatInterface from "@/components/chat-interface";

export default function Page() {
  return (
    <div className="bg-black dark:bg-black light:bg-white min-h-screen">
      <ChatInterface />
      <p className="text-sm font-bold mt-4 opacity-80 text-center text-white dark:text-white light:text-gray-800">
        Powered with ❤️ by Open Format
      </p>
    </div>
  );
}