const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
    },
    variantId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true
    },
    quantity: { 
        type: Number, 
        default: 1, 
        required: true 
    },
    dvlStatus: {
        delivered: {
            type: Boolean,
            required: true,
            default: false
        },
        accepted: {
            type: Boolean,
            required: true,
            default: false
        },
        ready: {
            type: Boolean,
            required: true,
            default: false
        }, 
        dispatched: {
            type: Boolean,
            required: true,
            default: false
        },
        intransist: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Order', orderSchema);