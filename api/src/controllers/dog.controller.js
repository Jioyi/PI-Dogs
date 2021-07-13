const { Temperament, Dog } = require('../db');
const { create, findOrCreate, findOne } = require('../utils');

exports.createDog = async (req, res, next) => {
	try {
		let {
			name,
			heightMin,
			heightMax,
			weightMin,
			weightMax,
			lifeSpan,
			image,
			temperaments,
		} = req.body;

		if (name && heightMin && heightMax && weightMin && weightMax) {
			if (lifeSpan) {
				lifeSpan += ' years';
			} else {
				lifeSpan = "";
			}
			if (!image) {
				image =
					'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Dog.svg/1200px-Dog.svg.png';
			}
			if (!temperaments) {
				temperaments = [];
			}
			let heightJSONB = {
				metric: heightMin + ' - ' + heightMax,
				imperial:
					Math.floor(parseInt(heightMin) * 0.39) +
					' - ' +
					Math.floor(parseInt(heightMax) * 0.39),
			};
			let weightJSONB = {
				metric: weightMin + ' - ' + weightMax,
				imperial:
					Math.floor(parseInt(weightMin) * 2.2) +
					' - ' +
					Math.floor(parseInt(weightMax) * 2.2),
			};

			let exist = await findOne(Dog, {
				where: {
					name: name,
				},
			});
			if (!exist) {
				let dog = await create(Dog, {
					name: name,
					height: heightJSONB,
					weight: weightJSONB,
					life_span: lifeSpan,
					image: image,
				});
	
				let dogTemperamentsIds = [];
				for (let i in temperaments) {
					const [temperamentTarget] = await findOrCreate(Temperament, {
						name: temperaments[i],
					});
					dogTemperamentsIds.push(temperamentTarget.id);
				}
				dog.setTemperaments(dogTemperamentsIds);	
				return dog ? res.status(200).json(dog) : res.status(404).json({ message: 'error' });
			} else {
				return res.status(406).json({ message: 'That race already exists!' });
			}
		} else {
			return res.status(404).json({ message: 'Bad Request' });
		}
	} catch (error) {
		next(error);
	}
};
