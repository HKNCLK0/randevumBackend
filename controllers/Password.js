import sgMail from "@sendgrid/mail";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

import User from "../models/User.model.js";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const passwordReset = async (req, res) => {
  const { email } = req.body;
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");
    User.findOne({ email: email }).then((user) => {
      if (!user) {
        return res.status(422).json({ error: "User dont exists that email" });
      }
      user.resetToken = token;
      user.expireToken = Date.now() + 36000000;
      user.save().then((result) => {
        const msg = {
          to: `${email}`, // Change to your recipient
          from: "noreply@em492.randevum.tech", // Change to your verified sender
          subject: "Şifreni Sıfırla",
          text: "Şifreni Sıfırla",
          html: `
          <h1>Şifreni sıfırlamak için <a href="http://localhost:5000/login/forgot-password/${token}">buraya</a> tıkla</h1>
          `,
        };
        sgMail
          .send(msg)
          .then(() => {
            console.log("Password Reset Link Email Send");
          })
          .catch((error) => {
            console.error(error);
          });
        res.status(200).json({ status: "ok" });
      });
    });
  });
};

export const getSendToken = async (req, res) => {
  try {
    const user = await User.findOne({
      resetToken: req.body.token,
    });
    if (!user) {
      res.status(404).json("Geçersiz Token");
    }
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
      user.save().then((result) => {
        res.status(200).json({
          status: "ok",
          message: "Your password successfully reset",
        });
      });
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};
