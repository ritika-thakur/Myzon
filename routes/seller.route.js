const User = require("../models/user.model");
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const mongoose = require("mongoose");

const { PORT, MONGODB_URI, NODE_ENV,ORIGIN } = require("../config");
const multer = require('multer');
const uploadRouter = require("../routes/upload.route")

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
          console.log(file.originalname);
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

