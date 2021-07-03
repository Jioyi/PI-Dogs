const { Dog } = require('../db');
const { Op } = require('sequelize');

exports.getDogs = async (req, res) => {
	const name = req.query.name;
	if (name) {
		const dogs = await Dog.findAll({
			where: {
				name: { [Op.like]: `%${name}%` },
			},
			limit: 8,
			attributes: ['name'],
		});
		if (dogs.length === 0) {
			return res.json({ message: 'No tenemos de esa raza' });
		}
		return res.json(dogs);
	} else {
		const dogs = await Dog.findAll({
			offset: 0,
			limit: 8,
			attributes: ['name'],
		});
		if (!dogs) {
			return res.json({ message: 'Nada' });
		}
		return res.json(dogs);
	}
};

exports.getDogForId = async (req, res) => {
	const id = parseInt(req.params.id);
	if (id) {
		const dog = await Dog.findOne({
			where: {
				id: id,
			},
			attributes: ['id', 'name', 'height', 'weight', 'life_span'],
		});
		if (!dog) {
			return res.json({ message: 'No tenemos de esa raza' });
		}
		return res.json(dog);
	} else {
		return res.json({ message: 'Nada' });
	}
};
