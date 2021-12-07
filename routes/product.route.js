const express = require("express");
const productRouter = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const checkAuth = require("../middlewares/checkAuth");
const checkAdmin = require("../middlewares/checkAdmin");

const Order = require("../models/order.model");
const Product = require("../models/product.model");
const Seller = require("../models/seller.model");
const { PORT } = require("../config");

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads');
    },
    filename:   function(req, file, cb){
        cb(null,makeid(12) + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error("You can upload only image files!"), false);
    }
    cb(null, true);
}

const upload = multer({
    storage: storage, 
    limits: {
    fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


productRouter.get("/", (req, res, next) => {
  Product.find()
    .select("name price _id description productImage category subcategory location seller variant")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            name: doc.name,
            price: doc.price,
            _id: doc._id,
            description: doc.description,
            category: doc.category, 
            subcategory: doc.subcategory,
            location: doc.location,
            productImage: doc.productImage,
            seller: doc.seller,
            variant: doc.variant,
            request: {
              type: "GET",
              url: PORT + "/products/" + doc._id
            }
          };
        })
      };
      res.status(200).json(response);
      
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });

});

productRouter.post("/", upload.any('productImage'), (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    subcategory: req.body.subcategory,
    location: req.body.location,
    seller: req.body.seller,
    variant: req.body.variant
  });


  for(var i=0;i<req.files.length;i++){
    if (req.files[i] != null){
      product.productImage.push(req.files[i].path);
   }

  }
  product
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created product successfully",
        createdProduct: {
            name: result.name,
            price: result.price,
            description: result.description,
            productImage: result.productImage,
            category: result.category,
            subcategory: result.subcategory,
            location: result.location,
            _id: result._id,
            seller: result.seller,
            variant: result.variant,
            request: {
                type: 'GET',
                url: PORT + "/products/" + result._id
            }
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

productRouter.get("/getproduct",  (req, res, next) => {
  const id = req.body.productId;
  Product.findById({_id: id})
    .select('name price _id description category productImage subcategory location seller variant')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
            product: doc,
            request: {
                type: 'GET',
                url: PORT + "/products"
            }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

productRouter.put("/updateproduct", (req, res, next) => {
  try{
    const id = req.body.id;
  
  const price = req.body.price;
  const name = req.body.name;
  const description = req.body.description;
  const category = req.body.category;
  const subcategory = req.body.subcategory;
  const location = req.body.location;
  const productImage = req.file;
  const seller = req.body.seller;
  const variant = req.body.variant;
  

  const productUpdates = {
    price: price,
    name: name,
    description: description,
    category: category,
    subcategory: subcategory,
    location: location,
    productImage: productImage,
    seller: seller,
    variant: variant
  }

  Product.updateOne({ _id: id }, { $set: {productUpdates} })
    
      res.status(200).json({
          message: 'Product updated',
          request: {
              type: 'GET',
              url: PORT + "/products/" + id
          }
      });
  
  }catch(err){
      console.log(err);
      res.status(500).json({
        error: err
      });
    }
  });
  

productRouter.post("/productbytype", async (req, res, next) => {
  try{
  const category = req.body.category;
  const subcategory = req.body.subcategory;
  const location = req.body.location;

  if (category == null && subcategory == null){
    Product.find({location:{$in:location}})
    .select("name price _id description productImage category subcategory location")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            name: doc.name,
            price: doc.price,
            _id: doc._id,
            description: doc.description,
            category: doc.category, 
            subcategory: doc.subcategory,
            location: doc.location,
            productImage: doc.productImage,
            seller: doc.seller,
            variant: doc.variant,
            request: {
              type: "GET",
              url: PORT + "/products/" + doc._id
            }
          };
        })
      };
      res.status(200).json(response);
      
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
  }else if(subcategory == null){
    Product.find({location:{$in:location}, category: {$in:category}})
    .select("name price _id description productImage category subcategory location seller")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            name: doc.name,
            price: doc.price,
            _id: doc._id,
            description: doc.description,
            category: doc.category, 
            subcategory: doc.subcategory,
            location: doc.location,
            productImage: doc.productImage,
            seller: doc.seller,
            variant: doc.variant,
            request: {
              type: "GET",
              url: PORT + "/products/" + doc._id
            }
          };
        })
      };
      res.status(200).json(response);
      
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
  }else{
    Product.find({location:{$in:location}, category:{$in:category}, subcategory:{$in:subcategory}})
    .select("name price _id description productImage category subcategory location seller")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            name: doc.name,
            price: doc.price,
            _id: doc._id,
            description: doc.description,
            category: doc.category, 
            subcategory: doc.subcategory,
            location: doc.location,
            productImage: doc.productImage,
            seller: doc.seller,
            variant: doc.variant,
            request: {
              type: "GET",
              url: PORT + "/products/" + doc._id
            }
          };
        })
      };
      res.status(200).json(response);
      
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
  }

  }catch(err){
    console.log(err);
      res.status(500).json({
        error: err
      });
  }
  
})


productRouter.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Product deleted',
          request: {
              type: 'POST',
              url: PORT + "/products/",
              body: { name: 'String', price: 'Number' }
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



productRouter.post("/addvariant", async (req, res, next) => {
  try{
    const color = req.body.color;
    const size = req.body.size;
    const type = req.body.type;
    const qty = req.body.qty;

    const productId = req.body.productId; 

    const variant = [{
      color: color,
      size: size,
      type: type,
      qty: qty
    }]


    const product = await Product.findOneAndUpdate({_id: productId}, {$set: {variant: variant}});

    product.variant.push(variant);

    res.status(200).json({
      message: 'Variant Added',
  });

  }catch(err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  };
})
module.exports = productRouter;