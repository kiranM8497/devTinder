const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 10,
    },
    lastName: {
      type: String,
      minLength: 3,
      maxLength: 12,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        console.log(validator.isEmail(value));
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email Address!!");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("please provide a strong password!!");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("invalid gender type!!");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/thumbnails/035/857/753/small/people-face-avatar-icon-cartoon-character-png.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("URL provided is invalid!!");
        }
      },
    },
    about: {
      type: String,
      default: "Haven't decided what to write here😋",
      minLength: 10,
      maxLength: 100,
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
