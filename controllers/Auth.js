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
  const { email, password } = req.body;

  //Check all validation
  if (!email || !password) {
    return res.status(400).json({ message: "Please check all fields" });
  }

  //Check for existing user
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    //Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
      jwt.sign(
        {
          id: user._id,
          userEmail: user.email,
          userName: user.name,
          userSurname: user.surname,
          userPhone: user.phone,
          userEmailVerification: user.userVerification,
          userPhoneVerification: user.phoneVerification,
        },
        JWT_SECRET,
        { expiresIn: "30m" },
        (err, token) => {
          if (err) throw err;
          res.json({
            user: {
              token,
              id: user._id,
              userEmail: user.email,
              userName: user.name,
              userSurname: user.surname,
              userPhone: user.phone,
              userEmailVerification: user.userVerification,
              userPhoneVerification: user.phoneVerification,
            },
          });
        }
      );
    });
  });
};

export const registerWithEmailAndPassword = async (req, res) => {
  const { name, surname, email, password, phone, KVKK, announcement } =
    req.body;
  //Check for existing user
  const user = await User.findOne({ email: email });
  if (user) {
    res.status(400).json("Bu E-Posta Adresi Kullanılamaz!");
  } else {
    if (!name || !surname || !email || !password || !phone || !KVKK) {
      res.status(400).json("please check all fields");
    } else {
      const newUser = await User.create({
        name,
        surname,
        email,
        password,
        phone,
        KVKK,
        announcement,
      });

      //Generate salt & hashed password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then((user) => {
            const msg = {
              to: `${user.email}`, // Change to your recipient
              from: "noreply@em492.randevum.tech", // Change to your verified sender
              subject: "Randevum'a Hoşgeldin",
              text: "Randevum'a Hoşgeldin",
              html: "<strong>Randevum'a Hoşgeldin!</strong>",
            };
            sgMail
              .send(msg)
              .then(() => {
                console.log("Welcome Mail Send");
              })
              .catch((error) => {
                console.error(error);
              });
            jwt.sign(
              {
                id: user._id,
                userEmail: user.email,
                userName: user.name,
                userSurname: user.surname,
                userPhone: user.phone,
                userEmailVerification: user.userVerification,
                userPhoneVerification: user.phoneVerification,
              },
              JWT_SECRET,
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;
                res.json({
                  token,
                  user: {
                    id: user._id,
                    userEmail: user.email,
                    userName: user.name,
                    userSurname: user.surname,
                    userPhone: user.phone,
                    userEmailVerification: user.userVerification,
                    userPhoneVerification: user.phoneVerification,
                  },
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
      user.verificationCode = code;
      user.save().then((result) => {
        const msg = {
          to: `${user.email}`, // Change to your recipient
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
  if (user.verificationCode === verificationCode) {
    user.userVerification = true;
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
            to: user.phone,
            from: "+12183947229",
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
    user.phoneVerification = true;
    user
      .save()
      .then((message) => res.status(200).json("Telefon Numarası Doğrulandı"))
      .catch((err) => res.status(400).json(err));
  } else {
    res.status(404).json("Hatalı Doğrulama Kodu");
  }
};
