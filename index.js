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
import supportRouter from "./routes/Support.js";
import commentRouter from "./routes/Comments.js";
import notificationsRouter from "./routes/Notifications.js";
import plansRouter from "./routes/Plan.js";
import panelRouter from "./routes/Panel.js";

import { checkUserAuth } from "./middleware/Middleware.js";

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

app.get("/", checkUserAuth, (req, res) => {
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

//Business Panel
app.use("/panel", panelRouter);

app.get("/userData", checkUserAuth, (req, res) => {
  const userData = req.user;
  try {
    res.send(userData);
  } catch (error) {
    res.status(403).json("Hata");
  }
});

/*app.get("/mail", (req, res) => {
  try {
    const msg = {
      to: `celikhakan5255@gmail.com`,
      from: "noreply@em492.randevum.tech",
      subject: "Şifreni Sıfırla",
      templateId: "d-0e579b85dcf94bcf8ae634415bd7b349",
      dynamicTemplateData: {
        buttonURL: `https://randevum.tech/login/forgot-password`,
      },
    };
    sgMail
      .send(msg)
      .then(() => {
        res.status(200).json("Mail Send");
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    res.json("asd");
  }
});*/

//Githuba Atılmadan Port Değişecek,IP Silinecek
app.listen(8001, "0.0.0.0", () => {
  console.log("Server Started");
});
