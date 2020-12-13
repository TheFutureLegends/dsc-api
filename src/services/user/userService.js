import bcrypt from "bcryptjs";
import db from "../../models/index.js";
import userContainer from "../../containers/user/userContainer.js";

const User = db.user;

const userContainers = new userContainer();

const readUser = (users) => {
  const result = [];

  users.forEach((value, index) => {
    userContainers.userAPI = value;

    result.push(userContainers.getUser());
  });

  return result;
};

const createUser = (body) => {
  const user = new User({
    username: body.username,
    email: body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    // university: universityId,
    // club: clubArrayId,
  });

  user.save((err, user) => {
    if (err) {
      return {
        status: 400,
        message: err.message,
      };
    }
  });

  return {
    status: 201,
    message: "User Created Successfully",
  };
};

const updateUser = () => {};

const deleteUser = (user) => {
  user.deleteOne((err, user) => {
    if (err) {
      return {
        status: 400,
        message: err.message,
      };
    }
  });

  return {
    status: 204,
    message: "User Deleted Successfully!",
  };
};

const userCrud = {
  readUser,
  createUser,
  updateUser,
  deleteUser,
};

export default userCrud;
