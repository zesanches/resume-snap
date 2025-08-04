"use client";

import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";
import { Session } from "next-auth";

type PaymentButtonProps = {
  session: Session | null;
};

export default function PaymentButton({ session }: PaymentButtonProps) {
  const handleUpgrade = async () => {
    if (!session?.user.id) {
      window.location.href = "/login";
      return;
    }

    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      body: JSON.stringify({ userId: session.user.id }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Erro ao iniciar assinatura");
    }
  };

  return (
    <Button
      onClick={handleUpgrade}
      size="sm"
      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
    >
      <Crown className="h-4 w-4 mr-2" />
      {"Upgrade to Pro - $9/month"}
    </Button>
  );
}
