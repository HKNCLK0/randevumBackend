import Meets from "../models/Meets.model.js";

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
    const newMeet = await Meets.create({
      userID,
      businessID,
      businessName,
      date,
      clock,
    });
    res.status(200).json({ newMeet });
  } catch (error) {
    res.status(400).json(error);
  }
};
