const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();
//if wrriten anywhere bur last it will not work
// app.use("/", (err, req, res, next) => {
//   if (err) {
//     res.status(500).send("Something went wrong!!");
//   }
// });
app.get("/user/getAllData", (req, res, next) => {
  throw new Error("xyz");
});

//error handling middleware shuold always be last
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong!!");
  }
});
app.listen(7777, () => {
  console.log("server running on 7777");
});
