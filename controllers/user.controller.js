const User = require("../models/user.model");
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const mongoose = require("mongoose");

const { PORT, MONGODB_URI, NODE_ENV,ORIGIN } = require("../config");
const multer = require('multer');
const uploadRouter = require("../routes/upload.route")

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

// --------------- fetch current user -------------------------

exports.fetchCurrentUser = async (req, res, next) => {
  const id = req.body.userId;
  User.findById(id)
    .select('name address email phone userImage')
    .exec()
    .then(doc => {
      console.log("From database", doc)
      if (doc) {
        res.status(200).json({
            data: doc,
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

// --------------- update user profile -------------------------

exports.updateUserProfile =  async (req, res, next) => {
  
    const userId = req.body.userId; 
    const new_name = req.body.name;
    const new_img = req.file.path;
    const email = req.body.email;
      
    await User.findOneAndUpdate({_id: userId}, {$set: {
      name: new_name,
      userImage: new_img,
      email: email
        }
      }).exec()
      .then(result => {
        res.status(200).json({
            message: 'User updated',
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
    user.save();
  };
  
/////////////////////////////// Add Address /////////////////////////////////

exports.addaddress = async (req, res, next) => {
  try{
    const userId = req.body.userId;
  const recname = req.body.recname;
  const recphone = req.body.recphone;
  const pincode = req.body.pincode;
  const addLine1 = req.body.addLine1;
  const addLine2 = req.body.addLine2;
  const landmark = req.body.landmark;

  const address = [{
    recname: recname,
    recphone: recphone,
    pincode: pincode,
    addLine1: addLine1,
    addLine2: addLine2,
    landmark: landmark
  }]

  const user = await User.findOne({userId});

  user.address.push({ recname, recphone, pincode, addLine1, addLine2, landmark})

  res.status(200).json({
      message: 'Address updated',
  });

  user.save();
  }
  catch(err) {
  console.log(err);
  res.status(500).json({
    error: err
  });
};

};


//////////////////////Update Address///////////////////////////

exports.updateAddress =  async (req, res, next) => {
    
  try{
    const userId = req.body.userId;
    const addressId = req.body.addressId;
    const recname = req.body.recname;
    const recphone = req.body.recphone;
    const pincode = req.body.pincode;
    const addLine1 = req.body.addLine1;
    const addLine2 = req.body.addLine2;
    const landmark = req.body.landmark;

  const address = [{
    recname: recname,
    recphone: recphone,
    pincode: pincode,
    addLine1: addLine1,
    addLine2: addLine2,
    landmark: landmark
  }]

  const user = await User.findByIdAndUpdate({_id: userId, address: {_id: addressId} }, {$set: {address: address} })
  
        res.status(200).json({
            message: 'User updated'
        });


  user.save();

  }catch(err){
    console.log(err);
    res.status(500).json({
      message: "Some error occured."
    });    
  }
}