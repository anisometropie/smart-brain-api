const Clarifai = require('clarifai');
const app = new Clarifai.App({
 apiKey: '76d11ac6a2be4bf6a0af5cdec23e9623'
});

const handleImageQuery = (knex) => (req, res) => {
	const { id, imageURL } = req.body;
	app.models.predict(Clarifai.FACE_DETECT_MODEL, imageURL)
		.then(clarifaiResponse => {
			if(clarifaiResponse) {
				return knex('users').where('id', id).increment('entries', 1)
				.returning('entries')
				.then(entries => {
					if (entries.length > 0) {
						res.json([entries[0], clarifaiResponse]);
					}
					else {
						res.json("no such id");
					}
				})
				.catch(err => {
					console.log(err);
					res.status(400).json('Database error');
				});
			}
			else {
				res.status(400).json('Clarifai sent no response');
			}
		})
		.catch(err => {
			res.status(400).json(err);
		});
};

module.exports = { handleImageQuery };
