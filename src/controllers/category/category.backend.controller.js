import db from "../../models/index.js";
import postCrud from "../../actions/postCrud.action.js";
import validationRules from "../../validations/index.js";

const Category = db.category;

const createCatetory = (req, res) => {
  //Creates a new book
  var category = new Category(req.body);

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
