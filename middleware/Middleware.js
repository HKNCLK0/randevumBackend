//Middleware
import jwt from "jsonwebtoken";

const JWT = process.env.JWT;

export const middleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodeToken = jwt.verify(token, JWT);
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json("Authorization Failed");
  }
};
