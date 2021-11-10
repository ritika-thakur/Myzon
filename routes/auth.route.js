const express = require("express");
const router = express.Router();


const checkAuth = require("../middlewares/checkAuth");
const checkAdmin = require("../middlewares/checkAdmin");
const {
  fetchCurrentUser,
  loginUser,
  registerUser, 
  verifyOTP,
  updateUserProfile,
  handleAdmin
} = require("../controllers/auth.controller");


router.post("/register", registerUser);

router.post("/login_with_phone", loginUser);


router.post("/verify", verifyOTP);

router.get("/me", checkAuth, fetchCurrentUser);

router.get("/admin", checkAuth, checkAdmin, handleAdmin);

router.post("/updateprofile", upload.single('image'), updateUserProfile);

router.get("/cart", shoppingCart);

router.post("/cart", )

module.exports = router;
