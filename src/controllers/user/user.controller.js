import db from "../../models/index.js";
import service from "../../services/index.js";
import userContainer from "../../containers/user/userContainer.js";

const User = db.user;

const Post = db.post;

// const University = db.university;

// const Club = db.club;

const userContainers = new userContainer();

const getProfile = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const user = await User.findOne({
      username: req.params.username,
    }).exec();

    const posts = await Post.find({
      author: user._id,
    })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate(["category", "author"])
      .exec();

    userContainers.userAPI = user;

    userContainers.userPosts = posts;

    return res.status(200).send({ users: userContainers.getProfile() });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const getUserProfile = async (req, res) => {
  const user = await User.findById(req.userId).populate("roles").exec();

  if (user) {
    userContainers.userAPI = user;

    return res.status(200).send(userContainers.getUser());
  }

  return res.status(500).send({
    message: "Server error. Please reload browser!",
  });
};

const readUser = async (req, res) => {
  const users = await User.findById(req.userId).populate("roles").exec();

  const result = service.userService.readUser(users);

  return res.status(200).send({ users: result });
};

const createUser = async (req, res) => {
  const userService = service.userService.createUser(req.body);

  return res.status(userService.status).send({ message: userService.message });
};

const editUser = async (req, res) => {};
const updateUser = async (req, res) => {};
const deleteUser = async (req, res) => {};

const userController = {
  getProfile,
  getUserProfile,
  readUser,
  createUser,
  editUser,
  updateUser,
  deleteUser,
};

export default userController;
