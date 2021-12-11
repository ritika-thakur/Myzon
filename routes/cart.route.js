const express = require('express');
const cartRouter = express.Router();


const Product = require("../models/product.model");

const Cart = require("../models/cart.model");
const Order = require("../models/order.model");

cartRouter.get("/", async(req, res) => {
  const {userId} = req.body;

  try{
    Cart.findById({userId})
    .select("userId products")
    .exec()
    .then(docs => {

    })
  }catch(err){
    next(err);
  }
})

cartRouter.post("/", async (req, res) => {

  const {userId} = req.body;
  const confirmOrder = req.body.confirmOrder;
  try{

    if(cart){
      return res.status(201).send(cart);
    }else{
      return res.status(404).json({message: "Cart not found."});

    let cart = await Cart.findOne({ userId });
    if (cart){
    var productDataList=[]
    cart.products.forEach( (product)=>{
      console.log(product);
      let proId = product.productId;
      let productData =  Product.findById({proId});
      console.log(productData);
      });
    }
    confirmOrder.addEventListener('click', function(req, res, next){
      Order.insertMany()
    })
    }

  }catch(err){
    res.status(404).json({
      message: "Some error occured."
    })
  }

})


cartRouter.post("/addcart", async (req, res) => {
    
    const { productId, quantity, name, price, variant} = req.body;
    
    const {userId} = req.body;

    let qty = parseInt(quantity);
  
    try {
      let cart = await Cart.findOne({ userId });

      //console.log(variant)
  
      if (cart) {
        
        let itemIndex = cart.products.findIndex(p => p.productId == productId);
  
        if (itemIndex > -1) {
          
          let productItem = cart.products[itemIndex];
          productItem.quantity += qty;
          cart.products[itemIndex] = productItem;
        } else {
          
          cart.products.push({ productId, quantity, name, price, variant });
        }
        cart = await cart.save();
        return res.status(201).send(cart);
      } else {
        
      
        const newCart = await Cart.create({
          userId: userId,
          products: [{ productId, quantity, name, price, variant }]
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