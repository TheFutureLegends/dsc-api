import db from "../../models/index.js";
import categoryContainer from "../../containers/category/categoryContainer.js";
import slugify from "slugify";

const Category = db.category;

const categoryContainers = new categoryContainer();

const getAllCategories = async (req, res) => {
  const { limit = 10, page = 1 } = req.query;

  const categories = await Category.find()
    .limit(parseInt(limit))
    .skip((parseInt(page) - 1) * parseInt(limit))
    .exec();

  categoryContainers.setCategoryArray = categories;

  return res
    .status(200)
    .send({ categories: categoryContainers.getCategoryArray() });
};

const getCategoryByName = async (req, res) => {
  const category = await Category.findOne({
    slug: slugify(req.params.category_name.toLowerCase()),
  });

  categoryContainers.setCategory = category;

  return res.status(200).send(categoryContainers.getCategory());
};

const categoryFrontend = {
  getAllCategories,
  getCategoryByName,
};

export default categoryFrontend;
