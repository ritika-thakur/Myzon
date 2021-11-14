const User = require("../models/user.model");
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

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

// --------------- fetch current user -------------------------

exports.fetchCurrentUser = async (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .select('name address email phone userImage')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
            product: doc,
            request: {
                type: 'GET',
                url: PORT + "/:userId"
            }
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
  
    const id = req.params.userId;
    const {phone} = req.body.phone; 
    const new_name = req.body.name;
    const new_add = req.body.address;
    const new_img = req.file.path;
      
    await User.findOneAndUpdate({_id: id}, {$set: {
      name: new_name,
      address: new_add,
      userImage: new_img
        }
      }).exec()
      .then(result => {
        res.status(200).json({
            message: 'Product updated',
            request: {
                type: 'GET',
                url: PORT + "/products/" + id
            }
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
  
  