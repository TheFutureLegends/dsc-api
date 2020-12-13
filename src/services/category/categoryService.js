import db from "../../models/index.js";
import categoryContainer from "../../containers/category/categoryContainer.js";
import utilities from "../../utilities/index.js";

const Category = db.category;

const categoryContainers = new categoryContainer();

const readCategory = (categories) => {
  try {
    const result = [];

    categoryContainers.setIsAdmin = true;

    categories.forEach((value, index) => {
      categoryContainers.setCategory = value;

      result.push(categoryContainers.getCategory());
    });

    return {
      status: 200,
      message: "Load categories successfully!",
      data: result,
    };
  } catch (error) {
    return {
      status: 400,
      message: error.message,
      data: null,
    };
  }
};

const createCategory = (body) => {
  //Creates a new category
  // slug: utilities.converter.converStringToSlug(body.title),
  var category = new Category({
    title: body.title,

    description: body.description,
  });

  //Save it into the DB.
  category.save((err, category) => {
    if (err) {
      return {
        status: 400,
        message: err.message,
      };
    }
  });

  return {
    status: 201,
    message: "Category created successfully",
  };
};

const editCategory = (category) => {
  categoryContainers.setIsAdmin = true;

  categoryContainers.setCategory = category;

  return {
    status: 200,
    message: "Load category successfully!",
    data: categoryContainers.getCategory(),
  };
};

const updateCategory = () => {};

const deleteCategory = () => {};

const categoryService = {
  readCategory,
  createCategory,
  editCategory,
  updateCategory,
  deleteCategory,
};

export default categoryService;
