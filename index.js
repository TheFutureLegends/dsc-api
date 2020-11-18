import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import markdown from "markdown-js";

// Import model & seeder
import db from "./src/models/index.js";

// Router path
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import categoryRouter from "./routes/category.routes.js";
import postRouter from "./routes/post.routes.js";
import eventRouter from "./routes/event.routes.js";
// import forumRouter from "./routes/forum.routes.js";
import commentRouter from "./routes/comment.routes.js";

// Development purpose only
import developmentRouter from "./routes/development.routes.js";

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

// Router define
app.get("/", (req, res) => {
  var str = fs.readFileSync("README.md", "utf8");

  var result = markdown.makeHtml(str);

  return res.status(200).send(result);
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/posts", postRouter);
app.use("/api/events", eventRouter);
// app.use("/api/forum", forumRouter);
app.use("/api/comments", commentRouter);

// Development only
app.use("/development", developmentRouter);

// Define MongoDB URI
const DB_URI =
  process.env.NODE_DB == "local"
    ? `${process.env.DB_URI}`
    : `${process.env.DB_PREFIX}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

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
