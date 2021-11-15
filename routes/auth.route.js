const express = require("express");
const router = express.Router();
const cors = require("./cors.route");
const uploadimage = require("./upload.route");


const checkAuth = require("../middlewares/checkAuth");
const checkAdmin = require("../middlewares/checkAdmin");
const {
  loginWithPhoneOtp,
  createNewUser, 
  verifyPhoneOTP,
  handleAdmin, 
  logout
} = require("../controllers/auth.controller");


router.get("/", cors.corsWithOptions, function(req, res, next){
});


//router.post("/verify_registration", verifyRegistration);

router.post("/register", createNewUser);


router.post("/login_with_phone", loginWithPhoneOtp);

router.post("/verify", verifyPhoneOTP);

router.get("/admin", checkAuth, checkAdmin, handleAdmin);

router.get('/logout', cors.corsWithOptions, logout);


module.exports = router;
