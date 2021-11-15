const User = require("../models/user.model");
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const multer = require('multer');
const multiparty = require("multiparty");

const {
  PHONE_NOT_FOUND_ERR,

  PHONE_ALREADY_EXISTS_ERR,
  USER_NOT_FOUND_ERR,
  INCORRECT_OTP_ERR,
  ACCESS_DENIED_ERR,
} = require("../errors");

// const {
//   checkPassword,
//   hashPassword
// } = require("../utils/password.util");
const {
  createJwtToken
} = require("../utils/token.util");

const {
  generateOTP,
  fast2sms
} = require("../utils/otp.util");

// --------------------- create new user ---------------------------------

exports.createNewUser = async  (req, res, next) => {
  try {

    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'uploads')
      },
      filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
      }
    });

    const upload = multer({storage: storage});

    let {
      phone,
      name,
      email,
      address
    } = req.body;

    let {image} = {data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)), contentType: 'image/png'};


    const phoneExist = await User.findOne({phone});

    if (phoneExist) {
      next({
        status: 400,
        message: PHONE_ALREADY_EXISTS_ERR
      });
      
    }else{
      const createUser = new User({
        phone,
        name,
        email,
        address,
        image,
        role: phone === process.env.ADMIN_PHONE ? "ADMIN" : "USER"
      });
  
  
      const user = await createUser.save();
  
      res.status(200).json({
        type: "success",
        message: "Account created OTP sended to mobile number",
        data: {
          userId: user._id,
        },
      });
  
      const otp = generateOTP(6);
      user.phoneOtp = otp;
      await user.save();
      await fast2sms({
          message: `Your OTP is ${otp}`,
          contactNumber: user.phone,
        },
        next
      );  

    }

      } catch (error) {
    next(error);
  }
};

// ------------ login with phone otp ----------------------------------

exports.loginWithPhoneOtp = async (req, res, next) => {
  try {

    const {
      phone
    } = req.body;
    const user = await User.findOne({
      phone
    });

    if (!user) {
      next({
        status: 400,
        message: PHONE_NOT_FOUND_ERR
      });
    }else{
      res.status(201).json({
        type: "success",
        message: "OTP sended to your registered phone number",
        data: {
          userId: user._id,
        },
      });
  
      const otp = generateOTP(6);
      user.phoneOtp = otp;
      user.isAccountVerified = true;
      await user.save();
      await fast2sms({
          message: `Your OTP is ${otp}`,
          contactNumber: user.phone,
        },
        next
      );
    }
  } catch (error) {
    next(error);
  }
};

// ---------------------- verify phone otp -------------------------

exports.verifyPhoneOTP = async (req, res, next) => {
  try {
    const {
      otp,
      userId
    } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      res.status(400).json({
        type: "User not found",
        message: USER_NOT_FOUND_ERR
      });
    }else{
      if (user.phoneOtp !== otp) {
        res.status(400).json({
          type: "Wrong Otp",
          message: WRONG_OTP
        });
      }else{
        
      }
      const token = createJwtToken({
        userId: user._id
      });
  
      user.phoneOtp = "";
      await user.save();
  
      res.status(201).json({
        type: "success",
        message: "OTP verified successfully",
        data: {
          token,
          userId: user._id,
        },
      });
    }
  } catch (error) {
    res.json(error);
  }
};


// --------------- admin access only -------------------------

exports.handleAdmin = async (req, res, next) => {
  try {
    const currentUser = res.locals.user;

    return res.status(200).json({
      type: "success",
      message: "Okay you are admin!!",
      data: {
        user: currentUser,
      },
    });
  } catch (error) {
    var err = new Error('Permission Denied!');
    err.status = 403;
  }
};



// ------------- Log Out --------------------//

exports.logout = async (req, res, next) => {
  try{
    res.redirect('/');
  }catch(err){
    var err = new Error('You are not logged in!');
    err.status = 403;
  }
}
