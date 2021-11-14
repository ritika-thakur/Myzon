var express = require('express');
var cartRouter = express.Router()

var Product = require("../models/product.model");

cartRouter.post("/cart", async (req, res) => {
    const { productId, quantity, name, price } = req.body;
  
    const userId = req.user._id;
  
    try {
      let cart = await Cart.findOne({ userId });
  
      if (cart) {
        
        let itemIndex = cart.products.findIndex(p => p.productId == productId);
  
        if (itemIndex > -1) {
          
          let productItem = cart.products[itemIndex];
          productItem.quantity = quantity;
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
      res.status(500).send("Something went wrong");
    }
  });

  module.exports = cartRouter;