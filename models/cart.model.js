const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
        },
        quantity: Number,
        variant: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
        }
      }
    ],
    active: {
      type: Boolean,
      default: true
    },
    modifiedOn: {
      type: Date,
      default: Date.now
    }
  },

  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);

// module.exports = function Cart(){
//     this.items = oldCart.items;
//     this.totalQty = oldCart.totalQty;
//     this.totalPrice = oldCart.totalPrice;

//     this.add = function(item, id){
//         var storedItem = this.items[id];
//         if(!storedItem){
//             stordItem = this.items[id] = {items: item, qty: 0, price: 0}
//         }
//         storedItem.qty++;
//         storedItem.price = storedItem.item.price * storedItem.qty;
//         this.totalQty++;
//         this.totalPrice += storedItem.price;  
//     };
//     this.generateArray = function(){
//         var arr =[];
//         for (var id in this.items){
//             arr.push(this.items[id]);
//         }
//         return arr;
//     };

// ;}

