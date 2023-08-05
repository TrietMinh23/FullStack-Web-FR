import express from "express"; //pour utiliser la bibliothèque ExpressJS
// import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import userRouter from "./routers/userRoute.js";
import sellerRouter from "./routers/sellerRoute.js";
import productRouter from "./routers/producRoute.js";
import pCategoryRouter from "./routers/pCategoryRoute.js";
import orderRouter from "./routers/orderRoute.js";
import reportRoute from "./routers/reportRoute.js";
import mongoose from "mongoose";
import { Product } from "./models/productModel.js";
import { data } from "./data.js";
import slugify from "slugify";
import vnpayRoute from "./routers/vnpayRoute.js";

const app = express(process.env.DATABASE);
const PORT = process.env.PORT || 5000;
const URI = process.env.DATABASE;

app.use(express.json()); //yêu cầu đối tượng đầu vào là object json, xử lý POST PUT
app.use(express.urlencoded({ extended: true, limit: "30mb" })); //yêu cầu đối tượng đầu vào là chuỗi hoặc mảng, xử lý POST PUT
app.use(cors()); //tắt Same-Origin Policy và cho phép các máy chủ khác truy cập

app.get("/", (req, res) => {
  res.send("SUCCESS. Hello world from NODE");
});

// http://localhost:5000/posts
app.use("/users", userRouter);
app.use("/sellers", sellerRouter);
app.use("/buyers", userRouter);
app.use("/products", productRouter);
app.use("/pcategories", pCategoryRouter);
app.use("/orders", orderRouter);
app.use("/vnpay", vnpayRoute);
app.use("/users", userRouter);
app.use("/report", reportRoute);

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Connected to DB.");
    app.listen(PORT, () => {
      console.log(`Server is connecting to ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
