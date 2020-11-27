import utils from "../utils/index.js";

class commentClasess {
  constructor() {}

  get comments() {
    return this._comment;
  }

  set setComment(comment) {
    this._comment = comment;
  }

  getComment() {
    return {
      content: this._comment.content,
      author: {
        username: this._comment.author.username,
        avatar: this._comment.author.avatar,
      },
      createdAt: utils.format.date(this._comment.createdAt),
    };
  }
}

export default commentClasess;
