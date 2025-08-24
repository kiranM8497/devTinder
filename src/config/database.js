const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://Potato:viratkohli18@cluster0.psfzwfx.mongodb.net/devTinder"
  );
};

module.exports = {
  connectDb,
};
