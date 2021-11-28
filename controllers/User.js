import User from "../models/User.model.js";

export const getUser = (req, res) => {
  res.send("User");
};

export const getUserByID = async (req, res) => {
  try {
    const params = req.params.id;
    const filterUserByID = await User.findOne({ _id: params });
    res.status(200).json(filterUserByID);
    console.log(params);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
