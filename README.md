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

| Api name           | Description | Input needed                                     | Method |
| ------------------ | ----------- | ------------------------------------------------ | ------ |
| `/api/auth/signin` | Login       | `username` `password`                            | POST   |
| `/api/auth/signup` | Register    | `username` `email` `password` `confirm_password` | POST   |

### Users

| Api name               | Description                   | Return data        | Required logged in | Method |
| ---------------------- | ----------------------------- | ------------------ | ------------------ | ------ |
| `/api/users/:username` | Get user                      |                    | x                  | GET    |
| `/api/users/profile`   | Get profile of logged in user | `username` `email` | **Yes**            | GET    |

### Categories

| Api name                          | Description                        | Role needed   | Method |
| --------------------------------- | ---------------------------------- | ------------- | ------ |
| `/api/categories?limit=10&page=1` | Get all categories with pagination | x             | GET    |
| `/api/categories/:slug`    | Get category based on slug         | x             | GET    |
| `/api/categories`                 | Create new category                | **Moderator** | POST   |
| `/api/categories/update/:id`      | Update existing category           | **Moderator** | PUT    |
| `/api/categories/delete/:id`      | Delete existing category           | **Moderator** | DELETE |

### Post

| Api name                                               | Description                   | Role needed | Method |
| ------------------------------------------------------ | ----------------------------- | ----------- | ------ |
| `/api/posts?limit=10&page=1`                           | Get all posts with pagination | x           | GET    |
| `/api/posts/latest?sortBy=createdAt&limit=10&asc=true` | Get all latest post           | x           | GET    |
| `/api/posts/:slug`                                     | Get single post based on slug | x           | POST   |
| `/api/posts`                                           | Create new post               | **Author**  | POST   |
| `/api/posts/display`                                   | Display all posts that owned  | **Author**  | GET    |
| `/api/posts/show/:slug`                                | Show existing post            | **Author**  | GET    |
| `/api/posts/update/:id`                                | Update existing post          | **Author**  | PUT    |
| `/api/posts/delete/:id`                                | Delete existing post          | **Author**  | DELETE |

## Api Domain:

`https://rmit-dsc-api.herokuapp.com`
