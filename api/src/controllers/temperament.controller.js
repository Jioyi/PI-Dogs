const { Temperament } = require('../db');
const { findAll } = require('../utils');

exports.getTemperaments = async (_req, res, next) => {
	try {
		let temperaments = await findAll(Temperament, { attributes: ['name'] });
		return temperaments.length !== 0
		? res.json(temperaments)
		: res.status(404).json({ message: 'No temperaments found' });
	} catch (error) {
		next(error);
	}
};
