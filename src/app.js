const express = require("express");
const { userAuth } = require("./middlewares/auth");
const { connectDb } = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const cors = require("cors");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/Requests");
const userRouter = require("./routes/user");
const aiErrorRouter = require("./routes/ai");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use(cookieParser());
app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    console.log(`${req.method} ${req.url} took ${Date.now() - start}ms`);
  });
  next();
});
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", aiErrorRouter);

connectDb()
  .then(() => {
    console.log("database connection successfull");
    app.listen(7777, () => {
      console.log("server running on 7777");
      // setInterval(() => {
      //   const memory = process.memoryUsage();
      //   console.log(`Heap used: ${memory.heapUsed / 1024 / 1024} MB`);
      // }, 10000);
    });
  })
  .catch((err) => console.log("databse connection failed"));
