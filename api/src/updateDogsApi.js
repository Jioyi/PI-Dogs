const axios = require('axios');
const { Dog, Temperament } = require('./db');

module.exports = async () => {
	const temperaments = [];
	const temps = await findTemps(Temperament, ['name']);
	for (i in temps) temperaments.push(temps[i].name);

	axios
		.get('https://api.thedogapi.com/v1/breeds')
		.then(async function (response) {
			const dogs = response.data;
			for (dog in dogs) {
				const dogT = await updateOrCreateDog(Dog, dogs[dog]);
				if (dogs[dog].temperament) {
					const dogTs = dogs[dog].temperament.replace(/ /g, '').split(',');
					for (i in dogTs) {
						if (!temperaments.includes(dogTs[i])) {
							const newTemp = await addTemperament(Temperament, dogTs[i]);
							temperaments.push(newTemp.name);
						}
					}
				}
			}
		})
		.catch(function (error) {
			console.log(error);
		});
};

function updateOrCreateDog(dbD, dog) {
	return new Promise(function (resolve, reject) {
		dbD
			.findOne({ where: { external_api_id: dog.id } })
			.then(async (data) => {
				if (!data) {
					let newdog = await createDog(dbD, dog);
					resolve(newdog);
				}
				resolve(data);
			})
			.catch((err) => reject(err));
	});
}

function createDog(dbD, dog) {
	return new Promise(function (resolve, reject) {
		const newdog = {
			name: dog.name,
			height: JSON.stringify(dog.height),
			weight: JSON.stringify(dog.weight),
			life_span: JSON.stringify(dog.life_span),
			external_api_id: dog.id,
			/*breed_group: JSON.stringify(dogs[dog].breed_group),
			bred_for: JSON.stringify(dogs[dog].bred_for),
			origin: JSON.stringify(dogs[dog].origin),
			reference_image_id: JSON.stringify(dogs[dog].reference_image_id),
			*/
		};
		dbD
			.create(newdog)
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

function findTemps(dbT, attributes) {
	return new Promise(function (resolve, reject) {
		dbT
			.findAll({ attributes: attributes })
			.then((data) => {
				resolve(data);
			})
			.catch((err) => reject(err));
	});
}
