import Businesses from "../models/Businesses.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import sgMail from "@sendgrid/mail";


import dotenv from "dotenv";
dotenv.config();

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const JWT_SECRET = process.env.JWT;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/*export const createBusinesses = async (req, res) => {
  const {
    businessFounderName,
    businessCategory,
    businessPoint,
    businessFounder,
    businessImage,
    businessTaxNumber,
    businessRegisteryNumber,
    businessProvince,
    businessDistrict,
    businessAddress,
  } = req.body;
  try {
    const newBusinesses = await Businesses.create({
      businessFounderName,
      businessCategory,
      businessPoint,
      businessFounder,
      businessImage,
      businessTaxNumber,
      businessRegisteryNumber,
      businessProvince,
      businessDistrict,
      businessAddress,
    });
    res.status(200).json(newBusinesses);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};*/

export const getBusiness = async(req,res) => {
  const businessID = req.business.id
  await Businesses.find({_id:businessID}).then((business) => res.json(business))
}

export const getBusinessesByID = async (req, res) => {
  const params = req.params.id;
  try {
    const business = await Businesses.findOne({ _id: params });
    res.status(200).json({
      businessID: business._id,
      businessName: business.businessName,
      businessCategory: business.businessCategory,
      businessEmail: business.businessEmail,
      businessAddress: business.businessAddress,
      businessCountry: business.businessCountry,
      businessPlan: business.businessPlanID,
      businessIlce: business.businessIlce,
      businessImage: business.businessImage,
      businessMeetDates: business.businessMeetDates,
      businessMeetTimes: business.businessMeetTimes,
      businessPoint: business.businessPoint,
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

export const getBusinessesByCategoryName = async (req, res) => {
  const { categoryName } = req.body;
  try {
    const business = await Businesses.find({ businessCategory: categoryName });
    res.status(200).json(business);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const getAllBusinesses = async (req, res) => {
  try {
    const businesses = await Businesses.find();
    res.status(200).json(businesses);
  } catch (error) {
    res.status(404).json({ error });
  }
};

export const businessLogin = (req, res) => {
  const { businessEmail, businessPassword } = req.body;

  //Check all validation
  if (!businessEmail || !businessPassword) {
    return res.status(400).json({ message: "Please check all fields" });
  }

  //Check for existing user
  Businesses.findOne({ businessEmail }).then((business) => {
    if (!business)
      return res.status(400).json({ msg: "business does not exist" });

    //Validate businessPassword
    bcrypt
      .compare(businessPassword, business.businessPassword)
      .then((isMatch) => {
        if (!isMatch)
          return res.status(400).json({ msg: "Invalid credentials" });
        jwt.sign(
          {
            id: business._id,
            businessEmail: business.businessEmail,
            customerStripeID: business.customerStripeID,
          },
          JWT_SECRET,
          { expiresIn: 86000 },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
            });
          }
        );
      });
  });
};

export const businessRegister = async (req, res) => {
  const {
    businessName,
    businessCategory,
    businessEmail,
    businessPassword,
    businessPhone,
    businessAddress,
    businessCountry,
    businessIlce,
  } = req.body;
  //Check for existing user
  const business = await Businesses.findOne({ businessEmail: businessEmail });
  if (business) {
    res.status(400).json({ error: "Business already exist" });
  } else {
    if (
      !businessName ||
      !businessCategory ||
      !businessEmail ||
      !businessPassword ||
      !businessPhone ||
      !businessAddress ||
      !businessCountry ||
      !businessIlce
    ) {
      res.status(400).json("please check all fields");
    } else {
      const customer = await stripe.customers.create(
        {
          email: businessEmail,
        },
        {
          apiKey: process.env.STRIPE_SECRET_KEY,
        }
      );
      const newBusiness = await Businesses.create({
        businessName,
        businessCategory,
        businessEmail,
        businessPassword,
        businessPhone,
        customerStripeID: customer.id,
        businessAddress,
        businessCountry,
        businessIlce,
      });
      const msg = {
        to: `${businessEmail}`,
        from: "noreply@em492.randevum.tech",
        templateId: "d-39c895d341594acb8eaf70c53284102c",
        dynamicTemplateData: {
          businessName: `${businessName}`,
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
      //Generate salt & hashed businessPassword
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newBusiness.businessPassword, salt, (err, hash) => {
          if (err) throw err;
          newBusiness.businessPassword = hash;
          newBusiness.save().then((business) => {
            jwt.sign(
              {
                id: business._id,
                businessName: business.businessName,
                businessCategory: business.businessCategory,
                businessEmail: business.businessEmail,
                businessPhone: business.businessPhone,
                businessPlan: business.businessPlanID,
                businessAddress: business.businessAddress,
                businessCountry: business.businessCountry,
                businessIlce: business.businessIlce,
              },
              JWT_SECRET,
              (err, token) => {
                if (err) throw err;
                res.status(200).json({
                  token,
                  business: {
                    id: business._id,
                    businessName: business.businessName,
                    businessCategory: business.businessCategory,
                    businessEmail: business.businessEmail,
                    businessPhone: business.businessPhone,
                    businessAddress: business.businessAddress,
                    businessCountry: business.businessCountry,
                    businessIlce: business.businessIlce,
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

export const setMeetDates = async (req, res) => {
  const businessID = req.business.id;
  const { meetDates } = req.body;
  try {
    await Businesses.findById({ _id: businessID }).then((business) => {
      if (!business) {
        res.status(404).json("İşletme Bulunamadı");
      } else {
        business.businessMeetDates = meetDates;
        business
          .save()
          .then((newBusiness) => res.status(200).json(newBusiness));
      }
    });
  } catch (error) {
    res.status(400).json("SetMeetDates Error");
  }
};

export const setMeetTimes = async (req, res) => {
  const businessID = req.business.id;
  const { meetTimes } = req.body;
  try {
    await Businesses.findById({ _id: businessID }).then((business) => {
      if (!business) {
        res.status(404).json("İşletme Bulunamadı");
      } else {
        business.businessMeetTimes = meetTimes;
        business
          .save()
          .then((newBusiness) => res.status(200).json(newBusiness));
      }
    });
  } catch (error) {
    res.status(400).json("SetMeetTime Error");
  }
};
