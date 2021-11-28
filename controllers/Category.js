import Category from "../models/Category.model.js";

export const getCategory = async (req, res) => {
  try {
    const getCategory = await Category.find();
    res.status(200).json(getCategory);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const getCategoryByID = async (req, res) => {
  try {
    const params = req.params.id;
    const filterCategoryByID = await Category.findOne({ _id: params });
    res.status(200).json(filterCategoryByID);
    console.log(params);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const createCategory = async (req, res) => {
  const { categoryName, imageURL } = req.body;
  try {
    const newCategory = await Category.create({
      categoryName,
      imageURL,
    });
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
