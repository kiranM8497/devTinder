const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();
// -- with app.use() it matches with all req starting with prefix provided
//-- Doesn’t care about exact path — /test will also match /test/abc

// app.use("/admin", adminAuth);

//  #######

// with app.all() it will match exactly provided path (no prefix matching)
//test → matched (for any method: GET, POST, DELETE, etc.)
//test/123 → not matched
//testing → not matched
// app.all("/admin", adminAuth);

app.get("/user", userAuth, (req, res, next) => {
  res.send("User Data");
});
app.post("/user/login", (req, res, next) => {
  res.send("logged in");
});

app.get("/admin/getAllData", (req, res, next) => {
  res.send("sending all Data");
});
app.delete("/admin/deleteUserData", (req, res, next) => {
  res.send("deleted user");
});

app.listen(7777, () => {
  console.log("server running on 7777");
});
