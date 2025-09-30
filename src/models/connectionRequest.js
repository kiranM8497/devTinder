const mongoose = require("mongoose");

const connectonRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //refrence to the user collection
      required: true,
    },

    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  { timestamps: true }
);

connectonRequestSchema.index({ fromUserId: 1, toUserId: 1 });

connectonRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  //chcek if rom user id is same as touserid
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Cannot send the connection request to yourself!! ");
  }
  next();
});

const ConnectionRequestModel = mongoose.model(
  "ConnectionRequest",
  connectonRequestSchema
);

module.exports = ConnectionRequestModel;
