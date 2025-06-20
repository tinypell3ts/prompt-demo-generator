import { Button } from "@/components/ui/button";
import BaseWidget from "./base-widget";

interface Recipient {
  name: string;
  address: string;
  amount: string;
}

interface TransactionCardProps {
  hash?: string;
  from?: string;
  recipients?: Recipient[];
  timestamp?: string;
  currency?: string;
  onViewTransaction?: () => void;
  onActionComplete?: () => void;
}

export default function TransactionCard({
  hash = "0x5a3...d17c2",
  from = "0x33...A6Ea",
  recipients = [
    { name: "Sarah Chen", address: "vitalik.eth", amount: "50" },
    { name: "Mike Rodriguez", address: "mike.eth", amount: "75" },
    { name: "Alex Thompson", address: "alex.eth", amount: "35" }
  ],
  timestamp = "6 sec ago",
  currency = "$OPEN",
  onViewTransaction,
  onActionComplete
}: TransactionCardProps) {
  const totalAmount = recipients.reduce((sum, recipient) => sum + parseFloat(recipient.amount), 0);

  const handleViewTransaction = () => {
    if (onViewTransaction) {
      onViewTransaction();
    }
    if (onActionComplete) {
      onActionComplete();
    }
  };

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
          <span className="text-gray-500 dark:text-gray-500 light:text-gray-600 text-xs">{timestamp}</span>
        </div>

        <div className="space-y-3">
          {recipients.map((recipient, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-green-300 via-blue-500 to-purple-600" />
                <div className="flex flex-col">
                  <span className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-sm">{recipient.name}</span>
                  <span className="text-gray-500 dark:text-gray-500 light:text-gray-600 text-xs font-mono">{recipient.address}</span>
                </div>
              </div>
              <span className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-sm font-medium">
                {recipient.amount} {currency}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-800 dark:border-gray-800 light:border-gray-200">
          <span className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-sm">Total Amount</span>
          <div className="text-white dark:text-white light:text-gray-900 font-bold text-lg">
            {totalAmount} {currency}
          </div>
        </div>

        <Button
          onClick={handleViewTransaction}
          variant="outline"
          className="w-full border-gray-700 dark:border-gray-700 light:border-gray-300 text-gray-400 dark:text-gray-400 light:text-gray-600 hover:bg-gray-800 dark:hover:bg-gray-800 light:hover:bg-gray-50"
        >
          View Transaction
        </Button>
      </div>
    </BaseWidget>
  );
}