const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");
const { connectDb } = require("./config/database");
const User = require("./models/user");
const app = express();

app.post("/signup", async (req, res) => {
  console.log(User);
  //creatign a new instacne of a user model
  const user = new User({
    firstName: "Virat",
    lastName: "Kohli",
    emailId: "king@google.com",
    password: "king@123",
  });

  await user.save();
  res.send("User added Successfully");
});
connectDb()
  .then(() => {
    console.log("database connection successfull");
    app.listen(7777, () => {
      console.log("server running on 7777");
    });
  })
  .catch((err) => console.log("databse connection failed"));
