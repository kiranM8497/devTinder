const express = require("express");
const { userAuth } = require("../middlewares/auth");

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    console.log("logged in user is: " + user.firstName);

    res.status(200).send(user);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
});

module.exports = profileRouter;
