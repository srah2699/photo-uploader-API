import express from 'express';
import multer from 'multer';
import middlewares from '../middlewares/index';
import uploads from '../models/upload';
const cloudinary = require('cloudinary').v2;
const upload = multer({dest:'uploads/'});
import jwt from 'jsonwebtoken';
import router from '.';

const uploader = express.Router();

uploader.get('/test', middlewares.verifyUser, (req, res) => {
  const token: any = req.headers['user-access-token'];
  const decode = jwt.decode(token, {complete: true});
  res.send(decode);
})

uploader.post('/upload', middlewares.verifyUser, upload.single('test'), async (req: any, res) => {

  const data: any = req.file;
  try{
  const imgString = await cloudinary.uploader.upload(data.path, {
    folder: 'samples',
    use_filename: true
   });

  const uploadData: uploaderData = {
    userId: req.userId,
    image: imgString.secure_url,
    desc: req.body.desc
  } 
  const image = new uploads(uploadData);
  await image.save();
  res.status(200).send('sucessfully uploaded');
  } catch (err) {
    res.status(500).send(err);
  }
})

uploader.get('/myuploads', middlewares.verifyUser, async (req: any, res) => {
  try {
    const userUploads = await uploads.findOne({userId: req.userId});
    res.status(200).send(userUploads);
  } catch (err) {
    res.status(500).send(err);
  }
})

uploader.get('/alluploads', middlewares.verifyUser, async (req, res) => {
  try {
    const allUploads = await uploads.find();
    res.status(200).send(allUploads);
  } catch (err) {
    res.status(500).send(err);
  }
})

uploader.put('/myuploads', middlewares.verifyUser, async (req, res) => {
  //update it take same inputs as post and id 
})

uploader.delete('/myuploads', middlewares.verifyUser, async (req, res) => {
  //same as update gets id
})
export default uploader;