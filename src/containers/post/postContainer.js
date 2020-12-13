import utilities from "../../utilities/index.js";

class postContainer {
  constructor() {}

  get post() {
    return this._post;
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
    return {
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
      createdAt: utilities.converter.convertDateToString(this._post.createdAt),
    };
  }
}

export default postContainer;
