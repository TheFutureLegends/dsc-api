# RMIT Developer Student Club Website API

## Package

**Encode and decode password**
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)

**For application to use body of request in POST - PUT method**
- [body-parser](https://www.npmjs.com/package/body-parser)

**To set cookie and get cookie from request**
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)

**To authorize specific IP**
- [cors](https://www.npmjs.com/package/cors)

**To define secure variable that will not available on public**
- [dotenv](https://www.npmjs.com/package/dotenv)

**Core package to use express**
- [express](https://www.npmjs.com/package/express)

**To validate input of body**
- [joi](https://www.npmjs.com/package/joi)

**To create and verify token from request header**
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

**To recognize and converting corresponding timezone of user**
- [moment-timezone](https://www.npmjs.com/package/moment-timezone)

**Core package to use MongoDB**
- [mongoose](https://www.npmjs.com/package/mongoose)

**To check - verify - upload image file to server**
- [multer](https://www.npmjs.com/package/multer)

**To get static path**
- [path](https://www.npmjs.com/package/path)

**Transform string to slug**
- [slugify](https://www.npmjs.com/package/slugify)

**Automatically generate slug from title when insert new data to MongoDB**
- [mongoose-slug-generator](https://www.npmjs.com/package/mongoose-slug-generator)

**To read file input**
- [fs](https://www.npmjs.com/package/fs)

**To read markdown from description of database if have any**
- [markdown-js](https://www.npmjs.com/package/markdown-js)

## Structure

Router -> Middleware -> Controller -> Service

### Router

Define which url to use and routing to corresponding controller

### Middleware

Checking and verify: token, roles and file input mime type if have

### Controller

**Controller with .frontend** does not require authentication token
**Controller with .backend** requires authentication token

Fetching data from router params if have any

Pass data to service to execute

### Service

Execute Create - Read - Update - Delete

Format data to return back to controller

**Return in service**
object that has status code and message
**_Read_ & _Edit_**: Include in the object that it will return (with key named data)

### Other folders

#### Containers

Get, Set and Convert data to desire type

#### Utilities

**Usage:** Converting and checking array or object
**Condition** Alway return only true or false

#### Validations

Validate from body inside controller before sending it to service

#### Models

Define Schema

#### Seeder

Seeding dummy data to database

#### Config

Configuration

## Api

### Authentication

| Api name           | Description | Input needed                  | Method |
| ------------------ | ----------- | ----------------------------- | ------ |
| `/api/auth/signin` | Login       | `email` `password`            | POST   |
| `/api/auth/signup` | Register    | `username` `email` `password` | POST   |

### [Users](https://rmit-dsc-api.herokuapp.com/api/users/admin)

| Api name               | Description                   | Return data                | Required logged in | Method |
| ---------------------- | ----------------------------- | -------------------------- | ------------------ | ------ |
| `/api/users/:username` | Get user                      | `username` `email` `posts` | x                  | GET    |
| `/api/users/profile`   | Get profile of logged in user | `username` `email` `roles` | **Yes**            | GET    |

### [Categories](https://rmit-dsc-api.herokuapp.com/api/categories)

| Api name                              | Description                               | Role needed | Method |
| ------------------------------------- | ----------------------------------------- | ----------- | ------ |
| `/api/categories`                     | Get all categories                        | x           | GET    |
| `/api/categories/:category_name`      | Get category based on name (slug format)  | x           | GET    |
| `/api/categories`                     | Create new category                       | **Admin**   | POST   |
| `/api/categories/edit/:category_id`   | Get specific category to prepare updating | **Admin**   | GET    |
| `/api/categories/update/:category_id` | Update existing category                  | **Admin**   | PATCH  |
| `/api/categories/delete/:category_id` | Delete existing category                  | **Admin**   | DELETE |

### [Post](https://rmit-dsc-api.herokuapp.com/api/posts)

| Api name                | Query                                                                                                                           | Params | Description                       | Role needed | Method |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------ | --------------------------------- | ----------- | ------ |
| `/api/posts`            | `latest` (default = false) `limit` ( defaul = 10 ), `page` ( defaul = 1 ) `column` (default = createdAt) `asc` (default = true) | x      | Get all posts with pagination     | x           | GET    |
| `/api/posts/top-author` | `limit` ( defaul = 5 )                                                                                                          | x      | Get top authors                   | x           | GET    |
| `/api/posts/:slug`      | x                                                                                                                               | `slug` | Get single post based on slug     | x           | GET    |
| `/api/posts`            | x                                                                                                                               | x      | Create new post                   | **Author**  | POST   |
| `/api/posts/read`       | x                                                                                                                               | x      | Display all posts that owned      | **Author**  | GET    |
| `/api/posts/edit/:id`   | x                                                                                                                               | `id`   | Show logged in user existing post | **Author**  | GET    |
| `/api/posts/update/:id` | x                                                                                                                               | `id`   | Update existing post              | **Author**  | PATCH  |
| `/api/posts/delete/:id` | x                                                                                                                               | `id`   | Delete existing post              | **Author**  | DELETE |

## Api Domain:

[`https://rmit-dsc-api.herokuapp.com`](https://rmit-dsc-api.herokuapp.com)

## Development

| Field   | Current | Future change                                                                         |
| ------- | ------- | ------------------------------------------------------------------------------------- |
| `image` | String  | `{data: Buffer, contentType: string, mimeType: 'image/jpg | image/png | image/jpeg'}` |
