const { Temperament, Dog } = require('../db');
const { Op } = require('sequelize');

exports.getDogs = async (req, res) => {
	const name = req.query.name;
	if (name) {
		let dogs = await Dog.findAll({
			where: {
				name: { [Op.iLike]: `%${name}%` },
			},
			attributes: ['name', 'id', 'reference_image_id'],
			include: [
				{
					model: Temperament,
					attributes: ['name'],
					through: {
						attributes: [],
					},
				},
			],
		});
		if (dogs.length === 0)
			return res.status(204).json({ message: 'Search result not found' });
		return res.status(200).json(dogs);
	}
	let dogs = await Dog.findAll({
		offset: 0,
		limit: 8,
		attributes: ['name', 'id', 'reference_image_id'],
		include: [
			{
				model: Temperament,
				attributes: ['name'],
				through: {
					attributes: [],
				},
			},
		],
	});
	if (!dogs)  return res.status(204).json({ message: 'Search result not found' });
	return res.status(200).json(dogs);
};

exports.getDogForId = async (req, res) => {
	const id = parseInt(req.params.id);
	if (id) {
		const dog = await Dog.findOne({
			where: { id: id },
			attributes: [
				'id',
				'name',
				'height',
				'weight',
				'life_span',
				'reference_image_id',
			],
			include: [
				{
					model: Temperament,
					attributes: ['name'],
					through: { attributes: [] },
				},
			],
		});
		if (!dog) {
			return res.status(204).json({ message: 'Search result not found' });
		}
		return res.status(200).json(dog);
	} else {
		return res.status(400).json({ message: 'Bad Request' });
	}
};
