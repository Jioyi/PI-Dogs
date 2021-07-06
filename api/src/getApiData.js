const axios = require('axios');
const { Breed_group, Dog, Temperament } = require('./db');
const { API_KEY } = process.env;
module.exports = async () => {
	let temperaments = await findAll(Temperament, ['name', 'id']);
	let breed_group = await findAll(Breed_group, ['name', 'id']);
	axios
		.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
		.then(async (response) => {
			const dogs = response.data;
			for (let dog in dogs) {
				let dogTemperamentsIds = [];
				if (dogs[dog].temperament) {
					const dogTemperaments = dogs[dog].temperament
						.replace(/ /g, '')
						.split(',');
					for (let i in dogTemperaments) {
						const Temp = getFindId(temperaments, 'name', dogTemperaments[i]);
						if (Temp) {
							dogTemperamentsIds.push(Temp.id);
						} else {
							const newTemperament = await create(Temperament, {
								name: dogTemperaments[i],
							});
							temperaments.push({
								id: newTemperament.id,
								name: newTemperament.name,
							});
							dogTemperamentsIds.push(newTemperament.id);
						}
					}
				}

				const dogBreedGroupIds = [];
				if (dogs[dog].breed_group) {
					const dogBreedGroups = dogs[dog].breed_group.split(',');
					for (let i in dogBreedGroups) {
						if (dogBreedGroups[i].indexOf(' ') === 0)
							dogBreedGroups[i] = dogBreedGroups[i].substr(1);
						const Breed = getFindId(breed_group, 'name', dogBreedGroups[i]);
						if (Breed) {
							dogBreedGroupIds.push(Breed.id);
						} else {
							const newBreedGroup = await create(Breed_group, {
								name: dogBreedGroups[i],
							});
							breed_group.push({
								id: newBreedGroup.id,
								name: newBreedGroup.name,
							});
							dogBreedGroupIds.push(newBreedGroup.id);
						}
					}
				}
				const dogTarget = await createOrGetDog(Dog, builderDog(dogs[dog]));
				dogTarget.setTemperaments(dogTemperamentsIds);
				dogTarget.setBreed_groups(dogBreedGroupIds);
			}
		})
		.catch((error) => {
			console.log(error);
		});
};

function createOrGetDog(dbModel, dog) {
	return new Promise(function (resolve, reject) {
		dbModel
			.findOne({ where: { external_api_id: dog.external_api_id } })
			.then(async (data) => {
				if (!data) {
					let newDog = await create(dbModel, dog);
					resolve(newDog);
				}
				resolve(data);
			})
			.catch((err) => reject(err));
	});
}

function create(dbModel, atributes) {
	return new Promise(function (resolve, reject) {
		dbModel
			.create(atributes)
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

function builderDog(dog) {
	return (newDog = {
		name: dog.name,
		height: dog.height,
		weight: dog.weight,
		life_span: dog.life_span,
		external_api_id: dog.id,
		reference_image_id: dog.reference_image_id,
	});
}

function getFindId(array, element, value) {
	let x = array.find((obj) => {
		if (obj[element] === value) return obj.id;
	});
	return x;
}

