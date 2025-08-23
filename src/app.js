const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send({ firstName: "Akshay", lastName: "Kumar" });
});
//this will only handle only GET API call to  /user
app.get("/user", (req, res) => {
  console.log(req.query);
  res.send({ firstName: "Akshay", lastName: "Saini" });
});
app.get("/user/:userId/:role/:name", (req, res) => {
  console.log(req.params);
  res.send({ firstName: "Akshay" });
});

app.get("/user", (req, res) => {
  console.log(req.params);
});
app.post("/user", (req, res) => {
  //saving data to DB
  res.send("Data Saved Successfully");
});
app.delete("/user", (req, res) => {
  //deleteing data from DB
  res.send("Data Deleted Successfully");
});

//this will match all the HTTP method API calls to /test
app.use("/test", (req, res) => {
  res.send("testing you");
});

app.listen(7777, () => {
  console.log("server running on 7777");
});
