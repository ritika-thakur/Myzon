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

// --------------- update user profile -------------------------

exports.updateUserProfile =  async (req, res, next) => {
    try {
  
  
      const {phone} = req.body.phone;
      const new_name = req.body.name;
      const new_add = req.body.address;
      const new_img = {data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
      contentType: 'image/png'}
      const updated_details = {
        name: new_name,
        address: new_add,
        image: new_img
      }
      
  
      if (!user) {
        next({
          status: 400,
          message: USER_NOT_FOUND_ERR
        });
        return;
      }
      if (user) {
        const user = await User.findOneAndUpdate({phone}, {$set: {
          name: new_name,
          address: new_add,
          image: new_img
        }}
        );
  
      }
    } catch (error) {
      next(error);
    }
  };
  