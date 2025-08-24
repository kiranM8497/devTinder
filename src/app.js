const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");
const { connectDb } = require("./config/database");
const User = require("./models/user");
const app = express();
app.use(express.json());
app.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const data = req.body;
    //creatign a new instacne of a user model
    const user = new User(data);

    await user.save();
    res.send("User added Successfully");
  } catch (error) {
    console.log(error);
  }
});

app.get("/user", async (req, res) => {
  try {
    const { emailId } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      res.status(404).send("User Not Found");
    } else {
      res.send(user);
    }
    // const users = await User.find({ emailId: emailId });

    // if (users.length === 0) {
    //   res.status(404).send("User Not Found");
    // }
    // res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
});

//delete a user from DB
app.delete("/user", async (req, res) => {
  try {
    const { id } = req.body;

    const result = await User.findByIdAndDelete(id);
    // const result = await User.findByIdAndDelete({ _id: id });
    // const result = await User.deleteOne({ _id: id });
    // User.deleteOne({ _id: id }).exec();

    // console.log(result);
    res.send("user deleted successfully!!");
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
});

app.patch("/user", async (req, res) => {
  try {
    const { id, emailId } = req.body;

    const result = await User.findByIdAndUpdate(id, {
      $set: { emailId: emailId },
    });
    // const result = await User.findByIdAndDelete({ _id: id });
    // const result = await User.deleteOne({ _id: id });
    // User.deleteOne({ _id: id }).exec();

    // console.log(result);
    res.send("user updated successfully!!");
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
});
//get all the users from DB
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
});
connectDb()
  .then(() => {
    console.log("database connection successfull");
    app.listen(7777, () => {
      console.log("server running on 7777");
    });
  })
  .catch((err) => console.log("databse connection failed"));
