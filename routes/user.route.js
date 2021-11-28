const express = require("express");
const userRouter = express.Router();
const cors = require("./cors.route");
const multer = require("multer");
const mongoose = require("mongoose");

const checkAuth = require("../middlewares/checkAuth");
const checkAdmin = require("../middlewares/checkAdmin");

const authRoutes = require("./auth.route");
const cartRouter = require("./cart.route");
const wishlistRouter = require("./wishList.route");

const {updateUserProfile, fetchCurrentUser, addaddress, updateAddress} = require('../controllers/user.controller');

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
  charactersLength));
   }
   return result;
  }


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads');
    },
    filename:   function(req, file, cb){
        cb(null, makeid(12) + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error("You can upload only image files!"), false);
    }
    cb(null, true);
}

const upload = multer({
    storage: storage, 
    limits: {
    fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

userRouter.post("/", fetchCurrentUser);

userRouter.post("/update",  upload.single('userImage'), updateUserProfile);

userRouter.post("/addaddress", addaddress);

userRouter.put('/updateaddress', updateAddress);

module.exports = userRouter;