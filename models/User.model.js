import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  userName: String,
  userSurname: String,
  userEmail: String,
  userPassword: String,
  userPhone: String,
  userBirthDate: Date,
  userAddress: String,
  userDistrict: String,
  userProvince: String,
  checkedKVKK: Boolean,
  checkedAnnouncement: Boolean,
  userProfilePicture: {
    type: String,
    default:
      "https://firebasestorage.googleapis.com/v0/b/randevum-5d873.appspot.com/o/dashboardUser.png?alt=media&token=f4349db5-cf6d-4cfa-91fb-a56ceb42b01f",
  },
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
