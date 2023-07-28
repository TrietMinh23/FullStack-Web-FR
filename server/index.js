import express from "express"; //pour utiliser la bibliothèque ExpressJS
// import bodyParser from "body-parser";
import cors from "cors";
import userRouter from "./routers/userRoute.js";
import sellerRouter from "./routers/sellerRoute.js";
import productRouter from "./routers/producRoute.js";
import pCategoryRouter from "./routers/pCategoryRoute.js"
import orderRouter from "./routers/orderRoute.js"
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 5000;
const URI =
  "mongodb+srv://hnmthu21:mthng05@cluster0.bq9x2ci.mongodb.net/?retryWrites=true&w=majority";

app.use(express.json()); //yêu cầu đối tượng đầu vào là object json, xử lý POST PUT
app.use(express.urlencoded({extended: true, limit: "30mb"})); //yêu cầu đối tượng đầu vào là chuỗi hoặc mảng, xử lý POST PUT
app.use(cors()); //tắt Same-Origin Policy và cho phép các máy chủ khác truy cập

app.get("/", (req, res) => {
  res.send("SUCCESS. Hello world from NODE");
});

// http://localhost:5000/posts
// app.use("/users", userRouter);
app.use("/sellers", sellerRouter);
app.use("/buyers/", userRouter);
app.use("/products", productRouter);
app.use("/pcategorys", pCategoryRouter);
app.use("/orders", orderRouter);

mongoose
  .connect(URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log("Connected to DB.");
    app.listen(PORT, () => {
      console.log(`Server is connecting to ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
