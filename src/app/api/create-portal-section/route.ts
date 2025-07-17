import { NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY : "");

export async function POST(request: NextRequest) {
  const { customerId } = await request.json();

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: process.env.DOMAIN,
  });

  return new Response(JSON.stringify({ url: session.url }), { status: 200 });
}
