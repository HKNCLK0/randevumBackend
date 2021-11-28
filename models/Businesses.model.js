import mongoose from "mongoose";

const businessesModel = mongoose.Schema({
  businessName: String,
  businessCategory: String,
  businessPoint: String,
  businessFounder: String,
  businessImage: String,
  businessTaxNumber: String,
  businessRegisteryNumber: String,
  businessProvince: String,
  businessDistrict: String,
  businessAddress: String,
});

const Businesses = mongoose.model("Businesses", businessesModel);

export default Businesses;
