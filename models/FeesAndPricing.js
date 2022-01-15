import mongoose from "mongoose";

const feesAndPricingSchema = mongoose.Schema({
  planName: String,
  planDetails: Array,
});

const FeesAndPricing = mongoose.model("Categories", feesAndPricingSchema);

export default FeesAndPricing;
