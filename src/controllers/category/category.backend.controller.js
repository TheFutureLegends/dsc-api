import db from "../../models/index.js";
import service from "../../services/index.js";
import validationRules from "../../validations/index.js";
import utilities from "../../utilities/index.js";

const Category = db.category;

const createCategory = (req, res) => {
  const categoryService = service.categoryService.createCategory(req.body);

  return res
    .status(categoryService.status)
    .send({ message: categoryService.message });
};

const readCategory = async (req, res) => {
  const categories = await Category.find().exec();

  const categoryService = service.categoryService.readCategory(categories);

  return res
    .status(categoryService.status)
    .send({ message: categoryService.message, data: categoryService.data });
};

const editCategory = async (req, res) => {
  const category = await Category.findOne({
    slug: req.params.slug,
  }).exec();

  const categoryService = service.categoryService.editCategory(category);

  return res
    .status(categoryService.status)
    .send({ message: categoryService.message, data: categoryService.data });
};

const updateCategory = (req, res) => {};

const deleteCategory = (req, res) => {};

const categoryBackend = {
  createCategory,
  readCategory,
  editCategory,
  updateCategory,
  deleteCategory,
};

export default categoryBackend;
