import mongoose from "mongoose";

const businessesModel = mongoose.Schema({
  businessName: String,
  businessCategory: String,
  businessEmail: String,
  businessPassword: String,
  businessPhone: String,
  businessTables: Array,
  businessAddress: String,
  customerStripeID: String,
  productID: String,
  businessCountry: String,
  businessImageURL: String,
  businessTables: Array,
  businessIlce: String,
  businessImage: String,
  businessMeetDates: Array,
  businessMeetTimes: Array,
  businessPoint: String,
});

const Businesses = mongoose.model("Businesses", businessesModel);

export default Businesses;
