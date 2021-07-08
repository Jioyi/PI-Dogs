const { Temperament, Dog } = require('../db');
const { Op } = require('sequelize');
const { findAll, findOne, isInt } = require('../utils');

const pageLimit = 8;

exports.getDogs = async (req, res, next) => {
	try {
		let currentPage = 1;
		let { name, page, order, orderBy } = req.query;

		let orderSelected = 'ASC';
		if (order && order === 'DESC') orderSelected = 'DESC';

		let orderBySelected = 'name';
		if (orderBy && orderBy === 'weight') orderBySelected = 'weight.metric';

		page = parseInt(page);
		if (page && isInt(page)) currentPage = page;

		if (name) {
			let paginationTotal = await findAll(Dog, {
				where: {
					name: { [Op.iLike]: `%${name}%` },
				},
				attributes: ['name'],
			});
			let offset = (currentPage - 1) * 8;
			let dogs = await findAll(Dog, {
				offset: offset,
				limit: pageLimit,
				where: {
					name: { [Op.iLike]: `%${name}%` },
				},
				attributes: ['name', 'id', 'image', 'weight'],
				order: [[orderBySelected, orderSelected]],
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
			return dogs.length !== 0
				? res.json({ dogs: dogs, totalResults: paginationTotal.length })
				: res.status(404).json({ message: 'Search result not found' });
		} else {
			let paginationTotal = await findAll(Dog, {
				attributes: ['name'],
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
			let offset = (currentPage - 1) * 8;
			let dogs = await findAll(Dog, {
				offset: offset,
				limit: pageLimit,
				attributes: ['name', 'id', 'image', 'weight'],
				order: [[orderBySelected, orderSelected]],
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
			return dogs.length !== 0
				? res.json({ dogs: dogs, totalResults: paginationTotal.length })
				: res.status(404).json({ message: 'Search result not found' });
		}
	} catch (error) {
		next(error);
	}
};

exports.getDogForId = async (req, res, next) => {
	try {
		const id = parseInt(req.params.id);
		if (id) {
			let dog = await findOne(Dog, {
				where: { id: id },
				attributes: ['id', 'name', 'height', 'weight', 'life_span', 'image'],
				include: [
					{
						model: Temperament,
						attributes: ['name'],
						through: { attributes: [] },
					},
				],
			});
			return dog
				? res.json(dog)
				: res.status(404).json({ message: 'Search result not found' });
		} else {
			return res.status(404).json({ message: 'Bad Request' });
		}
	} catch (error) {
		next(error);
	}
};
