process.env.NODE_ENV = "test";
import chai from "chai";
import chaiHttp from "chai-http";
import db from "../src/models/index.js";
import app from "../index.js";

let should = chai.should();
let expect = chai.expect;
let token;

const User = db.category;

chai.use(chaiHttp);

describe("Let's run unit test for CRUD Users feature !!", () => {

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

    describe("As a normal user, I want to see my profile," +
        "so that I can make sure I type in the right information.",() => {

        it("it should show (GET) a user with the given id", (done) => {
            const mockUserId = '100abcxyz'
            chai
                .request(app)
                .get("/api/categories/" + mockUserId)
                .end((err, res) => {
                    res.should.have.status(200);

                    expect(res.body.users).to.be.an.instanceof(Array);

                    res.body.should.be.a("object");

                    done();
                });
        });
    });
    /*
    * Test the /POST route
    */
    describe("As an unregistered user," +
        " I want to register, " +
        "so that I can use the study-guide.", () => {
        it("it should create (POST) a new user", (done) => {
            let mockUser = {
                username: "Tester5",
                email: "tester5@tester.com",
                password: "testpassword"
            };
            chai
                .request(app)
                .post("/api/auth/signup")
                .send(mockUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        })
    })
});
