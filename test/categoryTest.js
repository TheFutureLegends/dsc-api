import chai from "chai"
import chaiHttp from "chai-http"
import app from "../index.js"
import Category from "../src/models/category/category.model.js"

// Using Assertion from chai:
const should = chai.should()
const expect = chai.expect

// Create variable to store token:
let token


// Use http in chai
chai.use(chaiHttp)

// Fake category to test: Create, Read, Update then Delete
let fakeCategory = {
    "title":"Fake Category",
    "description":"This is the fake category to test"
}

describe('CRUD category', () => {
    // Sign in before test
    before((done) =>{
        let user = {
            email: "admin@admin.com",
            password: "123456789",
        }
        chai
            .request(app)
            .post("/api/auth/signin")
            .send(user)
            .end((error, response) => {
                response.should.have.status(200) // Means get successfully
                response.body.should.be.a("object")
                token = response.body.accessToken.token
                done()
            })
    })
    // TEST GET ALL
    it('should index ALL category on /api/categories', (done) => {
        chai.request(app)
            .get('/api/categories')
            .end((error, response) => {
                response.should.have.status(200)
                done()
            })
    })

    // TEST CREATE
    it('should create a SINGLE category on /api/categories/create', (done) => {
        chai.request(app)
            .post('/api/categories/create')
            .send(fakeCategory)
            .set("x-access-token", token)
            .end((error, response) => {
                response.should.have.status(201)
                done()
            })
    })

    // TEST UPDATE
    it('should update a SINGLE category on /api/categories/update/<id> PATCH', (done) => {
        let category = new Category(fakeCategory);
        category.save((error, data)  => {
            chai.request(app)
                .patch(`/api/categories/update/${data._id}?_method=PATCH`)
                .set("x-access-token", token)
                .send({"description": "Just test the PATCH request"})
                .end((error, response) => {
                    response.should.have.status(204)
                    done()
                });
        });
    });

    // TEST DELETE
    it('should delete a SINGLE category on /api/categories/delete/<id> DELETE', (done) => {
        let category = new Category(fakeCategory);
        category.save((error, data)  => {
            chai.request(app)
                .delete(`/api/categories/delete/${data._id}?_method=DELETE`)
                .set("x-access-token", token)
                .end((error, response) => {
                    response.should.have.status(204);
                    done()
                })
        })
    })
})