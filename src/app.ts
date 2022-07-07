import express, { Application } from 'express';
import mongoose from 'mongoose';
import router from './routes/index';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
const cloudinary = require('cloudinary').v2;

dotenv.config();

export const app: Application = express();
app.use(bodyParser.json());

// check mongo uri error 
function main() {
  cloudinary.config({
    cloud_name: 'dodlsfgg2',
    api_key: '626991556691434',
    api_secret: 'bLVGARZNjgl1_8FN2jSIbMVtZe0'
  });

  const dbConnection = async () => {
    const connect = await mongoose.connect('mongodb+srv://srah_o1:SrAh2603@cluster0.6psio.mongodb.net/himavasanthdb1?retryWrites=true&w=majority');
    console.log('db connected');
  };
  
  dbConnection();
  
	app.get('/livecheck', (req, res) => {
		res.status(200).send('working');
	});

  app.use('/', [router.register, router.login, router.upload]);
}

main();