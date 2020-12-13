import db from "../../models/index.js";
import utilities from "../../utilities/index.js";

const Category = db.category;

const createCategory = (body) => {
  //Creates a new book
  var category = new Category({
    title: body.title,
    slug: utilities.converter.converStringToSlug(body.title),
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

const categoryService = {
  createCategory,
};

export default categoryService;
