import utilities from "../../utilities/index.js";

class commentContainer {
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
      createdAt: utilities.converter.convertDateToString(
        this._comment.createdAt
      ),
    };
  }
}

export default commentContainer;
