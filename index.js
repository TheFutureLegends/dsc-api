import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

// MongoDB config
import dbConfig from "./src/config/db.config.js";
import db from "./src/models/index.js";

// Router config
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";

const app = express();

app.use(
  cors({
    origin: true,
  })
);

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

// Connect to MongoDB Atlas
const Role = db.role;

// Define MongoDB Atlas variables
const prefix = process.env.PREFIX || dbConfig.PREFIX;

const username = process.env.USERNAME || dbConfig.USERNAME;

const password = process.env.PASSWORD || dbConfig.PASSWORD;

const host = process.env.HOST || dbConfig.HOST;

const database = process.env.DB || dbConfig.DB;

db.mongoose
  .connect(
    `${prefix}://${username}:${password}@${host}/${database}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
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
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
