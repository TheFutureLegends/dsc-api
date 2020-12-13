import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index.js";

let should = chai.should();
let expect = chai.expect;
let token;

chai.use(chaiHttp);

describe("Let's run unit test for CRUD Categories feature !!", () => {
  //Before each test we have to sign in (authentication) to get token
  beforeEach((done) => {
    let user = {
      email: "admin@admin.com",
      password: "123456789",
    };
    chai
      .request(app)
      .post("/api/auth/signin")
      .send(user)
      .end((err, res) => {
        res.should.have.status(200); // Means get successfully
        res.body.should.be.a("object");
        token = res.body.accessToken.token;
        done();
      });
  });

  /*
   * Test the /GET route
   */
  describe("/GET category", () => {
      // Test case: get all the categories
    it("it should show (GET) all the categories", (done) => {
      chai
        .request(app)
        .get("/api/categories")
        .end((err, res) => {
          res.should.have.status(200); // Means get successfully
          res.body.should.be.a("object");

          // res.body.length.should.be.eql(0);

          done();
        });
    });
  });
  describe("/GET categories by name", () => {
      // Test case: get the category by the existed name
    it("it should show (GET) categories with the given name", (done) => {
      const mockCategory = "Mobile Development";
      chai
        .request(app)
        .get("/api/categories/" + mockCategory)
        .end((err, res) => {
          res.should.have.status(200); // means update successfully

          res.body.should.be.a("object");

          done();
        });
    });
  });
  /*
   * Test the /POST route
   */
  describe("/POST category", () => {
      // Test case: create a new category with title and description are strings
    it("it should create (POST) new category", (done) => {
      let category = {
        title: "New category title 2",
        description: "New category description 2",
      };
      chai
        .request(app)
        .post("/api/categories/create")
        .set("x-access-token", token)
        .send(category)
        .end((err, res) => {
          res.should.have.status(201); // means added successfully
          res.body.should.be.a("object");
          done();
        });
    });
  });
    /*
     * Test the /PATCH route
     */
    describe("As an admin user, " +
        "I want to update category name," +
        " so that user can recognize the new category easily", () => {
        // Test case: update a category which is existed in the database
        it("it should edit (PATCH) new category", (done) => {
            let testId = "5fd636b137f3701556749c86"
            let category = { // create a fake object to inject into the database
                title: "Edited title",
                description: "Edited title",
            };
            chai
                .request(app)
                .patch("/api/categories/update/" + testId)
                .set("x-access-token", token)
                .send(category)
                .end((err, res) => {
                    res.should.have.status(204); // means update successfully
                    res.body.should.be.a("object");
                    done();
                });
        });
    });
});
