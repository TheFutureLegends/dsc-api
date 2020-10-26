import db from "../../models/index.js";

const User = db.user;

const allAccess = (req, res) => {
  return res.status(200).send("Public Content.");
};

const userBoard = (req, res) => {
  return res.status(200).send("User Content.");
};

const adminBoard = (req, res) => {
  return res.status(200).send("Admin Content.");
};

const moderatorBoard = (req, res) => {
  return res.status(200).send("Moderator Content.");
};

const getProfile = async (req, res) => {
  User.findById(req.userId).exec((err, result) => {
    if (err) {
      return res.status(400).send({ message: err });
    }

    return res.status(200).send({
      username: result.username,
      email: result.email,
    });
  });
};

export { allAccess, userBoard, moderatorBoard, adminBoard, getProfile };
