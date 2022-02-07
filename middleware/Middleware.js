//checkUserAuth
import jwt from "jsonwebtoken";

const JWT = process.env.JWT;

export const checkUserAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodeToken = jwt.verify(token, JWT);
    req.user = decodeToken;
    next();
  } catch (error) {
    res.status(401).json("Authorization Failed");
  }
};

export const checkBusinessAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodeToken = jwt.verify(token, JWT);
    req.business = decodeToken;
    next();
  } catch (error) {
    res.status(401).json("Authorization Failed");
  }
};
