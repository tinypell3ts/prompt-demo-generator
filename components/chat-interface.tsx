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
  TweetShare: lazy(() => import("@/components/tweet-share")),
  TaskList: lazy(() => import("@/components/task-list")),
  RewardReceipt: lazy(() => import("@/components/reward-receipt")),
  CommunityActions: lazy(() => import("@/components/community-actions")),
  ModeratorRecommendations: lazy(() => import("@/components/moderator-recommendations")),
  AIMessageWithAction: lazy(() => import("@/components/ai-message-with-action")),
  MeetingReminder: lazy(() => import("@/components/meeting-reminder")),
};

const DynamicComponent: React.FC<{
  componentName: string;
  props: any;
  onActionComplete?: () => void;
}> = ({ componentName, props, onActionComplete }) => {
  console.log("🎯 Rendering Dynamic Component:", componentName);
  console.log("🧩 Component Props:", JSON.stringify(props, null, 2));

  const Component = componentMap[componentName as keyof typeof componentMap];

  if (!Component) {
    console.error(`❌ Component not found: ${componentName}`);
    return <div>Component Not Found: {componentName}</div>;
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Component {...props} onActionComplete={onActionComplete} />
    </Suspense>
  );
};

export default function ChatInterface() {
  const [interactions, setInteractions] = useState<any[]>([]);
  const [currentInteractionIndex, setCurrentInteractionIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessingAutoMessages, setIsProcessingAutoMessages] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    try {
      // Log current state for debugging
      console.log("Scroll to bottom called");
      console.log("Messages container:", messagesContainerRef.current);
      console.log("Messages end ref:", messagesEndRef.current);
      console.log("Current messages:", chatMessages.length);

      // Multiple aggressive scrolling techniques
      if (messagesContainerRef.current) {
        // Method 1: Direct scrollTop
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;

        // Method 2: Scroll into view of the last element
        const lastMessage = messagesContainerRef.current.lastElementChild;
        if (lastMessage) {
          lastMessage.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }
      }

      // Method 3: If end ref exists, scroll into view
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    } catch (error) {
      console.error("Scrolling error:", error);
    }
  }, [chatMessages]);

  useEffect(() => {
    // Multiple attempts to scroll
    const scrollAttempts = [
      () => scrollToBottom(),
      () => setTimeout(scrollToBottom, 100),
      () => setTimeout(scrollToBottom, 300),
    ];

    // Run multiple scroll attempts
    for (const attempt of scrollAttempts) {
      attempt();
    }

    // Cleanup function
    return () => {
      for (const attempt of scrollAttempts) {
        if (typeof attempt === "function") {
          clearTimeout(attempt as any);
        }
      }
    };
  }, [chatMessages, scrollToBottom]);

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
        // Handle multiple messages for initial interaction
        const initialMessages = interactions[0].messages || [interactions[0].message];
        const formattedInitialMessages = initialMessages.map((message, index) => ({
          id: index,
          type: "assistant",
          text: message.content || "Initial Component Message",
          displayedText: message.content || "Initial Component Message",
          message: {
            type: message.type,
            content: message.content,
            componentName: message.componentName,
            props: message.props,
          },
        }));

        setChatMessages(formattedInitialMessages);
        setCurrentInteractionIndex(1);
      }
    }
  }, [interactions, currentInteractionIndex]);

  // New function to process consecutive assistant messages
  const processNextAssistantMessages = useCallback(async () => {
    if (isProcessingAutoMessages || isLoading) return;
    
    setIsProcessingAutoMessages(true);
    
    // Check if the next interaction is an assistant message
    if (currentInteractionIndex < interactions.length && 
        interactions[currentInteractionIndex]?.role === "assistant") {
      
      // Show loading spinner
      setIsLoading(true);
      
      // Wait a moment to simulate processing
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Find and Add the next Assistant response from JSON
      let nextAssistantMessages = null;
      
      // Find the next assistant message starting from the current interaction index
      for (let i = currentInteractionIndex; i < interactions.length; i++) {
        const interaction = interactions[i];
        
        if (interaction.role === "assistant") {
          // Handle multiple messages in an interaction
          const messagesArray = interaction.messages || [interaction.message];
          
          nextAssistantMessages = messagesArray.map((message, index) => ({
            id: chatMessages.length + index + 1,
            type: "assistant",
            text: message.content || "Component Message",
            displayedText: message.content || "Component Message",
            message: {
              type: message.type,
              content: message.content,
              componentName: message.componentName,
              props: message.props,
            },
          }));
          
          // Update the current interaction index
          setCurrentInteractionIndex(i + 1);
          break;
        }
      }
      
      // Hide loading spinner
      setIsLoading(false);
      
      if (nextAssistantMessages) {
        setChatMessages((prevMessages) => [...prevMessages, ...nextAssistantMessages]);
      } else {
        console.log("End of conversation.");
      }
    }
    
    setIsProcessingAutoMessages(false);
  }, [interactions, currentInteractionIndex, chatMessages, isLoading, isProcessingAutoMessages]);

  // New useEffect to automatically process consecutive assistant messages
  useEffect(() => {
    if (chatMessages.length > 0 && !isLoading && !isProcessingAutoMessages) {
      processNextAssistantMessages();
    }
  }, [chatMessages, processNextAssistantMessages, isLoading, isProcessingAutoMessages]);

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
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 3. Find and Add the next Assistant response from JSON
      let nextAssistantMessages = null;

      // Find the next assistant message starting from the current interaction index
      for (let i = currentInteractionIndex; i < interactions.length; i++) {
        const interaction = interactions[i];

        if (interaction.role === "assistant") {
          // Handle multiple messages in an interaction
          const messagesArray = interaction.messages || [interaction.message];

          nextAssistantMessages = messagesArray.map((message, index) => ({
            id: chatMessages.length + index + 1,
            type: "assistant",
            text: message.content || "Component Message",
            displayedText: message.content || "Component Message",
            message: {
              type: message.type,
              content: message.content,
              componentName: message.componentName,
              props: message.props,
            },
          }));

          // Update the current interaction index
          setCurrentInteractionIndex(i + 1);
          break;
        }
      }

      // Hide loading spinner
      setIsLoading(false);

      if (nextAssistantMessages) {
        setChatMessages((prevMessages) => [...prevMessages, ...nextAssistantMessages]);
      } else {
        console.log("End of conversation.");
      }
    },
    [inputValue, interactions, currentInteractionIndex, chatMessages]
  );

  const handleActionComplete = useCallback(() => {
    // Trigger next interaction
    const handleNextInteraction = async () => {
      // Show loading spinner
      setIsLoading(true);

      // Wait a moment to simulate processing
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Find and Add the next Assistant response from JSON
      let nextAssistantMessages = null;

      // Find the next assistant message starting from the current interaction index
      for (let i = currentInteractionIndex; i < interactions.length; i++) {
        const interaction = interactions[i];

        if (interaction.role === "assistant") {
          // Handle multiple messages in an interaction
          const messagesArray = interaction.messages || [interaction.message];

          nextAssistantMessages = messagesArray.map((message, index) => ({
            id: chatMessages.length + index + 1,
            type: "assistant",
            text: message.content || "Component Message",
            displayedText: message.content || "Component Message",
            message: {
              type: message.type,
              content: message.content,
              componentName: message.componentName,
              props: message.props,
            },
          }));

          // Update the current interaction index
          setCurrentInteractionIndex(i + 1);
          break;
        }
      }

      // Hide loading spinner
      setIsLoading(false);

      if (nextAssistantMessages) {
        setChatMessages((prevMessages) => [...prevMessages, ...nextAssistantMessages]);
      } else {
        console.log("End of conversation.");
      }
    };

    handleNextInteraction();
  }, [interactions, currentInteractionIndex, chatMessages]);

  console.log("Rendering chatMessages:", chatMessages); // <-- LOG 18: Render log

  return (
    <div className="min-h-screen h-screen p-4 flex flex-col items-center justify-center text-white">
      <Card className="w-full max-w-2xl h-[90%] flex flex-col p-6 bg-[#111111] shadow-xl rounded-xl border-0">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#222222] flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
            </div>
          </div>
        </div>
        <div ref={messagesContainerRef} className="flex-grow overflow-y-auto space-y-4 mb-4">
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
                      <div className="animate-fade-in">
                        <DynamicComponent
                          componentName={message.message.componentName}
                          props={message.message.props}
                          onActionComplete={handleActionComplete}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {isLoading && <LoadingSpinner />}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="relative mt-auto">
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
    </div>
  );
}
