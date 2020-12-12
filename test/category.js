process.env.NODE_ENV = "test";
import chai from "chai";
import chaiHttp from "chai-http";
import db from "../src/models/index.js";
import app from "../index.js";

let should = chai.should();
let expect = chai.expect;
let token;

const Category = db.category;

chai.use(chaiHttp);

describe("Let's run unit test for CRUD Categories !!", () => {

    //Before each test we empty the database
    beforeEach((done) => {
    Category.remove({}, (err) => {
      done();
    });

    let user = {
      email: "admin@admin.com",
      password: "123456789",
    };

    chai
      .request(app)
      .post("/api/auth/signin")
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);

        res.body.should.be.a("object");

        token = res.body.accessToken.token;
      });
    });

    //after each test we empty the database
    afterEach((done) => {
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
    it("it should create (POST) new category", (done) => {
      let category = {
        title: "New category title 1",
        description: "New category description 1",
      };
      chai
        .request(app)
        .post("/api/categories/create")
        .set("x-access-token", token)
        .send(category)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
    });
});
