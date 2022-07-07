import { RequestHandler } from 'express';
import users from '../models/user';
import jwt from 'jsonwebtoken';

const checkUser: RequestHandler = async (req, res, next) => {
  const existingUser = await users.findOne({emailId: req.body.emailId});

  if(existingUser){
    res.status(400).send(`user already exists:${req.body.emailId}`);
    return;
  }
  next();
}

const verifyUser: RequestHandler = async (req: any, res, next) => {
  if(!req.headers['user-access-token']){
    res.status(403).send(`user is not authorized`);
    return;
  }
  const jwtToken: any = req.headers['user-access-token'];
  
  jwt.verify(jwtToken, 'photoUploaderAPI', (err: any, data: any) => {
    if(err) {
      res.status(400).json({message: err});
      return;
    } else {
      req.userId = data.emailId;
      next();
    }
  })
}

export { checkUser, verifyUser }