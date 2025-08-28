const validator = require("validator");

const validateSignupData = (req) => {
  //extract values from request body
  const { firstName, lastName, emailId, password } = req.body;
  //   console.log(emailId);
  if (!firstName || !lastName) {
    throw new Error("Name is Invalid..!!");
  }
  //handling this in schema level
  //   else if (firstName.length < 4 || firstName.length > 50) {
  //     throw new Error("firstName should be 4 to 50 characters!");
  //   }
  //emailId is alaos done in schema level
  else if (!validator.isEmail(emailId)) {
    throw new Error("Invalid EmailId");
  }
  //this too
  else if (!validator.isStrongPassword(password)) {
    throw new Error("Please Provide Strong Password");
  }
};

const validateProfileEditData = (req) => {
  const EDIT_FIELDS = [
    "about",
    "photoUrl",
    "gender",
    "firstName",
    "lastName",
    "age",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    EDIT_FIELDS.includes(field)
  );

  return isEditAllowed;
};

module.exports = { validateSignupData, validateProfileEditData };
