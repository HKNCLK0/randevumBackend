import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";

//Routes Import
import authRouter from "./routes/Auth.js";
import userRoute from "./routes/User.js";
import passwordRouter from "./routes/Password.js";
import categoryRoute from "./routes/Category.js";
import meetRoute from "./routes/Meet.js";
import businessesRouter from "./routes/Businesses.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
mongoose.connect(process.env.CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
() => {
  console.log("connected to DB");
};

app.get("/", (req, res) => {
  res.status(400).json({ message: "Access Denied" });
});

//Category
app.use("/category", categoryRoute);

//User
app.use("/user", userRoute);

//Meets
app.use("/meets", meetRoute);

app.use("/businesses", businessesRouter);
// Login and register
app.use("/auth", authRouter);

//Reset Password
app.use("/password-reset", passwordRouter);

app.listen(5001, "0.0.0.0", () => {
  console.log("Server Started");
});
