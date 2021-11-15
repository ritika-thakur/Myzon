const mongoose = require("mongoose");
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;


const productSchema = new mongoose.Schema({ 
    
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Product", productSchema);