const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");
const { connectDb } = require("./config/database");
const User = require("./models/user");

const validator = require("validator");
const validateSignupData = require("./utils/validation");
const bcrypt = require("bcrypt");
const app = express();
app.use(express.json());
app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
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
    const isPasswordValid = bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).send("Invalid email or password");
    }
    res.send("User Login Successfull..!");
  } catch (error) {
    console.log(error);
    res.send(error.message);
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

app.patch("/user/:id", async (req, res) => {
  try {
    const id = req.params?.id;
    console.log(req.body);
    const data = req.body;
    const ALLOWED_UPDATES = ["about", "gender", "photoUrl", "age", "skills"];

    const isUpdateAllowed = Object.keys(data).every((key) =>
      ALLOWED_UPDATES.includes(key)
    );
    if (!isUpdateAllowed) {
      throw new Error(
        "some of the things you are trying to update are not allowed!!"
      );
    }

    if (data.skills.length > 10) {
      throw new Error("maximum 10 skills are allowed");
    }
    const result = await User.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true,
    });
    // const result = await User.findByIdAndDelete({ _id: id });
    // const result = await User.deleteOne({ _id: id });
    // User.deleteOne({ _id: id }).exec();

    // console.log(result);
    res.send("user updated successfully!!");
  } catch (error) {
    console.log(error);
    res.send("UPDATE FAILED: " + error.message);
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
