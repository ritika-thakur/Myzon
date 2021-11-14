const mongoose = require("mongoose");
const { model, Schema } = require("mongoose");
const Product = require("../models/product.model");
const Cart = require("./cart.model");


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

    userImage: {
      data: Buffer,
      type: String,
    },

    role :{
     type : String,
     enum:["ADMIN","USER"],
     default:"USER",
    },   

   phoneOtp:String


  },
  { timestamps: true }
);
module.exports = model("User", userSchema);
 