import utils from "../../utils/index.js";

class categoryContainer {
  constructor() {}

  get category() {
    return this._category;
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
    return {
      title: this._category.title,
      slug: this._category.slug,
      description: this._category.description,
      createdAt: utils.format.date(this._category.createdAt),
    };
  }
}

export default categoryContainer;
