import mongoose from "mongoose";

const businessesModel = mongoose.Schema({
  businessName: String,
  businessCategory: String,
  businessEmail: String,
  businessPassword: String,
  businessPhone: String,
  businessAddress: String,
  businessCountry: String,
  businessIlce: String,
  businessImage: String,
  businessMeetDates: Array,
  businessMeetTimes: Array,
  businessPoint: String,
});

const Businesses = mongoose.model("Businesses", businessesModel);

export default Businesses;
