const express = require("express");
const { userAuth } = require("./middlewares/auth");
const { connectDb } = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/Requests");
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

connectDb()
  .then(() => {
    console.log("database connection successfull");
    app.listen(7777, () => {
      console.log("server running on 7777");
    });
  })
  .catch((err) => console.log("databse connection failed"));
