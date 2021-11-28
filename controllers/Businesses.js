import Businesses from "../models/Businesses.model.js";

export const createBusinesses = async (req, res) => {
  const {
    businessName,
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
      businessName,
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
};

export const getBusinessesByID = async (req, res) => {
  const params = req.params.id;
  console.log(params);
  try {
    const business = await Businesses.findOne({ _id: params });
    res.status(200).json(business);
  } catch (error) {
    res.status(404).json({ error });
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
