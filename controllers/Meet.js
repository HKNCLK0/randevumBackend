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
    res.status(200).json(meetFindByID);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getMeetsByBusinessID = async (req, res) => {
  try {
    const params = req.params.id;
    const meetFindByID = await Meets.find({ businessID: params });
    res.status(200).json(meetFindByID);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const createMeet = async (req, res) => {
  const { userID, businessID, businessName, date, clock, userData } = req.body;
  try {
    const user = await User.findOne({ _id: userID });

    const newMeet = await Meets.create({
      userID,
      businessID,
      businessName,
      date,
      clock,
      userData,
    });
    const msg = {
      to: `${user.userEmail}`, // Change to your recipient
      from: "noreply@em492.randevum.tech", // Change to your verified sender
      subject: "Randevu Detayları",
      html: `Sayın ${user.userName} ${user.userSurname}; ${date} tarihli , ${clock} saatli ${businessName} randevunuz oluşturulmuştur. Erteleme veya iptal için sitemizi ziyaret edin!`,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Meet Created Mail Send");
      })
      .catch((error) => {
        console.error(error);
      });
    const client = new twilio(accountSid, authToken);
    client.messages
      .create({
        to: user.userPhone,
        from: "+12183947229",
        body: `Sayın ${user.userName} ${user.userSurname}; ${date} tarihli , ${clock} saatli ${businessName} randevunuz oluşturulmuştur. Erteleme veya iptal için sitemizi ziyaret edin!`,
      })
      .then((message) => console.log(message.sid));
    res.status(200).json({ status: "ok", newMeet });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteMeetByID = async (req, res) => {
  const { userID } = req.body;
  const params = req.params.id;
  try {
    const user = await User.findById({ _id: userID });
    const deletedMeet = await Meets.findByIdAndRemove({ _id: params });
    const msg = {
      to: `${user.userEmail}`, // Change to your recipient
      from: "noreply@em492.randevum.tech", // Change to your verified sender
      subject: "Randevu Detayları",
      html: `Sayın ${user.userName} ${user.userSurname}; ${deletedMeet.date} tarihli , ${deletedMeet.clock} saatli ${deletedMeet.businessName} randevunuz iptal edilmiştir.`,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Meet Delete Mail Send");
      })
      .catch((error) => {
        console.error(error);
      });
    const client = new twilio(accountSid, authToken);
    client.messages.create({
      to: user.userPhone,
      from: "+12183947229",
      body: `Sayın ${user.userName} ${user.userSurname}; ${deletedMeet.date} tarihli , ${deletedMeet.clock} saatli ${deletedMeet.businessName} randevunuz iptal edilmiştir.`,
    });
    res.status(200).json("Meet Successfully Deleted");
  } catch (error) {
    res.status(404).json(error);
  }
};

export const getMeetByMeetID = async (req, res) => {
  try {
    const params = req.params.id;
    const meetFindByMeetID = await Meets.findById({ _id: params });
    res.status(200).json(meetFindByMeetID);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
