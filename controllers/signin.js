const handleSignin = (knex, bcrypt) => (req, res) => {
	let { email, password } = req.body;
	knex.select('email', 'hash').from('login').where('email', email)
		.then(data => {
			if (data.length > 0 && bcrypt.compareSync(password, data[0].hash)) {
				return knex.select('*').from('users').where('email', email)
					.then(user => {
						res.json(user[0])
					})
			}
			else {
				res.json('invalid email/password');
			}
		})
		.catch(err => res.status(400).json('database error'));
}

module.exports = { handleSignin };
