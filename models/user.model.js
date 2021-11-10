const { model, Schema } = require("mongoose");
const Product = require("../models/product.model");


let updatedDate = new Date();



const cartSchema = new Schema[{
    updatedAt: updatedDate,
    createdAt: updatedDate,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    products: [{
      type: mongoose.Schema.Types._id,
      ref: "Products"
    }],
    totalCost: Number
}];



const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,

    },

    address:{
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    image: {
      data: Buffer,
      type: String,
    },

    role :{
     type : String,
     enum:["ADMIN","USER"],
     default:"USER",
    },
    wishlist: {
      type: mongoose.Schema.Types._id,
      ref: "Product"
    },
    cart: [cartSchema],

   phoneOtp:String


  },
  { timestamps: true }
);

module.exports = model("Cart", cartSchema);
module.exports = model("User", userSchema);
 