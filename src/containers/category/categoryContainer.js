import utilities from "../../utilities/index.js";

class categoryContainer {
  constructor() {}

  get category() {
    return this._category;
  }

  get isAdmin() {
    return this._isAdmin;
  }

  set setIsAdmin(isAdmin = false) {
    this._isAdmin = isAdmin;
  }

  set setCategoryArray(categoryArray) {
    this._category_array = categoryArray;
  }

  set setCategory(category) {
    this._category = category;
  }

  getCategoryArray() {
    const result = [];

    this._category_array.forEach((value, index) => {
      this.setCategory = value;

      result.push(this.getCategory());
    });

    return result;
  }

  getCategory() {
    const result = {
      title: this._category.title,
      slug: this._category.slug,
      description: this._category.description,
      createdAt: utilities.converter.convertDateToString(
        this._category.createdAt
      ),
    };

    if (this._isAdmin) {
      result._id = this._category._id;
    }

    return result;
  }
}

export default categoryContainer;
