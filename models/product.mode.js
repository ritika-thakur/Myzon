const { model, Schema } = require("mongoose");


const productSchema = new Schema({
    _id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    seller: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = model("Product", productSchema);