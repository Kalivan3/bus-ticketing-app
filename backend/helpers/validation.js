const User = require("../models/user"); //import user model
const bcrypt = require("bcrypt");

//creating a validation function
module.exports.auth = async function (email, password) {
  const user = await User.findOne({
    email,
  });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    } // if the password matches
    throw Error("incorrect password"); // if the password doesn't match
  }
  throw Error("incorrect email"); // if the email is not registered
};
