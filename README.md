# RMIT Developer Student Club Website API

## Package

- bcryptjs
- body-parser
- cookie-parser
- cors
- dotenv
- express
- joi
- jsonwebtoken
- moment-timezone
- mongoose
- multer
- path
- slugify

## Api
| Api name | Description | Role needed |
| -------- | ----------- | ----------- |
| `/api/posts?limit=10&page=1` | Get all posts with pagination | x |

1. Get all posts with pagination
`/api/posts?limit=10&page=1`
2. Get all latest post
`/api/posts/latest?sortBy=createdAt&limit=10&asc=true`
3. Create new post

## Live Domain:

`https://rmit-dsc-api.herokuapp.com`
