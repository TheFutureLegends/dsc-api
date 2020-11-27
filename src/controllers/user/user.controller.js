import db from "../../models/index.js";
import userCrud from "../../actions/userCrud.action.js";
import userClasses from "../../classes/user.class.js";

const User = db.user;

const Post = db.post;

const University = db.university;

const Club = db.club;

const userClass = new userClasses();

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

    userClass.userAPI = user;

    userClass.userPosts = posts;

    // const user = await User.aggregate([
    //   {
    //     $match: {
    //       username: req.params.username,
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "posts",
    //       localField: "_id",
    //       foreignField: "author",
    //       as: "posts",
    //     },
    //   },
    //   {
    //     $unwind: "$posts.category",
    //   },
    //   {
    //     $lookup: {
    //       from: "categories",
    //       localField: "posts.category",
    //       foreignField: "_id",
    //       as: "posts.category",
    //     },
    //   },
    //   {
    //     $limit: 1,
    //   },
    // ]).exec();

    return res.status(200).send({ users: userClass.getProfile() });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const getUser = async (req, res) => {
  const user = await User.findById(req.userId).populate("roles").exec();

  if (user) {
    userClass.userAPI = user;

    return res.status(200).send(userClass.getUser());
  }

  return res.status(500).send({
    message: "Server error. Please reload browser!",
  });
};

const readUser = async (req, res) => {
  const logged_user = await User.findById(req.userId).populate("roles").exec();

  const users = await User.find({
    university: logged_user.university,
  })
    .populate("roles")
    .exec();

  const result = userCrud.readUser(users);

  return res.status(200).send({ users: result });
};

const createUser = async (req, res) => {
  const club_array = [];

  const { clubs } = req.body;

  clubs.forEach(async (value, index) => {
    const club = await Club.findOne({
      slug: value.toLowerCase(),
    }).exec();

    club_array.push(club._id);
  });

  const university = await University.findOne({
    slug: req.body.university.toLowerCase(),
  }).exec();

  const userCondition = userCrud.createUser(
    req.body,
    university._id,
    club_array
  );
};

const editUser = async (req, res) => {};
const updateUser = async (req, res) => {};
const deleteUser = async (req, res) => {};

const userController = {
  getProfile,
  getUser,
  readUser,
  createUser,
  editUser,
  updateUser,
  deleteUser,
};

export default userController;
