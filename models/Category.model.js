import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  categoryName: String,
  imageURL: String,
  urlParams: String,
});

const Category = mongoose.model("Categories", categorySchema);

export default Category;
