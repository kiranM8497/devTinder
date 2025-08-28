const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateProfileEditData } = require("../utils/validation");
const validator = require("validator");
const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    console.log("logged in user is: " + user.firstName);

    res.status(200).send(user);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const data = req.body;
    // check keys which are in req aree all values are allowed to update
    //if not return with  error saying uddate not allowed
    if (!validateProfileEditData(req)) {
      throw new Error("Invalid Edit Request");
    } else if (data?.skills.length > 10) {
      throw new Error("You can only allowed to add 10 skills!");
    } else if (data?.about.length < 10 || data?.about.length > 100) {
      throw new Error("aabout info should be between 10 to 1000 characters");
    } else if (data.photoUrl && !validator.isURL(data?.photoUrl)) {
      throw new Error("Please Check the URL provided!");
    } else if (
      data?.gender &&
      !["male", "female", "others"].includes(data?.gender)
    ) {
      throw new Error("Invalid Gender data!!");
    }
    //user is attecjed in auth middleware
    const loggedinUser = req.user;
    // we are mutating the loggedinUser
    Object.keys(data).forEach((key) => (loggedinUser[key] = data[key]));
    console.log(loggedinUser);

    await loggedinUser.save();

    //make a patch db call update the user
    res.json({
      message: `${loggedinUser.firstName},your profile was updated successfully..!!`,
      data: loggedinUser,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = profileRouter;
