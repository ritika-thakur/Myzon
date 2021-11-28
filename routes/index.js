var express = require('express');
var indexRouter = express.Router();

var Product = require("../models/product.model");

/* GET home page. */
indexRouter.get('/', function(req, res, next) {
  res.render('index', {title: 'Myzon'});
});

module.exports = indexRouter;