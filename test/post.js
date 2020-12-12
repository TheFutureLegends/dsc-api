process.env.NODE_ENV = "test";

import mongoose from "mongoose";
import chai from "chai";
import chaiHttp from "chai-http";
import db from "../src/models/index.js";
import app from "../index.js";

let should = chai.should();
let expect = chai.expect;
let token

const Post = db.post;

chai.use(chaiHttp);

describe("Let's run the unit test for CRUD Post feature", () => {
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
    describe("As a registered user," +
        "I want to view study-guides," +
        "so that I can find the quickest way to learn what I want.", () => {
        it("it should show (GET) all the posts", (done) => {
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
    * Test the /POST route with title and description
    */
    describe("As an admin user, " +
        "I want to share a study guide," +
        "so that I can share my knowledge.", () => {
        it("it should create (POST) new post", (done) => {
            let post = {
                title: "New post title 1",
                description: "New post description 1"
            };
            chai
                .request(app)
                .post("/api/posts/create")
                .set('x-access-token', token)
                .send(post)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });
    })

    /*
    * Test the /PATCH route with title and description
    */
    describe("As an admin user, " +
        "I want to update my study guide, " +
        "so that I can share the most updated resources with my clubmate.", () => {
        it("it should edit (PATCH) an existing post", (done) => {
            let test_id = "111aaa"
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
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });
    });
});
