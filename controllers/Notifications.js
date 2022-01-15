import Notifications from "../models/Notifications.model.js";

export const getNotificationsByID = async (req, res) => {
  const { userID } = req.params;
  try {
    Notifications.find({ userID: userID }).then((response) =>
      res.status(200).json(response)
    );
  } catch (error) {
    res.status(404).json("Bildirim Hatası");
  }
};

export const createNotifications = async (req, res) => {
  const { userID, message } = req.body;
  try {
    Notifications.create({
      userID,
      message,
    }).then((response) => res.status(200).json(response));
  } catch (error) {
    res.status(401).json("Create Error");
  }
};

export const deleteNotifications = async (req, res) => {
  const { notificationID } = req.params;
  try {
    Notifications.findByIdAndDelete({ _id: notificationID }).then((response) =>
      res.status(202).json("Bildirim Silindi")
    );
  } catch (error) {
    res.status(400).json("Silme Hatası");
  }
};

export const sendNotificationAllUsers = async (req, res) => {
  const { message } = req.body;
};
