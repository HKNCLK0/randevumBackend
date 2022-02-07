import Stripe from "stripe";
import Businesses from "../models/Businesses.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const getPlans = async (req, res) => {
  const plans = await stripe.prices.list({
    apiKey: process.env.STRIPE_SECRET_KEY,
  });
  return res.json(plans);
};

export const createSession = async (req, res) => {
  const stripeCustomerID = req.business.stripeCustomerID;
  const { priceID } = req.body;
  const session = await stripe.checkout.sessions.create(
    {
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceID,
          quantity: 1,
        },
      ],
      success_url: "http://localhost:3000",
      cancel_url: "http://localhost:3000/failed",
      customer: stripeCustomerID,
    },
    {
      apiKey: process.env.STRIPE_SECRET_KEY,
    }
  );
  return res.json(session);
};

export const getBusinessLevel = async (req, res) => {
  const business = await Businesses.findOne({
    businessEmail: req.business.businessEmail,
  });

  const subscriptions = await stripe.subscriptions.list(
    {
      customer: business.customerStripeID,
      status: "all",
      expand: ["data.default_payment_method"],
    },
    {
      apiKey: process.env.STRIPE_SECRET_KEY,
    }
  );
  business.productID = subscriptions.data[0].items.data[0].plan.product;
  business.save();
  res.json(subscriptions);
};

export const updateProduct = async (req, res) => {
  const product = await stripe.products.update("prod_L6L7Dhmqypul2m", {
    name: "Professional",
  });

  res.json(product);
};
