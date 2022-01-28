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
      "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
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
