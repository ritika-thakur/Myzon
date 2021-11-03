const { model, Schema } = require("mongoose");

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
 