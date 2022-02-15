import mongoose from "mongoose";

const meetSchema = mongoose.Schema({
  userID: String,
  businessID: String,
  businessName: String,
  userNameAndSurname: String,
  date: String,
  clock: String,
  createdAt: { type: Date, default: Date.now() + 10800000 },
});

const Meets = mongoose.model("Meets", meetSchema);

export default Meets;
