import express, { Application } from 'express';
import mongoose from 'mongoose';
import router from './routes/index';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
const cloudinary = require('cloudinary').v2;

dotenv.config();

export const app: Application = express();
app.use(bodyParser.json());

function main() {
  cloudinary.config({
    cloud_name: process.env.CLOUD,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET_KEY,
  });

  const dbConnection = async () => {
    const connect = await mongoose.connect(process.env.MONGO_URI as string);
  };
  
  dbConnection();
  
	app.get('/livecheck', (req, res) => {
		res.status(200).send('working');
	});

  app.use('/', [router.user, router.upload]);
}

main();