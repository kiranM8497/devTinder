const expires = require("express");
const { userAuth } = require("../middlewares/auth");

const requestRouter = expires.Router();

requestRouter.post("/sendConnectionRequest", userAuth, (req, res, next) => {
  const user = req.user;
  //sending connection request

  res.send(user.firstName + " sent request  connection ");
});
module.exports = requestRouter;
