const express = require("express");
const bcrypt = require("bcrypt");
const authRouter = express.Router();
const User = require("../models/user");
const { validateSignupData } = require("../utils/validation");
authRouter.post("/signup", async (req, res) => {
  try {
    //validate the data(via helper functions)
    validateSignupData(req);
    //encrypt the password
    const { firstName, lastName, password, emailId } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    //console.log(passwordHash); //$2b$10$.GO1mRBpHDfibeKYelepzeC5YaERmWuc1WnOPSSzhfsCbIxAGyTaq
    const data = req.body;

    if (data?.skills.length > 10) {
      throw new Error(
        "some of the things you are trying to update are not allowed!!"
      );
    }
    //creating a new instance of a user model
    const user = new User({
      firstName,
      lastName,
      password: passwordHash,
      emailId,
    });

    await user.save();
    res.send("User added Successfully");
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    //extract the values

    const { emailId, password } = req.body;
    // if (!validator.isEmail(emailId)) {
    //   throw new Error("invalid emailId");
    // }

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid email or password");
    }
    const isPasswordValid = user.verifyPassword(password);
    if (!isPasswordValid) {
      res.status(401).send("Invalid email or password");
    } else {
      //get JWT token from helper function form  user schema
      const token = await user.getJWT();
      //add the token  to cookie  and send  the resposne bak to the user
      res.cookie("access_token", token, {
        expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 8 hours
      });
      res.send(user);
    }
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  //just  delete the cookie
  console.log(req.token);
  res.cookie("access_token", null, {
    expires: new Date(Date.now()),
  });

  res.send("logged out successfully");
});
module.exports = authRouter;
