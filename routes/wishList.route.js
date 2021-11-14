var express = require('express');
var wishlistRouter = express.Router()

var Product = require("../models/product.model");

wishlistRouter.post("/wishList", async (req, res) => {
    const { productId, name, price } = req.body;
  
    const userId = req.user._id //TODO: the logged in user id
  
    try {
      let wishList = await wishList.findOne({ userId });
  
      if (wishList) {
        //wishList exists for user
        
        let itemIndex = wishList.products.findIndex(p => p.productId == productId);
  
        if (itemIndex > -1) {
          //product exists in the wishList, update the quantity
          
          let productItem = wishList.products[itemIndex];
          wishList.products[itemIndex] = productItem;
        } else {
          //product does not exists in wishList, add new item
          
          wishList.products.push({ productId, name, price });
        }
        wishList = await wishList.save();
        return res.status(201).send(wishList);
      } else {
        //no wishList for user, create new wishList
        
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