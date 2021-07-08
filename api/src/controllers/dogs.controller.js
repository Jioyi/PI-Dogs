const { Breed_group, Temperament, Dog } = require('../db');
const { Op } = require('sequelize');
const { findAll, findOne, isInt } = require('../utils');

const pageLimit = 8;

exports.getDogs = async (req, res, next) => {
	try {
		let currentPage = 1;
		let { name, page, order, orderBy, filter, filterBy } = req.query;

		let filterName = {};
		if (name) {
			filterName = { name: { [Op.iLike]: `%${name}%` } };
		}

		if (page) page = parseInt(page);
		if (isInt(page)) currentPage = page;

		let orderSelected = 'ASC';
		if (order && order === 'DESC') orderSelected = 'DESC';

		let orderBySelected = 'name';
		if (orderBy && orderBy === 'weight') orderBySelected = 'weight.metric';

		let includeBreedGroup = {
			model: Breed_group,
			attributes: ['name'],
			through: {
				attributes: [],
			},
		};

		let includeTemperament = {
			model: Temperament,
			attributes: ['name'],
			through: {
				attributes: [],
			},
		};

		if (filterBy === 'breed_group') {
			if (filter && filter !== 'All') {
				includeBreedGroup = {
					model: Breed_group,
					attributes: ['name'],
					where: {
						name: filter,
					},
					through: {
						attributes: [],
					},
				};
			}
		} else {
			if (filter && filter !== 'All') {
				includeTemperament = {
					model: Temperament,
					attributes: ['name'],
					where: {
						name: filter,
					},
					through: {
						attributes: [],
					},
				};
			}
		}

		let include = [includeBreedGroup, includeTemperament];

		let paginationTotal = await findAll(Dog, {
			where: filterName,
			attributes: ['name', 'id', 'image', 'weight'],
			order: [[orderBySelected, orderSelected]],
			include: include,
		});

		let offset = (currentPage - 1) * pageLimit;

		let dogs = await findAll(Dog, {
			limit: pageLimit,
			offset: offset,
			where: filterName,
			attributes: ['name', 'id', 'image', 'weight'],
			order: [[orderBySelected, orderSelected]],
			include: include,
		});

		return dogs.length !== 0
			? res.json({ dogs: dogs, totalResults: paginationTotal.length })
			: res.status(404).json({ message: 'Search result not found' });
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
