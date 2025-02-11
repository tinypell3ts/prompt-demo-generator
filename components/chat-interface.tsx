"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, Settings } from "lucide-react";
import type { default as React } from "react";
import { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";
import { LoadingSpinner } from "./loading-spinner";

interface Message {
  id: number;
  text: string;
  type: "user" | "assistant";
  displayedText: string;
  message: {
    type: string;
    content: string;
    componentName?: string;
    props?: any;
  };
}

const componentMap = {
  RewardSummary: lazy(() => import("@/components/rewards-summary")),
  TicketPurchase: lazy(() => import("@/components/ticket-purchase")),
};

const DynamicComponent: React.FC<{
  componentName: string;
  props: any;
}> = ({ componentName, props }) => {
  console.log("🎯 Rendering Dynamic Component:", componentName);
  console.log("🧩 Component Props:", JSON.stringify(props, null, 2));

  const Component = componentMap[componentName as keyof typeof componentMap];

  if (!Component) {
    console.error(`❌ Component not found: ${componentName}`);
    return <div>Component Not Found: {componentName}</div>;
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function ChatInterface() {
  const [interactions, setInteractions] = useState<any[]>([]);
  const [currentInteractionIndex, setCurrentInteractionIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [chatMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  useEffect(() => {
    const loadInteractions = async () => {
      try {
        const response = await fetch("/data/mock-interactions.json");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setInteractions(data);
      } catch (error) {
        console.error("Could not load mock interactions:", error); // <-- LOG 7: Catch error
      }
    };
    loadInteractions();
  }, []);

  useEffect(() => {
    if (interactions.length > 0 && currentInteractionIndex === 0) {
      if (interactions[0].role === "assistant") {
        const initialMessage: Message = {
          id: 0,
          type: "assistant",
          text: interactions[0].message.content || "Initial Component Message",
          displayedText: interactions[0].message.content || "Initial Component Message",
          message: {
            type: interactions[0].message.type,
            content: interactions[0].message.content,
            componentName: interactions[0].message.componentName,
            props: interactions[0].message.props,
          },
        };
        setChatMessages([initialMessage]);
        setCurrentInteractionIndex(1);
      }
    }
  }, [interactions, currentInteractionIndex]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (inputValue.trim() === "") return;

      // 1. Add User message to chat
      const newUserMessage: Message = {
        id: chatMessages.length,
        type: "user",
        text: inputValue,
        displayedText: inputValue,
        message: {
          type: "text",
          content: inputValue,
        },
      };
      setChatMessages((prevMessages) => [...prevMessages, newUserMessage]);
      setInputValue("");

      // Show loading spinner
      setIsLoading(true);

      // 2. Wait for 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // 3. Find and Add the next Assistant response from JSON
      let nextAssistantMessage = null;

      // Find the next assistant message starting from the current interaction index
      for (let i = currentInteractionIndex; i < interactions.length; i++) {
        const interaction = interactions[i];

        if (interaction.role === "assistant") {
          nextAssistantMessage = {
            id: chatMessages.length + 1,
            type: "assistant",
            text: interaction.message.content || "Component Message",
            displayedText: interaction.message.content || "Component Message",
            message: {
              type: interaction.message.type,
              content: interaction.message.content,
              componentName: interaction.message.componentName,
              props: interaction.message.props,
            },
          };

          // Update the current interaction index
          setCurrentInteractionIndex(i + 1);
          break;
        }
      }

      // Hide loading spinner
      setIsLoading(false);

      if (nextAssistantMessage) {
        setChatMessages((prevMessages) => [...prevMessages, nextAssistantMessage]);
      } else {
        console.log("End of conversation.");
      }
    },
    [inputValue, interactions, currentInteractionIndex, chatMessages]
  );

  console.log("Rendering chatMessages:", chatMessages); // <-- LOG 18: Render log

  return (
    <div className="min-h-screen bg-black p-4 flex flex-col items-center justify-center text-white">
      <Card className="w-full max-w-2xl p-6 bg-[#111111] shadow-xl rounded-xl border-0">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#222222] flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
            </div>
          </div>
        </div>
        <div className="space-y-4 mb-4 h-[400px] overflow-y-auto">
          {chatMessages.map((message) => {
            return (
              <div key={message.id} className="space-y-4">
                <div className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl ${
                      message.type === "user" ? "bg-[#222222] text-white px-6 py-3" : "text-white"
                    }  ${message.message.type === "component" ? "w-full max-w-full" : ""}`}
                  >
                    {message.message.type === "text" && (
                      <div className="whitespace-pre-wrap font-sans animate-fade-in">{message.message.content}</div>
                    )}
                    {message.message.type === "component" && (
                      <DynamicComponent componentName={message.message.componentName} props={message.message.props} />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {isLoading && <LoadingSpinner />}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="relative mt-6">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={"Type your message..."}
            className="w-full bg-[#222222] text-white rounded-xl py-4 px-12 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <Button type="submit" size="icon" variant="ghost" className="absolute right-2 top-1/2 -translate-y-1/2">
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Button>
          <Button size="icon" variant="ghost" className="absolute left-2 top-1/2 -translate-y-1/2">
            <Settings className="w-5 h-5 text-gray-400" />
          </Button>
        </form>
      </Card>
      <p className="text-sm font-bold text-gray-200 mt-4 opacity-80">Powered with ❤️ by Open Format</p>
    </div>
  );
}
