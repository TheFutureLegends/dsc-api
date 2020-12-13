import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index.js";
import faker from "faker"; // to generate random value


let should = chai.should();
let expect = chai.expect;
let token;

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
            done()
      });
    });

    /*
    * Test the /GET route
    */

    describe("As a normal user, I want to see my profile," +
        "so that I can make sure I type in the right information.",() => {

        it("it should show (GET) a user profile", (done) => {
            chai
                .request(app)
                .get("/api/users/profile")
                .set("x-access-token", token)
                .end((err, res) => {
                    res.should.have.status(200);
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
        // Test case: register with enough requirements: username, email is a string without special letter
        it("it should create (POST) a new user", (done) => {
            let mockUser = {
                username: faker.name.firstName(), // to generate the random string without special letter
                email: faker.internet.email(), // to generate the random email format: example@example.com without special letter
                password: "testpassword"
            };
            chai
                .request(app)
                .post("/api/auth/signup")
                .send(mockUser)
                .end((err, res) => {
                    res.should.have.status(201) // Means added successfully
                    res.body.should.be.a("object")
                    done()
                })
        })
    })
});
