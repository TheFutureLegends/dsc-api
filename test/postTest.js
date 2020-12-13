import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index.js";

let should = chai.should();
let expect = chai.expect;
let token

chai.use(chaiHttp);

describe("Let's run the unit test for CRUD Post feature", () => {
    //Before each test we empty the database
   beforeEach((done) => {
        let user = { // create a fake object to inject into database
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
            });
        done()
    });

    /*
    * Test the /GET route
    */
    describe("As a registered user," +
        "I want to view study-guides," +
        "so that I can find the quickest way to learn what I want.", () => {
        // Test case: get all the posts
        it("it should show (GET) all the posts", (done) => {
              chai
                .request(app)
                .get("/api/posts")
                .end((err, res) => {
                  res.should.have.status(200); // Means get successfully
                  expect(res.body.posts).to.be.an.instanceof(Array);
                  res.body.should.be.a("object");
                  done();
                });
            });
        });

    /*
    * Test the /POST route with title and description
    */
    describe("As an admin user, " +
        "I want to share a study guide," +
        "so that I can share my knowledge.", () => {
        // Test case: create a new post without missing any element
        it("it should create (POST) new post", (done) => {
            let post = {
              title: "New post title 1",
              description: "New post description 1",
              imageFile:
                    "https://i.pinimg.com/originals/f8/b6/9e/f8b69e6156999b84137f3f0a23701b75.jpg",
              category:"web-deverlopment"
            };
            chai
                .request(app)
                .post("/api/posts/create")
                .set('x-access-token', token)
                .send(post)
                .end((err, res) => {
                    res.should.have.status(200); // Means get successfully
                    res.body.should.be.a("object");
                });
            done();

        });
    })

    /*
    * Test the /PATCH route with title and description
    */
    describe("As an admin user, " +
        "I want to update my study guide, " +
        "so that I can share the most updated resources with my clubmate.", () => {
        // Test case: edit a post existed in database
        it("it should edit (PATCH) an existing post", (done) => {
            let test_id = "5fd5ff9a49be26300febf862"
            let post = {
                title: "Edited title 1",
                description: "Edited description 1",
                author: "Tester"
            };
            chai
                .request(app)
                .patch("/api/posts/update/" + test_id)
                .set('x-access-token', token)
                .send(post)
                .end((err, res) => {
                    res.should.have.status(200); // Means get successfully
                    res.body.should.be.a("object");
                });
            done();
        });
    });
});
