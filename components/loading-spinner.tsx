import { useTheme } from "./theme-provider";

export function LoadingSpinner() {
  const { theme } = useTheme();
  
  return (
    <div className="flex items-center gap-2">
      <img src="loading.gif" alt="Loading Spinner" className="w-10 h-10" />
      <p className="text-sm text-gray-500 dark:text-gray-500 light:text-gray-600">Thinking...</p>
    </div>
  );
}