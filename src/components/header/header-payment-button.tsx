import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";
import { Session } from "next-auth";
import { redirect } from "next/navigation";

type PaymentButtonProps = {
  session: Session | null;
};

export default function PaymentButton({ session }: PaymentButtonProps) {
  const handleUpgrade = async () => {
    "use server";

    if (!session?.user.id) {
      redirect("/login");
    }

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
      <form action={handleUpgrade}>
        <Button
          size="sm"
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          <Crown className="h-4 w-4 mr-2" />
          {"Upgrade to Pro - $9/month"}
        </Button>
      </form>
    </div>
  );
}
