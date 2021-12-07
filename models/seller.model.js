const mongoose = require("mongoose");
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;


const sellerSchema = new mongoose.Schema({
    name: {
        type: String
    },
    seller_phone: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    aadhar: {
        type: Number,
        required: true
    },
    pan:{
        type: String
    },
    account_details: {
        account_no: {
            type: Number,
            required: true
        },
        IFSC_code: {
            type: String,
            required: true
        },
        bank_name: {
            type: String,
            required: true
        },
        bank_address: {
            type: String,
            required: true
        }
    },
    add_of_est: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "non-verified"
    },
    image: {
        type: String,
       default: null
    }

});

module.exports = mongoose.model("Seller", sellerSchema);

//email, adhar, pan, account details