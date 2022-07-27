import express from 'express';
import multer from 'multer';
import middlewares from '../middlewares/index';
import controllers from '../controllers/index';
const cloudinary = require('cloudinary').v2;

const upload = multer({dest:'uploads/'});
const uploader = express.Router();

uploader.post('/upload', middlewares.verifyUser, upload.single('photo'), controllers.uploader.uploadData)

uploader.get('/myuploads', middlewares.verifyUser, controllers.uploader.getUserUploads)

uploader.get('/alluploads', middlewares.verifyUser, controllers.uploader.getAllUploads)

uploader.put('/myuploads/:id', middlewares.verifyUser, upload.single('photo'), controllers.uploader.updateUpload)

uploader.delete('/myuploads/:id', middlewares.verifyUser, controllers.uploader.deleteUpload)

export default uploader;