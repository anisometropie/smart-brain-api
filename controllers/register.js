const handleRegister = (knex, bcrypt) => (req, res) => {
	const { name, email, password } = req.body;
	const hash = bcrypt.hashSync(password);
	knex.transaction(trx => {
		trx.insert({
			email: email,
			hash: hash
		})
		.into('login')
		.returning('email')
		.then( () => {
			return trx('users').returning('*').insert({
				name: name,
				email: email,
				joined: new Date()
			})
			.then(user => {
				res.json(user[0]);
			})
		})
		.then(trx.commit)
		.catch(trx.rollback);
	})
	.catch(err => {
		console.log(err);
		if (err.code == 23505) {
			res.json("A user with this email already exists.");
		}
		else {
			res.json("Database error while registering");
		}
	});
}

module.exports = { handleRegister };
