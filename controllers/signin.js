const handleSignin = (knex, bcrypt) => (req, res) => {
	let { email, password } = req.body;
	let response = {};
	knex.select('email', 'hash').from('login').where('email', email)
		.then(data => {
			if (data.length > 0 && bcrypt.compareSync(password, data[0].hash)) {
				return knex.select('*').from('users').where('email', email)
				// is this the same if the then is here?
				.then(user => {
					response.userInfo = user[0];
					return knex.select('*').from('queries').where('id', user[0].id).orderBy('date', 'desc').limit('10');
				})
				.then(queries => {
					response.queries = queries;
					res.json(response)
				})
			}
			else {
				res.json('invalid email/password');
			}
		})
		.catch(console.log);
		// .catch(err => res.status(400).json('database error'));
}

module.exports = { handleSignin };
