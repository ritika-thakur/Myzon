const express = require('express');
const config = require('../config');
const multer = require('multer');
const cors = require('./cors.route');
const checkAuth = require('../middlewares/checkAuth');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/images');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

const imageFileFilter = (req, file, callback)=> {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error("You can upload only image files!"), false);
    }
    callback(null, true);
};

const upload = multer({ 
    storage: storage,limits: {
    fileSize: 1024 * 1024 * 5
    },
    fileFilter: imageFileFilter});

const uploadRouter = express.Router();

uploadRouter.use(express.json());

uploadRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(200);
    })
    .get(cors.cors, checkAuth, (req, res, next) => {
        res.statusCode = 403;
        res.end('GET operation not supported on /imageUpload');
    })
    .put(cors.corsWithOptions, checkAuth, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /imageUpload');
    })
    .post(cors.corsWithOptions, checkAuth, upload.single('imageFile'), (req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(req.file);    
    })
    .delete(cors.corsWithOptions, checkAuth, (req, res, next) => {
        res.statusCode = 403;
        res.end('DELETE operation not supported on /imageUpload');
    });


module.exports = uploadRouter;