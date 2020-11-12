import db from "../../models/index.js";

const User = db.user;

const Role = db.role;

const getProfile = async (req, res) => {
  const user = await User.findById(req.userId).populate("roles").exec();

  if (user) {
    var authorities = [];

    for (let i = 0; i < user.roles.length; i++) {
      authorities.push(user.roles[i].name.toLowerCase());
    }

    return res.status(200).send({
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      roles: authorities,
    });
  }

  return res.status(500).send({
    message: "Server error. Please reload browser!",
  });
};

export { getProfile };
