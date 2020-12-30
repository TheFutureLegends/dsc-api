import utilities from "../../utilities/index.js";

class postContainer {
  constructor() {
    this._isList = false;
  }

  get post() {
    return this._post;
  }

  get isList() {
    return this._isList;
  }

  set setIsList(isList) {
    this._isList = isList;
  }

  set setPostArray(postArray) {
    this._post_array = postArray;
  }

  set setPost(post) {
    this._post = post;
  }

  getPostArray() {
    const result = [];

    if (!utilities.condition.isEmptyArray(this._post_array)) {
      this._post_array.forEach((value, index) => {
        this.setPost = value;

        result.push(this.getPost());
      });
    }

    return result;
  }

  getPost() {
    let result = {};

    if (this._post) {
      result = {
        title: this._post.title,
        slug: this._post.slug,
        description: this._post.description,
        visit: this._post.visit,
        image: this._post.image,
        category: {
          title: this._post.category.title,
          slug: this._post.category.slug,
        },
        author: {
          username: this._post.author.username,
          avatar: this._post.author.avatar,
        },
        createdAt: utilities.converter.convertDateToString(
          this._post.createdAt
        ),
      };

      /*if (this._isList) {
      result._id = this._post._id;
    }*/
      result._id = this._post._id;
    }

    return result;
  }
}

export default postContainer;
