import { config } from "dotenv";
import Stripe from "stripe";
import cors from "cors";
config();

import express from "express";
const app = express();
app.use(express.json());
app.use(cors());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-07-30.basil",
});

app.post("/create-checkout-session", async (req, res) => {
  const { items } = req.body;

  const line_items = items.map((item) => ({
    price_data: {
      currency: "cad",
      product_data: { name: item.name },
      unit_amount: Math.ceil(item.price * 100),
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    ui_mode: "custom",
    line_items,
    mode: "payment",
    return_url: `${process.env.YOUR_DOMAIN}/checkout/complete?session_id={CHECKOUT_SESSION_ID}`,
  });

  res.send({ clientSecret: session.client_secret });
});

app.get("/session-status", async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(
    req.query.session_id,
    { expand: ["payment_intent"] }
  );

  res.send({
    status: session.status,
    payment_status: session.payment_status,
    payment_intent_id: session.payment_intent.id,
    payment_intent_status: session.payment_intent.status,
  });
});

app.listen(4242, () => console.log("Running on port 4242"));
