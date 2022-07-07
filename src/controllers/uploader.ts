import { RequestHandler } from 'express';
import uploads from '../models/upload';
const cloudinary = require('cloudinary').v2;

const uploadData: RequestHandler = async (req: any, res) => {
  const imgData: any = req.file;
  try{
  const imgString = await cloudinary.uploader.upload(imgData.path, {
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
    return res.status(500).send(err);
  }
}

const getUserUploads: RequestHandler = async (req: any, res) => {
  try {
    const userUploads = await uploads.findOne({userId: req.userId});
    res.status(200).send(userUploads);
  } catch (err) {
    return res.status(500).send(err);
  }
}

const getAllUploads: RequestHandler = async (req: any, res) => {
  try {
    const allUploads = await uploads.find();
    res.status(200).send(allUploads);
  } catch (err) {
    return res.status(500).send(err);
  }
}

const updateUpload: RequestHandler = async (req: any, res) => {
  try {
    const upload = await uploads.findById(req.params.id);
    if(!upload) {
      return res.status(404).send({error: 'NO UPLOAD PRESENT FOR ID'});
    } else if(upload.userId !== req.userId) {
      return res.status(404).send({error: 'NO PERMISSION TO UPDATE THIS FILE'});
    }
  } catch (err) {
    return res.status(500).send(err);
  }

  const imgData: any = req.file;
  const imgString = await cloudinary.uploader.upload(imgData.path, {
    folder: 'samples',
    use_filename: true
   });

  const updateUpload = {
    image: imgString.secure_url,
    desc: req.body.desc
  };
  await uploads.findByIdAndUpdate(req.params.id, updateUpload);
  res.status(200).send('succesfully updated');
}

const deleteUpload: RequestHandler = async (req: any, res) => {
  try{
    const upload = await uploads.findById(req.params.id);
    if(!upload) {
      return res.status(404).send({error: 'NO UPLOAD PRESENT FOR ID'});
    } else if(upload.userId !== req.userId) {
      return res.status(404).send({error: 'NO PERMISSION TO DELETE THIS FILE'});
    }
  } catch (err) {
    return res.status(500).send(err);
  }
  await uploads.findByIdAndDelete(req.params.id);
  res.status(200).send('succesfully deleted');
}

const uploader = {
  uploadData,
  getUserUploads,
  getAllUploads,
  updateUpload,
  deleteUpload
}

export default uploader;