import Stripe from "stripe";
import { NextRequest } from "next/server";
import { changeUserPlanToPro } from "@/app/lib/changeUserPlan";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY : "");

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature") as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string

  try {
    const event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      webhookSecret
    );

    if (!event) {
      console.error("Webhook event not found");
      return new Response("Webhook event not found", { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      if (!session.metadata || !session.metadata.userId) {
        return new Response("User ID not found in session metadata", { status: 400 });
      }

      await changeUserPlanToPro(session.metadata.userId);
    }

    return new Response("ok", { status: 200 });
  } catch (err: unknown) {
    console.error("Webhook Error:", err);
    return new Response("Webhook Error", { status: 400 });
  }
}
