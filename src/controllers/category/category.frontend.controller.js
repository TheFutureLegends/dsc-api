import db from "../../models/index.js";
import categoryClasses from "../../classes/category.class.js";
import slugify from "slugify";

const Category = db.category;

const categoryClass = new categoryClasses();

const getAllCategories = async (req, res) => {
  const { limit = 10, page = 1 } = req.query;

  const categories = await Category.find()
    .limit(parseInt(limit))
    .skip((parseInt(page) - 1) * parseInt(limit))
    .exec();

  categoryClass.setCategoryArray = categories;

  return res.status(200).send({ categories: categoryClass.getCategoryArray() });
};

const getCategoryByName = async (req, res) => {
  const category = await Category.findOne({
    slug: slugify(req.params.category_name.toLowerCase()),
  });

  categoryClass.setCategory = category;

  return res.status(200).send(categoryClass.getCategory());
};

const categoryFrontend = {
  getAllCategories,
  getCategoryByName,
};

export default categoryFrontend;
