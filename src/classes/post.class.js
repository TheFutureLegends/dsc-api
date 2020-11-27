import utils from "../utils/index.js";

class postClasses {
  constructor() {}

  get post() {
    return this._post;
  }

  set setPost(post) {
    this._post = post;
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
      createdAt: utils.format.date(this._post.createdAt),
    };
  }
}

export default postClasses;
