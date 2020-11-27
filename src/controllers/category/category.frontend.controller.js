import db from "../../models/index.js";
import categoryClasses from "../../classes/category.class.js";

const Category = db.category;

const categoryClass = new categoryClasses();

const getAllCategories = async (req, res) => {
  const { limit = 10, page = 1 } = req.query;

  const categories = await Category.find({})
    .limit(limit)
    .skip((page - 1) * limit)
    .exec();

  categoryClass.setCategoryArray = categories;

  return res.status(200).send({ categories: categoryClass.getCategoryArray() });
};

const categoryFrontend = {
  getAllCategories,
};

export default categoryFrontend;
