import express from "express";
import { listProducts,addProduct,searchProduct,removeProduct, updateProduct } from "../controllers/productController.js";
import upLoad from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
const productRouter = express.Router();
productRouter.post(
  "/add",adminAuth,
  upLoad.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.post(
  "/update",
  adminAuth,
  upLoad.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  updateProduct
);
productRouter.post("/remove",adminAuth, removeProduct);
productRouter.post("/search", searchProduct);
productRouter.get("/list", listProducts);
export default productRouter;
