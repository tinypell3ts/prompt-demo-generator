import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type React from "react";

interface TicketPurchaseProps {
  title: string;
  description: string;
  price: number;
}

const TicketPurchase: React.FC<TicketPurchaseProps> = ({ title, description, price }) => {
  return (
    <Card className="bg-[#1A1A1A] border-0 rounded-xl w-full text-white">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0 space-y-4">
        <p className="text-gray-300">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">€{price.toFixed(2)}</span>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => alert("Apple Pay integration coming soon!")}
          >
            Pay with Apple Pay
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketPurchase;
