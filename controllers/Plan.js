import Stripe from "stripe";
import Businesses from "../models/Businesses.model.js";
import Panel from "../models/Panel.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const getPlans = async (req, res) => {
  const plans = await stripe.prices.list(
    { expand: ["data.product"] },
    {
      apiKey: process.env.STRIPE_SECRET_KEY,
    }
  );
  return res.json(plans);
};

export const createSession = async (req, res) => {
  const stripeCustomerID = req.business.customerStripeID;
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
  if (!subscriptions.data.length)
    return res.status(404).json("Subscription Not Found");

  const plan = await stripe.products.retrieve(
    subscriptions.data[0].plan.product
  );
  //TODO:Burası Düzeltilecek
  //BUG:Burası yeni kullanıcıda leveli vermiyor!
  if (plan.name == "Baslangic") {
    await Panel.find({ panelAccess: "Standart" })
      .then((panel) => res.json({ panel, plan }))
      .catch(() => res.json("Get Panel Error"));
  } else if (plan.name == "Profesyonel") {
    await Panel.find({ panelAccess: { $in: ["Standart", "Profesyonel"] } })
      .then((panel) => res.json({ panel, plan }))
      .catch(() => res.json("Get Panel Error"));
  }
};

export const createPortal = async (req, res) => {
  const business = await Businesses.findOne({
    businessEmail: req.business.businessEmail,
  });
  const returnUrl = "http://localhost:3000";

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: business.customerStripeID,
    return_url: returnUrl,
  });

  res.json(portalSession);
};

export const getCustomerByID = async (req, res) => {
  const id = req.business.customerStripeID;

  const customer = await stripe.customers.retrieve(id);

  res.json(customer);
};
