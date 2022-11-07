const express = require("express");
const router = express.Router();
const userRoute = require("../controllers/user_controllers");

router.post("/auth/signup", userRoute.signup_post);

router.get("/:username", userRoute.get_usr);

// Getting the login page
router.get("/auth/login", userRoute.login_get);

//Sending the login information for verification
router.post("/auth/login", userRoute.login_post);

module.exports = router;