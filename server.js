const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const knex = require('knex')({
	connectionString: process.env.DATABASE_URL,
    ssl: true
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/signin', signin.handleSignin(knex, bcrypt));

app.post('/register', register.handleRegister(knex, bcrypt));

app.get('/profile/:id', profile.handleProfileGet(knex));

app.put('/imageQuery', image.handleImageQuery(knex));

app.listen(process.env.PORT, () => {
	console.log(`app is running on port ${process.env.PORT}`);
});

var knex = require('knex')({
        connectionString: process.env.DATABASE_URL,
    ssl: true,
        }
});
