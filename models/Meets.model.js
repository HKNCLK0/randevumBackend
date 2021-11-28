import mongoose from "mongoose";

const meetSchema = mongoose.Schema({
  userID: String,
  businessID: String,
  businessName: String,
  date: String,
  clock: String,
});

const Meets = mongoose.model("Meets", meetSchema);

export default Meets;
