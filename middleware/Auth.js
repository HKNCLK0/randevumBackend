import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function Auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: "No Token, authorizaton denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT);
    req.user = decoded;
    console.log(req.user);
    console.log(`decoded : ${decoded}`);
    next();
  } catch (error) {
    res.status(400).json({ message: "Token is not valid" });
  }
};
