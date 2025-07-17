import Stripe from "stripe";
import { NextRequest } from "next/server";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY : "");

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature") as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ? process.env.STRIPE_WEBHOOK_SECRET : "";

  try {
    const event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      webhookSecret
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("Assinatura criada com sucesso!", session);
    }

    return new Response("ok", { status: 200 });
  } catch (err: unknown) {
    console.error("Webhook Error:", err);
    return new Response("Webhook Error", { status: 400 });
  }
}
