const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
var knex = require('knex')({
	client: 'pg',
	connection: {
		host : '127.0.0.1',
		user : 'ut',
		password : '123',
		database : 'smart-brain'
	}
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/signin', signin.handleSignin(knex, bcrypt));

app.post('/register', register.handleRegister(knex, bcrypt));

app.get('/profile/:id', profile.handleProfileGet(knex));

app.put('/imageQuery', image.handleImageQuery(knex));

app.listen(3000, () => {
	console.log("app is running on port 3000");
});
