'use strict'

//Manage files
const crypto = require("crypto");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require('gridfs-stream');
//BD info
var config = require('../config');
// Express
var express = require('express');

// Auth
var mdAuth = require('../middlewares/auth');

var api = express.Router();

// connection
const conn = mongoose.createConnection(config.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

let gfs;

conn.once("open", () => {
  // init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Storage
const storage = new GridFsStorage({
    url: config.db,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          console.log(file.originalname);
          const filename = file.originalname;
          const fileInfo = {
            buffer: buf,
            filename: filename,
            bucketName: "uploads"
          };
          resolve(fileInfo);
        });
      });
    }
  });
  
const upload = multer({
    storage
});

// Upload Image
api.post("/image/store", upload.single("image"), (req, res) => {
  res.status(200).send({message: 'Imagen almacenada'});
});

// GET image
api.get("/image/show/:filename",(req, res) => {

  gfs.files.findOne({filename : req.params.filename}, (err, file) => {
      if (!file || file.length === 0) {
          return res.status(404).send({
              message: 'No existe la imagen'
          });
      }
     
      if(file.contentType === 'image/jpeg'  || file.contentType === 'image/png') {
          const readStream = gfs.createReadStream(file.filename);
          readStream.pipe(res);
          //res.status(200).send({imageID: file._id});

      }
      else {
          res.status(404).send({message: 'No es una imagen'});
      }
  });
  
    
});

// GET image
api.get("/image/:filename", mdAuth.ensureAuth,(req, res) => {

    gfs.files.findOne({filename : req.params.filename}, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).send({
                message: 'No existe la imagen'
            });
        }
       
        if(file.contentType === 'image/jpeg'  || file.contentType === 'image/png') {
            res.status(200).send({image: file});
  
        }
        else {
            res.status(404).send({message: 'No es una imagen'});
        }
    });
  });

// Delete image
api.delete('/image/:id', mdAuth.ensureAuth ,(req, res) => {
  gfs.remove({_id: req.params.id, root: 'uploads'}, (err, gridStore) => {
    if(err) {
      return res.status(404).send({message: 'No se encuentra la imagen'});
    }

    res.status(200).send({message: 'Imagen eliminada'});
    
  });
});

module.exports = api;