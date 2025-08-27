const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
  try {
    //Read the Token  from request cookies
    const cookies = req.cookies;
    const { access_token } = cookies;
    if (!access_token) {
      throw new Error("Invalid Token");
    }
    //validate token
    const decoded = jwt.verify(access_token, "DEV@KIRAN$$", {
      expiresIn: "1h",
    });
    const { _id } = decoded;
    //find the user
    const user = await User.findById(_id);

    if (!user) {
      throw new Error("Authentication failed");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("Bad Request " + error.message);
  }
};

module.exports = {
  userAuth,
};
