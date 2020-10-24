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

### Authentication
| Api name | Description | Input needed | Method |
| -------- | ----------- | ----------- | ------ |
| `/api/auth/signin` | Login | `username` `password` | POST |
| `/api/auth/signup` | Register | `username` `email` `password` | POST |

### Post
| Api name | Description | Role needed | Method |
| -------- | ----------- | ----------- | ------ |
| `/api/posts?limit=10&page=1` | Get all posts with pagination | x | GET |
| `/api/posts/latest?sortBy=createdAt&limit=10&asc=true` | Get all latest post | x | GET |
| `/api/posts` | Create new post | **Author** | POST |
| `/api/posts/:id` | Update existing post | **Author** | PUT |
| `/api/posts/:id` | Delete existing post | **Author** | DELETE |

## Api Domain:

`https://rmit-dsc-api.herokuapp.com`
