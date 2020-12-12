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

describe("Let's run unit test for CRUD Categories feature !!", () => {

    //Before each test we empty the database
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
            res.should.have.status(200);

            res.body.should.be.a("object");

            token = res.body.accessToken.token;
      });
        done()
    });

    /*
    * Test the /GET route
    */
    describe("/GET category", () => {
    it("it should show (GET) all the categories", (done) => {
          chai
            .request(app)
            .get("/api/categories")
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");

              // res.body.length.should.be.eql(0);

              done();
            });
        });
    });
    describe("/GET categories by name", () => {
        it("it should show (GET) posts with the given name", (done) => {
            const mockCategory = 'Mock'
            chai
                .request(app)
                .get("/api/categories/" + mockCategory)
                .end((err, res) => {
                    res.should.have.status(200);

                    expect(res.body.categories).to.be.an.instanceof(Array);

                    res.body.should.be.a("object");

                    done();
                });
        });
    });
    /*
    * Test the /POST route
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
            .set('x-access-token', token)
            .send(category)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");
              done();
            });
        });
    });
});
