import express from 'express';
import users from '../models/user';
import * as validators from '../utils/validators';
import middlewares from '../middlewares/index';
import {encryptPassword} from '../utils/utils'


const register = express.Router();

register.post('/signup', middlewares.checkUser, async (req, res) => {

  if(typeof req.body.name !== 'string' || typeof req.body.emailId !== 'string' || typeof req.body.password !== 'string'){
    res.status(400).send(`name, emailId and password must be strings`);
    return;
  }
  const userData: user = req.body;
  const error = validators.validateRegisterUser(userData);
  if(error.length){
    res.status(400).send(error);
    return;
  }

  userData.password = await encryptPassword(req.body.password);
  const userdb = new users(userData);

  try {
    await userdb.save();
    res.status(200).send('registered succesfully');
  } catch (err) {
    res.status(500).send({message : err});
  }
})

register.get('/users', async (req, res) => {
  try {
    const usersPresent = await users.find();
    res.status(200).send(usersPresent);
  } catch (err) {
    res.status(500).send({message : err});
  }
})

export default register;