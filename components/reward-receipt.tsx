import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface TransactionCardProps {
  hash: string;
  from: string;
  to: string;
  timestamp: string;
  amount: number;
  currency: string;
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
    <div className="p-4">
      <Card className="font-mono space-y-4 rounded-xl bg-black/80 p-4 text-white backdrop-blur-sm">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-gray-800/50 p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <rect width="7" height="7" x="3" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="14" rx="1" />
                <rect width="7" height="7" x="3" y="14" rx="1" />
              </svg>
            </div>
            <span>{hash}</span>
          </div>
          <span>{timestamp}</span>
        </div>
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
            <span className="text-sm text-gray-300">{from}</span>
          </div>
          <ArrowRight className="h-4 w-4 text-gray-500" />
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-300 via-blue-500 to-purple-600" />
            <span className="text-sm text-gray-300">{to}</span>
          </div>
        </div>
        <div className="flex items-center justify-center text-lg font-semibold">
          {amount} {currency}
        </div>
        <Button
          variant="ghost"
          className="w-full rounded-lg border border-white/10 bg-white/5 text-sm font-normal text-white hover:bg-white/10"
        >
          View Transaction
        </Button>
      </Card>
    </div>
  );
}
