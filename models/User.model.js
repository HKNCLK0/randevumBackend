import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  userName: String,
  userSurname: String,
  userEmail: String,
  userPassword: String,
  userPhone: String,
  checkedKVKK: Boolean,
  checkedAnnouncement: Boolean,
  userEmailVerification: {
    type: Boolean,
    default: false,
  },
  resetToken: String,
  expireToken: Date,
  emailVerificationCode: String,
  smsVerificationCode: String,
  userPhoneVerification: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("Users", userSchema);

export default User;
