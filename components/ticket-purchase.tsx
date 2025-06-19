import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Ticket } from "lucide-react";
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
    <BaseWidget title={title} icon={Ticket} variant="info">
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div>
            <h4 className="font-semibold text-lg">Total Price</h4>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                Early Bird
              </Badge>
              <span className="text-xs text-muted-foreground">Limited time offer</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">€{price.toFixed(2)}</div>
          </div>
        </div>

        <Button 
          onClick={handleApplePay}
          className="w-full bg-black hover:bg-gray-800 text-white"
          size="lg"
        >
          <CreditCard className="w-4 h-4 mr-2" />
          Pay with Apple Pay
        </Button>
      </div>
    </BaseWidget>
  );
}