import Businesses from "../models/Businesses.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT;

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

export const getBusinessesByID = async (req, res) => {
  const params = req.params.id;
  try {
    const business = await Businesses.findOne({ _id: params });
    res.status(200).json({
      businessID: business._id,
      businessName: business.businessName,
      businessCategory: business.businessCategory,
      businessEmail: business.businessEmail,
      businessEmail: business.businessEmail,
      businessAddress: business.businessAddress,
      businessCountry: business.businessCountry,
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
          },
          JWT_SECRET,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({
              business: {
                token,
                id: business._id,
                businessEmail: business.businessEmail,
              },
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
      const newBusiness = await Businesses.create({
        businessName,
        businessCategory,
        businessEmail,
        businessPassword,
        businessPhone,
        businessAddress,
        businessCountry,
        businessIlce,
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
                businessAddress: business.businessAddress,
                businessCountry: business.businessCountry,
                businessIlce: business.businessIlce,
              },
              JWT_SECRET,
              { expiresIn: 3600 },
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
