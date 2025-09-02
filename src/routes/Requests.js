const expires = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const requestRouter = expires.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res, next) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const ALLOWED_STATUS = ["interested", "ignored"];

      if (!ALLOWED_STATUS.includes(status)) {
        return res.status(400).json({
          message: "Invalid status type:  " + status,
        });
      }

      //check if the toUserId exists or not
      const toUser = await User.findById(toUserId);

      if (!toUser) {
        return res.status(404).send({ message: "User Not Found..!!" });
      }

      //check if there is an existing connection request
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      //if existing
      if (existingConnectionRequest) {
        return res
          .status(400)
          .send({ message: "connection request allready exists..!!" });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      const message =
        status === "interested"
          ? `${req.user.firstName} has shown interest in ${toUser.firstName}! `
          : `${req.user.firstName} has ignored ${toUser.firstName}!`;
      res.json({
        message: message,
        data,
      });
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);
module.exports = requestRouter;
