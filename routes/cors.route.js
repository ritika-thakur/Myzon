const express = require('express');
const cors = require('cors');
const { PORT } = require('../config');
const app = express();

const whiteList = [PORT];
var corsOptionsDelegate = (req, callback) => {
    var corsOptionsDelegate;
    console.log(req.header('Origin'));
    if(whiteList.indexOf(req.header('Origin')) !== -1){
        corsOptions = { origin: true};
    }
    else{
        corsOptions ={ origin: false}
    }
    callback(null, corsOptions);
};

exports.corsWithOptions = cors(corsOptionsDelegate);