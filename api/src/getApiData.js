const axios = require('axios');
const { Breed_group, Dog, Temperament } = require('./db');
const { API_KEY } = process.env;
const {
	parceTemps,
	parceBreedGroups,
	builderDog,
	findOrCreate,
} = require('./utils');

module.exports = async () => {
	axios
		.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
		.then(async (response) => {
			const dogs = response.data;
			for (let dog in dogs) {
				let dogTemperamentsIds = [];
				if (dogs[dog].temperament) {
					const dogTemperaments = parceTemps(dogs[dog]);
					for (let i in dogTemperaments) {
						const [temperamentTarget] = await findOrCreate(Temperament, {
							name: dogTemperaments[i],
						});
						dogTemperamentsIds.push(temperamentTarget.id);
					}
				}
				let dogBreedGroupIds = [];
				if (dogs[dog].breed_group) {
					const dogBreedGroups = parceBreedGroups(dogs[dog]);
					for (let i in dogBreedGroups) {
						const [breedGroupsTarget] = await findOrCreate(Breed_group, {
							name: dogBreedGroups[i],
						});
						dogBreedGroupIds.push(breedGroupsTarget.id);
					}
				}
				const [dogTarget] = await findOrCreate(Dog, builderDog(dogs[dog]));
				dogTarget.setTemperaments(dogTemperamentsIds);
				dogTarget.setBreed_groups(dogBreedGroupIds);
			}
		})
		.catch((error) => {
			console.log(error);
		});
};
