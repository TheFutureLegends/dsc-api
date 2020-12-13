import db from "../../models/index.js";
import service from "../../services/index.js";
import validationRules from "../../validations/index.js";
import utilities from "../../utilities/index.js";

const createCatetory = (req, res) => {
  const categoryService = service.categoryService.createCategory(req.body);

  return res
    .status(categoryService.status)
    .send({ message: categoryService.message });
};

const readCategory = (req, res) => {};

const editCategory = (req, res) => {};

const updateCategory = (req, res) => {};

const deleteCategory = (req, res) => {};

const categoryBackend = { createCatetory };

export default categoryBackend;
