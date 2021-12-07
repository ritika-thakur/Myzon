const mongoose = require("mongoose");
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;



const productVariantSchema = new mongoose.Schema({
    color:{
        type: String,
    },
    size:{
        type:String
    },
    type:{
        type:String,
    },
    qty: {
        type:Number
    }
});

const productSchema = new mongoose.Schema({ 
    
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    productImage: [{
        type: String,  
    }],
    category: {
        type: String,
        required: true
    },
    subcategory:{
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    variant:[productVariantSchema],
    sellerId: {
        type: String
    } ,
}, {
    timestamps: true
});


module.exports = mongoose.model("Product", productSchema);
