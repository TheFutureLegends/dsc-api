import db from "../models/index.js";
import postClasses from "../classes/post.class.js";

class userClasses {
  constructor() {
    // this.user = user;
  }

  get user() {
    return this._user;
  }

  set userPosts(posts) {
    this._user_post = posts;
  }

  set userAPI(user) {
    this._user = user;
  }

  getProfile() {
    const postClass = new postClasses();

    var post_result = [];

    var posts = this._user_post;

    posts.forEach((value, index) => {
      postClass.setPost = value;

      post_result.push(postClass.getPost());
    });

    return {
      username: this._user.username,
      email: this._user.email,
      avatar: this._user.avatar,
      posts: post_result,
    };
  }

  getUser() {
    var authorities = [];

    for (let i = 0; i < this._user.roles.length; i++) {
      authorities.push(this._user.roles[i].name.toLowerCase());
    }

    return {
      username: this._user.username,
      email: this._user.email,
      avatar: this._user.avatar,
      roles: authorities,
    };
  }
}

export default userClasses;
