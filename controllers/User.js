import User from "../models/User.model.js";

export const getUser = (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => res.status(400).json(err));
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

export const deleteUser = (req, res) => {
  try {
    const params = req.params.id;
    User.findByIdAndDelete(params).then((user) => {
      res.status(200).json(user);
    });
  } catch (error) {
    res.status(404).json(error);
  }
};
