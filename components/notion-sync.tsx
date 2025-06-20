import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";
import { useState } from "react";
import BaseWidget from "./base-widget";

interface NotionSyncProps {
  documentName?: string;
  lastUpdated?: string;
  pageIcon?: string;
  onSync?: () => void;
  onActionComplete?: () => void;
}

export default function NotionSync({
  documentName = "Summer Marketing Campaign",
  lastUpdated = "Last edited 2 hours ago",
  pageIcon = "📄",
  onSync,
  onActionComplete
}: NotionSyncProps) {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = async () => {
    setIsSyncing(true);

    // Simulate sync delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    if (onSync) {
      onSync();
    }

    setIsSyncing(false);
  };

  return (
    <BaseWidget>
      <div className="space-y-4">
        {/* Header with Notion Logo */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <img src="/icons/Notion-logo.svg" alt="Notion" width={16} height={16} />
            </div>
            <div>
              <h3 className="text-white dark:text-white light:text-gray-900 font-medium text-sm">Notion Document</h3>
              <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-xs">Ready to sync</p>
            </div>
          </div>
          <Button
            onClick={handleSync}
            size="sm"
            className={`${isSyncing
              ? 'bg-blue-600/50 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
              } text-white text-xs px-3 py-1 h-auto`}
            disabled={isSyncing}
          >
            {isSyncing ? (
              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
            ) : (
              <RefreshCw className="w-3 h-3 mr-1" />
            )}
            {isSyncing ? 'Syncing...' : 'Sync Now'}
          </Button>
        </div>

        {/* Document Info */}
        <div className="bg-gray-900/50 dark:bg-gray-900/50 light:bg-gray-50 rounded-lg p-4 border border-gray-800 dark:border-gray-800 light:border-gray-200">
          <div className="flex items-start gap-3">
            {/* Document Icon */}
            <div className="w-10 h-10 bg-gray-800 dark:bg-gray-800 light:bg-gray-100 rounded-lg flex items-center justify-center text-lg">
              {pageIcon}
            </div>

            {/* Document Details */}
            <div className="flex-1 min-w-0">
              <h4 className="text-white dark:text-white light:text-gray-900 font-medium text-sm truncate">
                {documentName}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex -space-x-1">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-900 dark:border-gray-900 light:border-white bg-blue-500"></div>
                  <div className="w-5 h-5 rounded-full border-2 border-gray-900 dark:border-gray-900 light:border-white bg-green-500"></div>
                </div>
                <span className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-xs">{lastUpdated}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sync Status */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`}></div>
            <span className="text-gray-400 dark:text-gray-400 light:text-gray-600">
              {isSyncing ? 'Syncing document...' : 'Ready to sync'}
            </span>
          </div>
          <span className="text-gray-500 dark:text-gray-500 light:text-gray-600">
            {isSyncing ? 'Please wait' : 'Click sync to update'}
          </span>
        </div>
      </div>
    </BaseWidget>
  );
}