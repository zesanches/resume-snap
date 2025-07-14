"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Crown, Coffee } from "lucide-react";

interface PaymentButtonProps {
  onUpgrade: () => void;
}

export default function PaymentButton({ onUpgrade }: PaymentButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const isPro = localStorage.getItem("resumeProUser") === "true";

  const handleUpgrade = async () => {
    setIsProcessing(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      localStorage.setItem("resumeProUser", "true");
      localStorage.setItem("resumeUpgradeDate", new Date().toISOString());

      alert("🎉 Welcome to ResumeSnap Pro! You now have unlimited downloads.");
      onUpgrade();

      window.location.reload();
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDonate = () => {
    window.open("https://buymeacoffee.com/resumesnap", "_blank");
  };

  if (isPro) {
    return (
      <div className="flex items-center space-x-2 text-sm">
        <Crown className="h-4 w-4 text-yellow-500" />
        <span className="text-yellow-600 font-medium">Pro User</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        onClick={handleDonate}
        variant="outline"
        size="sm"
        className="hidden sm:flex bg-transparent"
      >
        <Coffee className="h-4 w-4 mr-2" />
        Donate
      </Button>
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
