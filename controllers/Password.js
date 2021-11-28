import sgMail from "@sendgrid/mail";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

import User from "../models/User.model.js";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const getSendToken = async (req, res) => {
  try {
    const user = await User.findOne({
      resetToken: req.body.token,
    });
    if (!user) {
      res.status(404).json("Geçersiz Token");
    } else {
      res.status(200).json({ user });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(200).json({ error });
  }
};

export const newPassword = async (req, res) => {
  const newPassword = req.body.password;
  const sendToken = req.body.token;
  try {
    const user = await User.findOne({
      resetToken: sendToken,
      expireToken: { $gt: Date.now() },
    });
    if (!user) {
      res.status(404).json({ error: "Geçersiz Token Lütfen Tekrar Deneyin" });
    }
    await bcrypt.hash(newPassword, 10).then((hashedNewPassword) => {
      user.password = hashedNewPassword;
      user.resetToken = undefined;
      user.expireToken = undefined;
      const newUser = user.save();
      res.status(200).json({
        status: "ok",
        message: "Your password successfully reset",
      });
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};
