import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";
import jwt from "jsonwebtoken";

//TODO:Bearer Token Yapılacak

//TODO:User Model İsimleri Düzenlenecek
//Routes Import
import authRouter from "./routes/Auth.js";
import userRoute from "./routes/User.js";
import passwordRouter from "./routes/Password.js";
import categoryRoute from "./routes/Category.js";
import meetRoute from "./routes/Meet.js";
import businessesRouter from "./routes/Businesses.js";
import supportRouter from "./routes/Support.js";
import commentRouter from "./routes/Comments.js";
import notificationsRouter from "./routes/Notifications.js";
import plansRouter from "./routes/Plan.js";
import { middleware } from "./middleware/Middleware.js";

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
mongoose.connect(
  process.env.CONNECTION_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  console.log("Connected to MongoDB!!!")
);

app.get("/", middleware, (req, res) => {
  res.status(200).json({ message: "Hello Randevum Backend" });
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

//Create Support
app.use("/support", supportRouter);

//Comments
app.use("/comments", commentRouter);

//Notifications
app.use("/notifications", notificationsRouter);

//Plans
app.use("/plans", plansRouter);

const JWT = process.env.JWT;

app.get("/deneme/data", middleware, (req, res) => {
  const userData = req.user;
  try {
    res.send(userData);
  } catch (error) {
    res.status(403).json("Hata");
  }
});

app.listen(() => {
  console.log("Server Started");
});

//Cpanel
/* 
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const sgMail = require("@sendgrid/mail");
const jwt = require("jsonwebtoken");

//TODO:Bearer Token Yapılacak

//TODO:User Model İsimleri Düzenlenecek
//Routes const
const authRouter = require("./routes/Auth.js");
const userRoute = require("./routes/User.js");
const passwordRouter = require("./routes/Password.js");
const categoryRoute = require("./routes/Category.js");
const meetRoute = require("./routes/Meet.js");
const businessesRouter = require("./routes/Businesses.js");
const supportRouter = require("./routes/Support.js");
const commentRouter = require("./routes/Comments.js");
const notificationsRouter = require("./routes/Notifications.js");
const plansRouter = require("./routes/Plan.js");
const { middleware } = require("./middleware/Middleware.js");

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
mongoose.connect(
  process.env.CONNECTION_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  console.log("Connected to MongoDB!!!")
);

app.get("/", middleware, (req, res) => {
  res.status(200).json({ message: "Hello Randevum Backend" });
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

//Create Support
app.use("/support", supportRouter);

//Comments
app.use("/comments", commentRouter);

//Notifications
app.use("/notifications", notificationsRouter);

//Plans
app.use("/plans", plansRouter);

const JWT = process.env.JWT;

app.get("/deneme/data", middleware, (req, res) => {
  const userData = req.user;
  try {
    res.send(userData);
  } catch (error) {
    res.status(403).json("Hata");
  }
});

app.listen(() => {
  console.log("Server Started");
});

*/
