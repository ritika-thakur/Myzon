const mongoose = require("mongoose");
const { model, Schema } = require("mongoose");
const Product = require("../models/product.model");
const Cart = require("./cart.model");
const findOrCreate = require('mongoose-findorcreate');

const addressSchema = new Schema({
  recname: {
    type: String
  },
  recphone:{
    type: String
  },
  pincode:{
    type: String,
  },
  addLine1: {
    type: String,
    trim: true,
  },
  addLine2: {
    type: String,
    trim: true,
  },
  Landmark: {
    type:String,
    trim: true,
  }
});
const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      default: null
    },

    address:{
      type: String,
      trim: true,
      default: null
    },

    email: {
      type: String,
      trim: true, 
      default: null
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
    address: [addressSchema],
    role :{
     type : String,
     enum:["ADMIN","USER"],
     default:"USER",
    },   
    phoneOtp: {
      type: String,
      default: null
    }

  },
  { timestamps: true }
);

userSchema.plugin(findOrCreate);
module.exports = model("User", userSchema);
 