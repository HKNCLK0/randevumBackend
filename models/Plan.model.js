import mongoose from "mongoose";

const planModel = mongoose.Schema({
  planName: String,
  planPrice: String,
  planDetails: Array,
});

const Plan = mongoose.model("Plans", planModel);

export default Plan;
