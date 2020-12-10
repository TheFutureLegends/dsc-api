process.env.NODE_ENV = "test";

import mongoose from "mongoose";
import chai from "chai";
import chaiHttp from "chai-http";

import db from "../src/models/index.js";

import app from "../index.js";

const Post = db.post;

let should = chai.should();

let expect = chai.expect;

chai.use(chaiHttp);

describe("Post", () => {
  beforeEach((done) => {
    //Before each test we empty the database
    Post.remove({}, (err) => {
      done();
    });
  });

  /*
   * Test the /GET route
   */
  describe("/GET post", () => {
    it("it should GET all the posts", (done) => {
      chai
        .request(app)
        .get("/api/posts")
        .end((err, res) => {
          res.should.have.status(200);

          expect(res.body.posts).to.be.an.instanceof(Array);

          res.body.should.be.a("object");

          // res.body.length.should.be.eql(0);

          done();
        });
    });
  });
});
