const express = require("express");

const app = express();

app.use("/", (req, res) => {
  res.send("Hello form Server");
});

app.use("/test", (req, res) => {
  res.send("testing you");
});

app.listen(7777, () => {
  console.log("server running on 7777");
});
