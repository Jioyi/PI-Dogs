const { Temperament } = require('../db');

exports.getTemperaments = async (_req, res) => {
	let temperaments = await findAll(Temperament, ['name']);
	if (temperaments.length === 0) {
		return res.json({ message: 'No hay temperaments' });
	}
	return res.json(temperaments);
};

function findAll(dbModel, attributes) {
	return new Promise(function (resolve, reject) {
		dbModel
			.findAll({ attributes: attributes })
			.then((data) => {
				resolve(data);
			})
			.catch((err) => reject(err));
	});
}
