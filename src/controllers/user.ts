import { RequestHandler } from 'express';
import users from '../models/user';
import * as validators from '../utils/validators';
import { checkPassword, encryptPassword } from '../utils/utils';
import jwt from 'jsonwebtoken';

const createUser: RequestHandler = async (req, res) => {
	if (
		typeof req.body.name !== 'string' ||
		typeof req.body.emailId !== 'string' ||
		typeof req.body.password !== 'string'
	) {
		res.status(400).send(`name, emailId and password must be strings`);
		return;
	}
	const userData: user = req.body;
	const error = validators.validateRegisterUser(userData);
	if (error.length) {
		res.status(400).send(error);
		return;
	}

	userData.password = await encryptPassword(req.body.password);
	const userdb = new users(userData);

	try {
		await userdb.save();
		res.status(200).send('registered succesfully');
	} catch (err) {
		res.status(500).send({ message: err });
	}
};

const getUsers: RequestHandler = async (req, res) => {
	try {
		const usersPresent = await users.find();
		res.status(200).send(usersPresent);
	} catch (err) {
		res.status(500).send({ message: err });
	}
};

const login: RequestHandler = async (req, res) => {
	const userData = await users.findOne({ emailId: req.body.emailId });

	if (!userData) {
		res.status(404).send('email is not registered.');
		return;
	}

	if (!(await checkPassword(req.body.password, userData.password))) {
		res.status(400).send('Wrong password');
		return;
	}
	const jwtToken = jwt.sign({ emailId: req.body.emailId }, process.env.SECRET_KEY as string, {
		expiresIn: '1h',
	});

	res.status(200).json({ token: jwtToken, message: 'logged in successfully' });
};

const user = {
	createUser,
	getUsers,
	login,
};

export default user;
