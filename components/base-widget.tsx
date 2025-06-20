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
    <div className={`bg-[#1a1a1a] dark:bg-[#1a1a1a] light:bg-white rounded-2xl p-6 border border-gray-800 dark:border-gray-800 light:border-gray-200 ${className}`}>
      {children}
    </div>
  );
}