import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

// Import model & seeder
import db from "./src/models/index.js";

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import commentRouter from "./routes/comment.routes.js";

// import developmentRouter from "./routes/development.routes.js";

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

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
  return;
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);

// app.use("/development", developmentRouter);

// Define MongoDB URI
// const DB_URI =
//   process.env.NODE_DB == "development"
//     ? `${process.env.LOCAL_DB_URI}`
//     : `${process.env.PRODUCTION_DB_URI}`;

const DB_URI = `${process.env.PRODUCTION_DB_URI}`;

db.mongoose
  .connect(`${DB_URI}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// PORT define
const PORT = process.env.PORT || process.env.APP_PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

/**
 * Register - login
 * Homepage (display post)
 * Chatbot (can interact with it)
 */
