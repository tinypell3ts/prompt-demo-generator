import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import BaseWidget from "./base-widget";

interface TicketPurchaseProps {
  title: string;
  description: string;
  price: number;
  onActionComplete?: () => void;
}

export default function TicketPurchase({ title, description, price, onActionComplete }: TicketPurchaseProps) {
  const handleApplePay = () => {
    if (onActionComplete) {
      onActionComplete();
    }
  };

  return (
    <BaseWidget>
      <div className="space-y-4">
        <h3 className="text-white font-medium text-sm">{title}</h3>
        
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
        
        <div className="flex items-center justify-between p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <div>
            <h4 className="text-white font-medium">Total Price</h4>
            <span className="text-blue-400 text-xs">Early Bird • Limited time offer</span>
          </div>
          <div className="text-white font-bold text-xl">€{price.toFixed(2)}</div>
        </div>

        <Button 
          onClick={handleApplePay}
          className="w-full bg-black hover:bg-gray-800 text-white"
        >
          <CreditCard className="w-4 h-4 mr-2" />
          Pay with Apple Pay
        </Button>
      </div>
    </BaseWidget>
  );
}