const express = require("express");
const userRouter = express.Router();
const cors = require("./cors.route");
const uploadimage = require("./upload.route");
const multer = require("multer");


const checkAuth = require("../middlewares/checkAuth");
const checkAdmin = require("../middlewares/checkAdmin");

const indexRouter = require("./index");
const authRoutes = require("./auth.route");
const productRouter = require("./product.route");
const orderRouter = require("./order.route");
const uploadRouter = require("./upload.route");
const cartRouter = require("./cart.route");
const wishlistRouter = require("./wishList.route");

const {updateUserProfile, fetchCurrentUser} = require('../controllers/user.controller');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads');
    },
    filename:   function(req, file, cb){
        cb(null, new Date().toISOString + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error("You can upload only image files!"), false);
    }
    callback(null, true);
}

const upload = multer({
    storage: storage, 
    limits: {
    fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

userRouter.get("/:userId", checkAuth, fetchCurrentUser);

userRouter.post("/:userId", checkAuth, upload.single('userImage'), updateUserProfile);

module.exports = userRouter;