import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent", "subscription"],
    });

    const paymentIntent = session.payment_intent;
    const subscription = session.subscription;

    return NextResponse.json({
      sessionId: session.id,
      customerEmail: session.customer_email,
      subscriptionId: typeof subscription === "object" ? subscription?.id : null,
      paymentIntentId: typeof paymentIntent === "object" ? paymentIntent?.id : null,
      amountTotal: session.amount_total,
    });
  } catch (error) {
    console.error("Erro ao buscar session:", error);
    return NextResponse.json({ error: "Erro ao buscar sessão" }, { status: 500 });
  }
}
