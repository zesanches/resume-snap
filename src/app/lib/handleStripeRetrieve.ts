import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY : "");

export async function handleStripeEvent(session_id: string) {
  const session  = await stripe.checkout.sessions.retrieve(session_id)

  return session;
}
