import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
import twilio from "twilio";

dotenv.config();

import Meets from "../models/Meets.model.js";
import User from "../models/User.model.js";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

export const getMeets = async (req, res) => {
  try {
    const meets = await Meets.find();
    res.status(200).json(meets);
  } catch (error) {
    res.status(400).json({ err: error });
  }
};

export const getMeetsByID = async (req, res) => {
  try {
    const params = req.params.id;
    const meetFindByID = await Meets.find({ userID: params });
    console.log(params);
    res.status(200).json(meetFindByID);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const createMeet = async (req, res) => {
  const { userID, businessID, businessName, date, clock } = req.body;
  try {
    const user = await User.findOne({ _id: userID });

    const newMeet = await Meets.create({
      userID,
      businessID,
      businessName,
      date,
      clock,
    });
    const msg = {
      to: `${user.email}`, // Change to your recipient
      from: "noreply@em492.randevum.tech", // Change to your verified sender
      subject: "Randevu Detayları",
      html: `Sayın ${user.name} ${user.surname}; ${date} tarihli , ${clock} saatli ${businessName} randevunuz oluşturulmuştur. Erteleme veya iptal için sitemizi ziyaret edin!`,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
    const client = new twilio(accountSid, authToken);
    client.messages.create({
      to: user.phone,
      from: "+12183947229",
      body: `Sayın ${user.name} ${user.surname}; ${date} tarihli , ${clock} saatli ${businessName} randevunuz oluşturulmuştur. Erteleme veya iptal için sitemizi ziyaret edin!`,
    });

    res.status(200).json({ status: "ok", newMeet });
  } catch (error) {
    res.status(400).json(error);
  }
};
