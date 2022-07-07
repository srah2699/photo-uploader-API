import express from 'express';
import middlewares from '../middlewares/index';
import controllers from '../controllers/index';

const user = express.Router();

user.post('/signup', middlewares.checkUser, controllers.user.createUser);

user.get('/users', controllers.user.getUsers);

user.post('/login', controllers.user.login);

export default user;