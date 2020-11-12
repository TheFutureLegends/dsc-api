import db from "../models/index.js";

const User = db.user;

const getUser = async (userId) => {
  try {
    const user = await User.findById(userId).populate("roles").exec();

    return user;
  } catch (error) {
    console.error("ERROR: ", error.message);

    return null;
  }
};

export { getUser };
