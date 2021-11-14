const express = require("express");
const router = express.Router();
const cors = require("./cors.route");
const uploadimage = require("./upload.route");


const checkAuth = require("../middlewares/checkAuth");
const checkAdmin = require("../middlewares/checkAdmin");
const {
  fetchCurrentUser,
  loginUser,
  registerUser, 
  verifyOTP,
  homeRoute,
  handleAdmin, 
  logout
} = require("../controllers/auth.controller");

const {updateUserProfile} = require('../controllers/user.controller');

router.get("/", cors.corsWithOptions, function(req, res, next){
});

router.post("/register", registerUser);

router.post("/login_with_phone", loginUser);

router.post("/verify", verifyOTP);

router.get("/me", checkAuth, fetchCurrentUser);

router.get("/admin", checkAuth, checkAdmin, handleAdmin);

router.post("/updateprofile", updateUserProfile);

router.get("/cart", shoppingCart);

router.post("/cart", editCart); 

router.get('/logout', cors.corsWithOptions, logout);

router.use("/uploadimage", uploadimage);


module.exports = router;
