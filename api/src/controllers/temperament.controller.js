const { Temperament } = require('../db');

exports.getTemperaments = async (_req, res) => {
	const temperaments = await Temperament.findAll({ attributes: ['name'] });
	if (temperaments.length === 0) {
		return res.json({ message: 'No hay temperaments' });
	}
	return res.json(temperaments);
};
