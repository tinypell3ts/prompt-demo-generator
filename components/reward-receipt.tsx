import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ExternalLink, Receipt } from "lucide-react";
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
    <BaseWidget title="Transaction Receipt" icon={Receipt} variant="success">
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gray-200 dark:bg-gray-800 rounded-md">
              <ExternalLink className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-medium">Transaction Hash</p>
              <p className="text-xs text-muted-foreground font-mono">{hash}</p>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            {timestamp}
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
              <div>
                <p className="text-xs text-muted-foreground">From</p>
                <p className="text-sm font-mono">{from}</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-300 via-blue-500 to-purple-600" />
              <div>
                <p className="text-xs text-muted-foreground">To</p>
                <p className="text-sm font-mono">{to}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {amount} {currency}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Transaction Amount</p>
        </div>

        <Button
          variant="outline"
          className="w-full"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          View on Block Explorer
        </Button>
      </div>
    </BaseWidget>
  );
}