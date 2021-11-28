var express = require('express');
var cartRouter = express.Router();


var Product = require("../models/product.model");

var Cart = require("../models/cart.model");


cartRouter.post("/", async (req, res) => {

  const {userId} = req.body;

  try{
    let cart = await Cart.findOne({ userId });

    if(cart){
      return res.status(201).send(cart);
    }else{
      return res.status(404).json({message: "Cart not found."});
    }

  }catch(err){
    res.status(404).json({
      message: "Some error occured."
    })
  }

})


cartRouter.post("/addcart", async (req, res) => {
    const { productId, quantity, name, price } = req.body;
  
    const {userId} = req.body;

    let qty = parseInt(quantity);
  
    try {
      let cart = await Cart.findOne({ userId });
  
      if (cart) {
        
        let itemIndex = cart.products.findIndex(p => p.productId == productId);
  
        if (itemIndex > -1) {
          
          let productItem = cart.products[itemIndex];
          productItem.quantity += qty;
          cart.products[itemIndex] = productItem;
        } else {
          
          cart.products.push({ productId, quantity, name, price });
        }
        cart = await cart.save();
        return res.status(201).send(cart);
      } else {
        
        const newCart = await Cart.create({
          userId,
          products: [{ productId, quantity, name, price }]
        });
  
        return res.status(201).send(newCart);
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something went wrong");
    }
  });


  cartRouter.post("/removecart", async (req, res) => {
    const { productId, quantity} = req.body;
  
    const {userId} = req.body;

    let qty = parseInt(quantity)
  
    try {
      let cart = await Cart.findOne({ userId });
  
      if (cart) {
        
        let itemIndex = cart.products.findIndex(p => p.productId == productId);
  
        if (itemIndex > -1) {
          
          let productItem = cart.products[itemIndex];
         
          if (productItem.quantity <= qty || qty == -1){
            cart.products.splice(itemIndex, 1);
          }else{
            productItem.quantity -= qty;
            cart.products[itemIndex] = productItem;
          }
          cart = await cart.save();
         return res.status(201).send(cart);
        } else {  
          return res.status(404).json({
            message: "Item not found."
          })
        }
        
      } else{
        return res.status(404).json({message: "Cart not found."});
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  });









  module.exports = cartRouter;