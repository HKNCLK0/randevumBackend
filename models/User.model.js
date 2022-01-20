import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  userName: String,
  userSurname: String,
  userEmail: String,
  userPassword: String,
  userPhone: String,
<<<<<<< HEAD
  userBirthDate: Date,
  userAddress: String,
  userDistrict: String,
  userProvince: String,
=======
>>>>>>> 8fd45d734cebd1aed0ce6e417a7fa342cc208a1f
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
