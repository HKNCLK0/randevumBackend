import sgMail from "@sendgrid/mail";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateCode } from "../components/createRandomCode.js";
import dotenv from "dotenv";
dotenv.config();
import User from "../models/User.model.js";
import twilio from "twilio";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const JWT_SECRET = process.env.JWT;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

export const loginWithEmailAndPassword = (req, res) => {
  const { userEmail, userPassword } = req.body;

  //Check all validation
  if (!userEmail || !userPassword) {
    return res.status(400).json({ message: "Please check all fields" });
  }

  //Check for existing user
  User.findOne({ userEmail }).then((user) => {
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    //Validate password
    bcrypt.compare(userPassword, user.userPassword).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
      jwt.sign(
        {
          id: user._id,
          userEmail: user.userEmail,
          userName: user.userName,
          userSurname: user.userSurname,
          userPhone: user.userPhone,
          userEmailVerification: user.userEmailVerification,
          userPhoneVerification: user.userPhoneVerification,
        },
        JWT_SECRET,
        { expiresIn: "30m" },
        (err, token) => {
          if (err) throw err;
          res.json({
            user: {
              token: token,
            },
          });
        }
      );
    });
  });
};

export const registerWithEmailAndPassword = async (req, res) => {
  const {
    userName,
    userSurname,
    userEmail,
    userPassword,
    userPhone,
    KVKK,
    announcement,
  } = req.body;
  //Check for existing user
  const user = await User.findOne({ userEmail: userEmail });
  if (user) {
    res.status(400).json("Bu E-Posta Adresi Kullanılamaz!");
  } else {
    if (
      !userName ||
      !userSurname ||
      !userEmail ||
      !userPassword ||
      !userPhone ||
      !KVKK
    ) {
      res.status(400).json("please check all fields");
    } else {
      const newUser = await User.create({
        userName,
        userSurname,
        userEmail,
        userPassword,
        userPhone,
        KVKK,
        announcement,
      });

      //Generate salt & hashed password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.userPassword, salt, (err, hash) => {
          if (err) throw err;
          newUser.userPassword = hash;
          newUser.save().then((user) => {
            const msg = {
              to: `${user.userEmail}`,
              from: "noreply@em492.randevum.tech",
              templateId: "d-f674df88884b4a55b968440c6d78b5f7",
              dynamicTemplateData: {
                userNameAndSurname: `${user.userName} ${user.userSurname}`,
              },
            };

            sgMail
              .send(msg)
              .then(() => {
                res.status(200).json("Mail Send");
              })
              .catch((error) => {
                console.error(error);
              });
            jwt.sign(
              {
                id: user._id,
                userEmail: user.userEmail,
                userName: user.userName,
                userSurname: user.userSurname,
                userPhone: user.userPhone,
                userEmailVerification: user.userEmailVerification,
                userPhoneVerification: user.userPhoneVerification,
              },
              JWT_SECRET,
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;
                res.json({
                  token,
                  status: "ok",
                });
              }
            );
          });
        });
      });
    }
  }
};

export const sendVerificationEmail = (req, res) => {
  const { userID } = req.body;
  const code = generateCode();
  User.findOne({ _id: userID }).then((user) => {
    if (!user) {
      res.status(422).json({ err: "user dont exist with that email" });
    } else {
      user.emailVerificationCode = code;
      user.save().then(() => {
        const msg = {
          to: `${user.userEmail}`, // Change to your recipient
          from: "noreply@em492.randevum.tech", // Change to your verified sender
          subject: "E-posta'nı onayla",
          text: "E-posta'nı onayla",
          html: `
            E-Posta'nı onaylamak için kodun ${code}
          `,
        };
        sgMail
          .send(msg)
          .then(() => {
            console.log("Email sent");
          })
          .catch((error) => {
            console.error(error);
          });
        return res.status(200).json({ status: "ok" });
      });
    }
  });
};

export const checkVerifyCode = async (req, res) => {
  const { verificationCode, userID } = req.body;
  const user = await User.findOne({ _id: userID });
  if (user.emailVerificationCode === verificationCode) {
    user.userEmailVerification = true;
    //TODO:New User Denenecek Ve Silinecek
    const newUser = user.save();
    res.status(200).json({ status: "ok" });
  } else {
    res.status(404).json("Doğrulama Kodu Hatalı!");
  }
};

export const sendVerificationSMS = async (req, res) => {
  console.log("Verification SMS Send");
  const { userID } = req.body;
  const code = generateCode();
  User.findOne({ _id: userID }).then((user) => {
    if (!user) {
      res.status(422).json({ err: "user dont exist with that phone number" });
    } else {
      const client = new twilio(accountSid, authToken);
      user.smsVerificationCode = code;
      user.save().then((result) => {
        client.messages
          .create({
            to: user.userPhone,
            from: "+16067156694",
            body: `Numaranızı Doğrulamak İçin Kodunuz : ${code}`,
          })
          .then((message) => res.status(200).json({ message: message.sid }))
          .catch((err) => res.status(400).json({ error: err }));
      });
    }
  });
};

export const checkSMScode = async (req, res) => {
  const { smsCode, userID } = req.body;
  const user = await User.findOne({ _id: userID });
  if (user.smsVerificationCode === smsCode) {
    user.userPhoneVerification = true;
    user
      .save()
      .then(() => res.status(200).json("Telefon Numarası Doğrulandı"))
      .catch((err) => res.status(400).json(err));
  } else {
    res.status(404).json("Hatalı Doğrulama Kodu");
  }
};
