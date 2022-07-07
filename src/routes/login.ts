import express from 'express';
import users from '../models/user';
import { checkPassword } from '../utils/utils';
import jwt from 'jsonwebtoken';

const login = express.Router();

login.post('/login', async (req, res) => {
  const userData = await users.findOne({emailId: req.body.emailId})

  if(!userData) {
    res.status(404).send('email is not registered.');
    return;
  }

  if(!await checkPassword(req.body.password, userData.password)) {
    res.status(400).send('Wrong password');
    return;
  }
  const jwtToken = jwt.sign({emailId: req.body.emailId}, 'photoUploaderAPI', {expiresIn: '1h'})

  res.status(200).json({token: jwtToken, 
    message: 'logged in successfully'});
})

export default login;