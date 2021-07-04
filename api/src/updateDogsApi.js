const axios = require('axios');
const { Dog, Temperament } = require('./db');
const { API_KEY } = process.env;
module.exports = async () => {
	const temperaments =  await findAll(Temperament, ['name', 'id']);
	axios
		.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
		.then(async function (response) {
			const dogs = response.data;
			for (dog in dogs) {
				let dogTsIds = [];
				if (dogs[dog].temperament) {
					const dogTs = dogs[dog].temperament.replace(/ /g, '').split(',');
					for (i in dogTs) {
						let currentTemp = temperaments.find((obj) => {
							if (obj.name === dogTs[i]) return obj.id;
						});
						if (!currentTemp) {
							const newTemp = await addTemperament(Temperament, dogTs[i]);
							temperaments.push({
								id: newTemp.id,
								name: newTemp.name,
							});
							dogTsIds.push(newTemp.id);
						} else {
							dogTsIds.push(currentTemp.id);
						}
					}
				}
				const newdog = {
					name: dogs[dog].name,
					height: dogs[dog].height,
					weight: dogs[dog].weight,
					life_span: dogs[dog].life_span,
					external_api_id: dogs[dog].id,
					/*breed_group: JSON.stringify(dogs[dog].breed_group),
					bred_for: JSON.stringify(dogs[dog].bred_for),
					origin: JSON.stringify(dogs[dog].origin),
					reference_image_id: JSON.stringify(dogs[dog].reference_image_id),
					*/
				};
				const dogT = await updateOrCreateDog(Dog, newdog);
				dogT.setTemperaments(dogTsIds);
			}
		})
		.catch(function (error) {
			console.log(error);
		});
};

function updateOrCreateDog(dbModel, dog) {
	return new Promise(function (resolve, reject) {
		dbModel
			.findOne({ where: { external_api_id: dog.external_api_id } })
			.then(async (data) => {
				if (!data) {
					let newdog = await createDog(dbModel, dog);
					resolve(newdog);
				}
				resolve(data);
			})
			.catch((err) => reject(err));
	});
}

function createDog(dbD, dog) {
	return new Promise(function (resolve, reject) {
		dbD
			.create(dog)
			.then((data) => resolve(data))
			.catch((err) => reject(err));
	});
}

function addTemperament(dbT, name) {
	return new Promise(function (resolve, reject) {
		dbT
			.create({ name: name })
			.then((data) => resolve(data))
			.catch((err) => reject(err));
	});
}

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
