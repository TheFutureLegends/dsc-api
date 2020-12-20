import chai from "chai"
import chaiHttp from "chai-http"
import app from "../index.js"
import Post from "../src/models/post/post.model.js"

// Using Assertion from chai:
const should = chai.should()
const expect = chai.expect

// Create variable to store token:
let token


// Use http in chai
chai.use(chaiHttp)

// Fake category to test: Create, Read, Update then Delete
let fakePost = {
    title: "Post for testing",
    description: "Post for testing",
    imageFile:
        "https://i.pinimg.com/originals/f8/b6/9e/f8b69e6156999b84137f3f0a23701b75.jpg",
    category:"web-development"
}

describe('CRUD post', () => {
    before((done) =>{
        let user = {
            email: "admin@admin.com",
            password: "123456789",
        };
        chai
            .request(app)
            .post("/api/auth/signin")
            .send(user)
            .end((error, response) => {
                response.should.have.status(200); // Means get successfully
                response.body.should.be.a("object");
                token = response.body.accessToken.token;
                done();
            });
    })
    // TEST GET ALL
    it('should index ALL post on / GET', (done) => {
        chai.request(app)
            .get('/api/posts')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    // TEST CREATE
    it('should create a SINGLE post on /api/posts/create', (done) => {
        chai.request(app)
            .post('/api/posts/create')
            .send(fakePost)
            .set("x-access-token", token)
            .end((error, response) => {
                response.should.have.status(201)
                done()
            })
    })

    // TEST UPDATE
    it('should update a SINGLE post on /api/posts/update/<id> PATCH', (done) => {
        let post = new Post(fakePost);
        post.save((error, data)  => {
            chai.request(app)
                .patch(`/api/posts/update/${data._id}?_method=PATCH`)
                .set("x-access-token", token)
                .send({"description": "Just test the PATCH request"})
                .end((error, response) => {
                    response.should.have.status(204)
                    done()
                })
        })
    })

    // TEST DELETE
    it('should delete a SINGLE post on /api/posts/delete/<id> DELETE', (done) => {
        let category = new Post(fakePost);
        category.save((error, data)  => {
            chai.request(app)
                .delete(`/api/posts/delete/${data._id}?_method=DELETE`)
                .set("x-access-token", token)
                .end((error, response) => {
                    response.should.have.status(204);
                    done()
                })
        })
    })
})