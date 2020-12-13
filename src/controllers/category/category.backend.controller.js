import db from "../../models/index.js";
import service from "../../services/index.js";
import validationRules from "../../validations/index.js";
import utilities from "../../utilities/index.js";

const Category = db.category;

const createCatetory = (req, res) => {
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

const editCategory = (req, res) => {};

const updateCategory = (req, res) => {};

const deleteCategory = (req, res) => {};

const categoryBackend = { createCatetory, readCategory };

export default categoryBackend;
