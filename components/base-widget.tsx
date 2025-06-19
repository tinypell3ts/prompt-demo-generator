import { ReactNode } from "react";

interface BaseWidgetProps {
  children: ReactNode;
  className?: string;
}

export default function BaseWidget({ 
  children, 
  className = ""
}: BaseWidgetProps) {
  return (
    <div className={`bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800 ${className}`}>
      {children}
    </div>
  );
}