import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: Array, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  linkProduct: { type: String, },
  // price: { type: Number, required: true },
  // sizes: { type: Array },
  // bestSeller: { type: Boolean },
  // date: { type: Number, required: true },
});
const productModel=  mongoose.models.product||mongoose.model("product",productSchema);
export default productModel


