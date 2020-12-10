process.env.NODE_ENV = "test";

import mongoose from "mongoose";
import chai from "chai";
import chaiHttp from "chai-http";

import db from "../src/models/index.js";

import app from "../index.js";

const Category = db.category;

let should = chai.should();

let expect = chai.expect;

chai.use(chaiHttp);

describe("Post", () => {
  beforeEach((done) => {
    //Before each test we empty the database
    Category.remove({}, (err) => {
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

  /*
   * Test the /GET route
   */
  describe("/POST category", () => {
    it("it should POST new category", (done) => {
      let category = {
        title: "New category title 1",
        description: "New category description 1",
      };
      chai
        .request(app)
        .post("/api/categories/create")
        .send(category)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  afterEach((done) => {
    //Before each test we empty the database
    Category.remove({}, (err) => {
      done();
    });
  });
});
