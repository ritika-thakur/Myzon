const express = require("express");
const orderRouter = express.Router();
const mongoose = require("mongoose");

const checkAuth = require("../middlewares/checkAuth");
const checkAdmin = require("../middlewares/checkAdmin");

const Order = require("../models/order.model");
const Product = require("../models/product.model");
const Cart = require("../models/cart.model");
const { PORT } = require("../config");

// Handle incoming GET requests to /orders
orderRouter.get("/", (req, res, next) => {
  Order.find()
    .select("product quantity _id dvlStatus")
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            dvlStatus: doc.dvlStatus,
            seller: req.body.seller,
            request: {
              type: "GET",
              url: PORT +"/orders/" + doc._id
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});


orderRouter.post("/", checkAuth, (req, res, next) => {
  const orderConfirm = req.body.orderConfirm;

  Product.findById(req.body.productId)
    .then(product => {
      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        });
      }
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId,
        dvlstatus: req.body.dvlstatus,
        seller: req.body.seller
      });
      return order.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Order stored",
        createdOrder: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity,
          dvlStatus: result.dvlstatus,
          seller: req.body.seller
        },
        request: {
          type: "GET",
          url: PORT + "/orders/" + result._id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

orderRouter.post("/placedorder", (req, res, next) => {
  const {userId} = req.body;
  Cart.findOne({userId})
  .exec()
  .then(result => {
    if(!result){
      return res.status(404).json({
        message: "Order not found"
      });
    }
    console.log(result)
  })
});

orderRouter.get("/:orderId", checkAuth, (req, res, next) => {
  Order.findById(req.params.orderId)
    .exec()
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: "Order not found"
        });
      }
      res.status(200).json({
        order: order,
        request: {
          type: "GET",
          url: PORT+"/orders"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

orderRouter.delete("/:orderId", checkAuth, (req, res, next) => {
  Order.remove({ _id: req.params.orderId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Order deleted",
        request: {
          type: "POST",
          url: PORT+"/orders",
          body: { productId: "ID", quantity: "Number" }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = orderRouter;