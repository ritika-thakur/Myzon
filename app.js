const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const path = require('path');
const fs = require('fs');


const { PORT, MONGODB_URI, NODE_ENV,ORIGIN } = require("./config");
const { API_ENDPOINT_NOT_FOUND_ERR, SERVER_ERR } = require("./errors");

const indexRouter = require("./routes/index");
//const corsRouter = require("./routes/cors.route");
const authRoutes = require("./routes/auth.route");
const productRouter = require("./routes/product.route");
const orderRouter = require("./routes/order.route");
const uploadRouter = require("./routes/upload.route");
const cartRouter = require("./routes/cart.route");
const wishlistRouter = require("./routes/wishList.route");
const userRouter = require("./routes/user.route");


const app = express();


app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ORIGIN,
    optionsSuccessStatus: 200,
  })
);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

if (NODE_ENV === "development") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

app.use('/uploads',express.static('uploads'))

app.get("/", (req, res) => {
  res.status(200).json({
    type: "success",
    message: "server is up and running",
    data: null,
  });
});


app.use("/api/auth", authRoutes);
app.use("/", indexRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/upload", uploadRouter);
app.use("/cart", cartRouter);
app.use("/wishlist", wishlistRouter);
app.use('/userprofile', userRouter);



app.use("*", (req, res, next) => {
  const error = {
    status: 404,
    message: API_ENDPOINT_NOT_FOUND_ERR,
  };
  next(error);
});

app.use((err, req, res, next) => {
  console.log(err);
  const status = err.status || 500;
  const message = err.message || SERVER_ERR;
  const data = err.data || null;
  res.status(status).json({
    type: "error",
    message,
    data,
  });
});


async function main() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("database connected");

    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

main();
