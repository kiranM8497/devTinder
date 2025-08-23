const express = require("express");

const app = express();

app.use(
  "/user",
  [
    (req, res, next) => {
      console.log("executed first handler");

      next();
      // res.send("Respose from handler 1");
    },
    (req, res, next) => {
      console.log("executed second handler");
      // res.send("Respose from handler 2");
      next();
    },
    (req, res, next) => {
      console.log("executed third handler");
      // res.send("Respose from handler 3");
      next();
    },
    (req, res, next) => {
      console.log("executed fourth handler");
      //   res.send("Respose from handler 4");
      next();
    },
  ],
  (req, res, next) => {
    console.log("executed fifth handler");
    res.send("Respose from handler 5");
    // next();
  }
);

app.listen(7777, () => {
  console.log("server running on 7777");
});
