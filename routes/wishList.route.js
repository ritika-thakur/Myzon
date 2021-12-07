var express = require('express');
var wishlistRouter = express.Router()

var Product = require("../models/product.model");

var WishList = require("../models/wishlist.model")

wishlistRouter.post("/wishList", async (req, res) => {
    const { productId, name, price } = req.body;
  
    const userId = req.body.userId;

    try {
      let wishList = await WishList.findOne({ userId: userId });
  
      if (wishList) {
        
        let itemIndex = wishList.products.findIndex(p => p.productId == productId);
  
        if (itemIndex > -1) {
          
          let productItem = wishList.products[itemIndex];
          wishList.products[itemIndex] = productItem;
        } else {
          
          wishList.products.push({ productId: productId, name: name, price: price});
        }
        wishList = await wishList.save();
        return res.status(201).send(wishList);
      } else {
        
        const newwishList = await WishList.create({
          userId: userId,
          products: [{ productId: productId, name: name, price: price }]
        });

        return res.status(201).send(newwishList);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  });

module.exports = wishlistRouter;