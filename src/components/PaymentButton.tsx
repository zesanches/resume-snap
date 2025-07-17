"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";

export default function PaymentButton() {
  const [isProcessing] = useState(false);

  const handleUpgrade = async () => {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Erro ao iniciar assinatura");
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        onClick={handleUpgrade}
        disabled={isProcessing}
        size="sm"
        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
      >
        <Crown className="h-4 w-4 mr-2" />
        {isProcessing ? "Processing..." : "Upgrade to Pro - $9.99"}
      </Button>
    </div>
  );
}
