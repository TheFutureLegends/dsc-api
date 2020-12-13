import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

// Import model & seeder
import dbConfig from "./src/config/dbConfig.js";
import db from "./src/models/index.js";

import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import postRouter from "./routes/postRoutes.js";
import commentRouter from "./routes/commentRoutes.js";

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
  res.setHeader(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
}); // to use header

// Define route
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);

// app.use("/development", developmentRouter);

db.mongoose
  .connect(dbConfig(), {
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

export default app;
