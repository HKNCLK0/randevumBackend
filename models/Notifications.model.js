import mongoose from "mongoose";

const notificationsModel = mongoose.Schema({
  userID: String,
  message: String,
  createdAt: {
    type: Date,
    default: () => Date.now() + 3 * 60 * 60 * 1000,
  },
});

const Notifications = mongoose.model("Notifications", notificationsModel);

export default Notifications;
