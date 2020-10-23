import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

// Import model
import db from "./src/models/index.js";

// Router path
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";

// Development purpose only
import moment from "moment-timezone";
import multer from "multer";
import slugify from "slugify";
import middleware from "./src/middleware/index.js";

if (process.env.NODE_ENV != "production") {
  dotenv.config();
}

const app = express();

app.use(
  cors({
    origin: true,
  })
);

app.use("/static", express.static("public")); //to access the files in public folder
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
  return;
});

// Router define
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

app.get("/timezone", (req, res) => {
  const timezone = moment()
    .tz("Asia/Ho_Chi_Minh")
    .format("MM-DD-YYYY-HH:mm:ss");

  return res.status(200).send(timezone);
});

app.post("/upload", middleware.fileUpload.single("postImage"), (req, res) => {
  return res.status(200).send("File uploaded!");
});

// Import Role model
// to populate initial Role
const Role = db.role;

// Define MongoDB URI
const DB_URI =
  process.env.NODE_DB == "local"
    ? `${process.env.DB_URI}`
    : `${process.env.DB_PREFIX}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

db.mongoose
  .connect(`${DB_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      db.ROLES.forEach((role) => {
        new Role({
          name: role,
        }).save((err) => {
          if (err) {
            console.log("error", err);
          }
          console.log(`added ${role} to roles collection`);
        });
      });
    }
  });
}

// PORT define
const PORT = process.env.PORT || process.env.APP_PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
