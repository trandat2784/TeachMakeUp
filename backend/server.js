import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongoosedb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import postRouter from "./routes/postRoute.js";
import reviewRouter from "./routes/reviewRoute.js";
import commentRouter from "./routes/commentRoute.js";

const app = express();
const port = process.env.PORT || 3000;
connectDB();
connectCloudinary();
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());

//api endpoint
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/post", postRouter);
app.use("/api/review", reviewRouter);
app.use("/api/comment",commentRouter);

app.get("/", (req, res) => {
  res.send("backend");
});

app.listen(port, () => {
  console.log("listening on", port);
});
