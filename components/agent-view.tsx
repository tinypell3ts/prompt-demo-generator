"use client";

import { Card } from "@/components/ui/card";
import logsData from "@/data/agent-logs.json";
import { Award, Code, Globe, Terminal, Twitter } from "lucide-react";
import { useEffect, useState } from "react";
import { BsDiscord, BsTelegram } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";

interface AgentLogEntry {
  type: "task" | "social" | "reward" | "system" | "interaction";
  icon?: React.ReactNode;
  message: string;
  timestamp: string;
}

interface RawAgentLogEntry {
  type: "task" | "social" | "reward" | "system" | "interaction";
  icon?: string;
  message: string;
  timestamp?: string;
}

export default function AgentView() {
  const [agentLogs, setAgentLogs] = useState<AgentLogEntry[]>([]);

  useEffect(() => {
    function transformLogEntry(log: RawAgentLogEntry): AgentLogEntry {
      return {
        ...log,
        icon:
          log.icon === "twitter" ? (
            <Twitter className="w-4 h-4 text-blue-400" />
          ) : log.icon === "award" ? (
            <Award className="w-4 h-4 text-yellow-400" />
          ) : log.icon === "code" ? (
            <Code className="w-4 h-4 text-green-400" />
          ) : log.icon === "globe" ? (
            <Globe className="w-4 h-4 text-cyan-400" />
          ) : log.icon === "terminal" ? (
            <Terminal className="w-4 h-4 text-gray-400" />
          ) : log.icon === "telegram" ? (
            <BsTelegram className="w-4 h-4 text-blue-500" />
          ) : log.icon === "discord" ? (
            <BsDiscord className="w-4 h-4 text-purple-500" />
          ) : log.icon === "github" ? (
            <FaGithub className="w-4 h-4 text-gray-300" />
          ) : undefined,
        timestamp: new Date().toLocaleTimeString(),
      };
    }

    function generateRandomLog(): AgentLogEntry {
      const randomLog = logsData[Math.floor(Math.random() * logsData.length)] as RawAgentLogEntry;
      return transformLogEntry(randomLog);
    }

    // Start with initial logs (first 4 entries)
    const initialTransformedLogs = logsData.slice(0, 4).map((log) => transformLogEntry(log as RawAgentLogEntry));
    setAgentLogs(initialTransformedLogs);

    // Set up periodic log generation
    const intervalId = setInterval(() => {
      // Random interval between 1000ms (1s) and 3000ms (3s)
      const randomDelay = Math.floor(Math.random() * 2000) + 1000;

      // Use setTimeout to create variable intervals
      setTimeout(() => {
        setAgentLogs((prevLogs) => {
          // Limit log history to prevent infinite growth
          const updatedLogs = [...prevLogs, generateRandomLog()].slice(-20);
          return updatedLogs;
        });
      }, randomDelay);
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen h-screen p-4 flex flex-col items-center justify-center text-white font-mono">
      <Card className="w-full max-w-2xl h-[90%] flex flex-col p-6 bg-[#111111] shadow-xl rounded-xl border-0">
        <div className="flex items-center mb-4 space-x-2 p-8">
          <Terminal className="w-5 h-5" />
          <h2 className="text-sm font-bold text-white">Open Format Agent Console</h2>
        </div>
        <div className="flex-grow overflow-y-auto space-y-2 text-xs">
          {agentLogs.map((log, index) => (
            <div
              key={index}
              className={`flex items-start space-x-2 ${
                log.type === "system"
                  ? "text-gray-500"
                  : log.type === "social"
                  ? "text-blue-300"
                  : log.type === "reward"
                  ? "text-yellow-300"
                  : log.type === "interaction"
                  ? "text-cyan-300"
                  : "text-green-400"
              }`}
            >
              <span className="text-gray-600">[{log.timestamp}]</span>
              {log.icon && <span>{log.icon}</span>}
              <span>{log.message}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 text-xs text-gray-600 italic">Agent status: 🟢 Active</div>
      </Card>
    </div>
  );
}