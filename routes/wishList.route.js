var express = require('express');
var wishlistRouter = express.Router()

var Product = require("../models/product.model");

wishlistRouter.post("/wishList", async (req, res) => {
    const { productId, name, price } = req.body;
  
    const userId = req.user._id
  
    try {
      let wishList = await wishList.findOne({ userId });
  
      if (wishList) {
        
        let itemIndex = wishList.products.findIndex(p => p.productId == productId);
  
        if (itemIndex > -1) {
          
          let productItem = wishList.products[itemIndex];
          wishList.products[itemIndex] = productItem;
        } else {
          
          wishList.products.push({ productId, name, price });
        }
        wishList = await wishList.save();
        return res.status(201).send(wishList);
      } else {
        
        const newwishList = await wishList.create({
          userId,
          products: [{ productId, name, price }]
        });
  
        return res.status(201).send(newwishList);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  });

module.exports = wishlistRouter;