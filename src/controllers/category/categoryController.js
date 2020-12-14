import db from "../../models/index.js";
import service from "../../services/index.js";
import validationRules from "../../validations/index.js";
import utilities from "../../utilities/index.js";
import categoryContainer from "../../containers/category/categoryContainer.js";

const Category = db.category;

const categoryContainers = new categoryContainer();

const getAllCategories = async (req, res) => {
  /**
   * Deconstruct limit and page from url query
   */
  const { limit = 10, page = 1 } = req.query;

  const categories = await Category.find()
    .limit(utilities.converter.convertStringToNumber(limit))
    .skip(
      (utilities.converter.convertStringToNumber(page) - 1) *
        utilities.converter.convertStringToNumber(limit)
    )
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

const createCategory = (req, res) => {
  const categoryService = service.categoryService.createCategory(req.body);

  return res
    .status(categoryService.status)
    .send({ message: categoryService.message });
};

const readCategory = async (req, res) => {
  try {
    const categories = await Category.find().exec();

    const categoryService = service.categoryService.readCategory(categories);

    return res
      .status(categoryService.status)
      .send({ message: categoryService.message, data: categoryService.data });
  } catch (error) {
    return res.status(error.status).send({ message: error.message });
  }
};

const editCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.category_id).exec();

    const categoryService = service.categoryService.editCategory(category);

    return res
      .status(categoryService.status)
      .send({ message: categoryService.message, data: categoryService.data });
  } catch (error) {
    return res.status(error.status).send({ message: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.category_id).exec();

    const categoryService = service.categoryService.updateCategory(
      category,
      req.body
    );

    return res
      .status(categoryService.status)
      .send({ message: categoryService.message });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.category_id).exec();

    const categoryService = service.categoryService.deleteCategory(category);

    return res
      .status(categoryService.status)
      .send({ message: categoryService.message });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const categoryController = {
  getAllCategories,
  getCategoryByName,
  createCategory,
  readCategory,
  editCategory,
  updateCategory,
  deleteCategory,
};

export default categoryController;
