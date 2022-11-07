const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validation = require("../helpers/validation");

//Creating a new user
module.exports.signup_post = (req, res, next) => {
  let password = req.body.password.trim();
  if (password.length < 8) {
    return res.status(400).json({
      message: "Minimum password length is 8 characters"
    })
  }
  //password ecnryption with bcrypt
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        message: "password is required",
      });
    } else {
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
      });
      //save user created to database
      user
        .save()
        .then((result) => {
          res.status(201).json({
            message: "user created successfully",
          });
        })
        .catch((err) => {
          let errors = {username:'', email: ''};
          if(err.message.includes('User validation failed')){
            Object.values(err.errors).forEach(({properties}) => {
              errors[properties.path] = properties.message;
            })
          }
          res.status(400).json({
            errors
          });
        });
    }
  });
};

//getting a single user  
module.exports.get_usr = async (req, res) => {
  const username = req.params.username;
  const user = await User.findOne({ username }, { password: 0 }).exec();
  res.json({ user });
};

//Login controllers
// function to handle errors
const handleErrors = (err) => {
  let error = {};

  //incorrect email
  if (err.message === "incorrect email") {
    error = "that email is not registered";
  }

  //incorrect password
  if (err.message === "incorrect password") {
    error = "that password is incorrect";
  }
  return error;
};

//Validation and authentication
module.exports.login_post = async function (req, res) {
  const { email, password } = req.body;
  try {
    const user = await validation.auth(email, password);
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET_KEY, { expiresIn: '72h' });
    res.status(200).json({ message: "Login successful", token: "Bearer " + token });
  } catch (err) {
    const error = handleErrors(err);
    res.status(400).json({ error });
  }
};

// user requests for login page
module.exports.login_get = (req, res) => {
  res.json({ message: "login page" });
};
