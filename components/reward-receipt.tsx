import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import BaseWidget from "./base-widget";

interface TransactionCardProps {
  hash?: string;
  from?: string;
  to?: string;
  timestamp?: string;
  amount?: number;
  currency?: string;
}

export default function TransactionCard({
  hash = "0x5a3...d17c2",
  from = "0x33...A6Ea",
  to = "vitalik.eth",
  timestamp = "6 sec ago",
  amount = 0.05,
  currency = "ETH",
}: TransactionCardProps) {
  return (
    <BaseWidget>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <span className="text-green-400 text-sm font-medium">Transaction Successful!</span>
          </div>
          <span className="text-gray-500 text-xs">{timestamp}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-gray-800 rounded">
              <ExternalLink className="h-3 w-3 text-gray-400" />
            </div>
            <span className="text-gray-400 text-sm font-mono">{hash}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
            <span className="text-gray-400 text-sm font-mono">{from}</span>
          </div>
          <ArrowRight className="h-4 w-4 text-gray-500" />
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-gradient-to-r from-green-300 via-blue-500 to-purple-600" />
            <span className="text-gray-400 text-sm font-mono">{to}</span>
          </div>
        </div>

        <div className="text-center">
          <div className="text-white font-bold text-xl">
            {amount} {currency}
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full border-gray-700 text-gray-400 hover:bg-gray-800"
        >
          View Transaction
        </Button>
      </div>
    </BaseWidget>
  );
}