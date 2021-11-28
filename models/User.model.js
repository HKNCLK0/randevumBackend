import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: String,
  surname: String,
  email: String,
  password: String,
  phone: String,
  birthDate: Date,
  address: String,
  district: String,
  province: String,
  checkedKVKK: Boolean,
  checkedAnnouncement: Boolean,
  userVerification: {
    type: Boolean,
    default: false,
  },
  resetToken: String,
  expireToken: Date,
  verificationCode: String,
  smsVerificationCode: String,
  phoneVerification: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("Users", userSchema);

export default User;
