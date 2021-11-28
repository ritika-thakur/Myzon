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
    const new_img = req.file;
    const email = req.body.email;

    let updates = {
      name: new_name,
      email: email
    }; 

    if (new_img != null){
       updates = {
        name: new_name,
        userImage: new_img.path,
        email: email
          } ;
    }

    
      
    await User.findOneAndUpdate({_id: userId}, {$set: updates
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
  const city = req.body.city;
  const state = req.body.state;

  const address = [{
    recname: recname,
    recphone: recphone,
    pincode: pincode,
    addLine1: addLine1,
    addLine2: addLine2,
    landmark: landmark,
    city: city,
    state: state
  }]

  const user = await User.findOne({userId});

  user.address.push({ recname, recphone, pincode, addLine1, addLine2, landmark, city, state})

  res.status(200).json({
      message: 'Address Added',
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
    const city = req.body.city;
    const state = req.body.state;

    const address = [{
     recname: recname,
     recphone: recphone,
     pincode: pincode,
     addLine1: addLine1,
     addLine2: addLine2,
     landmark: landmark,
     city: city,
     state: state
  }]

  const user = await User.findByIdAndUpdate({_id: userId, address: {_id: addressId} }, {$set: {address: address} })
  
        res.status(200).json({
            message: 'Address Updated'
        });


  }catch(err){
    console.log(err);
    res.status(500).json({
      message: "Some error occured."
    });    
  }
}