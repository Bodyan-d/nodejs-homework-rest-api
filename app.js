const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const PUBLIC_OF_USERS = process.env.PUBLIC_OF_USERS;

const contactsRouter = require('./routes/contacts/contacts.js');
const usersRouter = require('./routes/users/users.js');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(express.static(PUBLIC_OF_USERS));
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
	res.status(404).json({ status: 'error', code: 400, message: 'Not found' });
});

app.use((err, req, res, next) => {
	const statusCode = err.status || 500;
	if (err.name === 'ValidationError') {
		return res
			.status(400)
			.json({ status: 'error', code: 400, message: err.message });
	}
	res.status(statusCode).json({
		status: statusCode === 500 ? 'fail' : 'error',
		code: statusCode,
		message: err.message,
	});
});

module.exports = app;
