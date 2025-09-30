const express = require("express");
const { userAuth } = require("./middlewares/auth");
const { connectDb } = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/Requests");
const userRouter = require("./routes/user");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  const start = Date.now();
  console.log(start);
  res.on("finish", () => {
    console.log(`${req.method} ${req.url} took ${Date.now() - start}ms`);
  });
  next();
});
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

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
