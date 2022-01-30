import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  categoryName: String,
  imageURL: String,
  urlParams: String,
  mobileIconName: String,
});

const Category = mongoose.model("Categories", categorySchema);

export default Category;
