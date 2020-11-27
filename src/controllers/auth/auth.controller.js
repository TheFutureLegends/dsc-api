import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Import model
import db from "../../models/index.js";
import validationRules from "../../validations/index.js";

const User = db.user;

const Role = db.role;

export const signup = async (req, res) => {
  // Validate input
  const { error } = validationRules.authValidation.registerSchema.validate(
    req.body
  );

  if (error) return res.status(400).send(error.details[0].message);

  const existed_user = await User.find({
    email: req.body.email,
  });

  if (existed_user[0]) {
    return res
      .status(400)
      .send({ message: "Email has already taken. Please choose another!" });
  }

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            return res
              .status(201)
              .send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          return res
            .status(201)
            .send({ message: "User was registered successfully!" });
        });
      });
    }

    return res
      .status(201)
      .send({ message: "User was registered successfully!" });
  });
};

export const signin = (req, res) => {
  const { error } = validationRules.authValidation.loginSchema.validate(
    req.body
  );

  if (error) return res.status(400).send(error.details[0].message);

  User.findOne({
    email: req.body.email,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res
          .status(404)
          .send({ message: "Email or password does not match!" });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Email or password does not match!",
        });
      }

      var token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION_TIME,
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        roles: authorities,
        accessToken: {
          token: token,
          expiresIn: process.env.TOKEN_EXPIRATION_TIME,
        },
      });
    });
};
