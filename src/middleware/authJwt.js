import jwt from "jsonwebtoken";
import db from "../models/index.js";

const User = db.user;

const Role = db.role;

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }

    req.userId = decoded.id;

    next();
  });
};

const authJwt = {
  verifyToken,
};

export default authJwt;
