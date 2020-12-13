import db from "../../models/index.js";
import service from "../../services/index.js";
import validationRules from "../../validations/index.js";
import slugify from "slugify";

const Category = db.category;

const createCatetory = (req, res) => {
  //Creates a new book
  var category = new Category({
    title: req.body.title,
    slug: slugify(req.body.title.toLowerCase()),
    description: req.body.description,
  });

  //Save it into the DB.
  category.save((err, category) => {
    if (err) {
      res.send(err);
    } else {
      //If no errors, send it back to the client
      res.json({ category });
    }
  });
};

const categoryBackend = { createCatetory };

export default categoryBackend;
