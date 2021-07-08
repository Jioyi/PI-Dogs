function isInt(number) {
	if (isNaN(number)) {
		return false;
	} else {
		if (number % 1 == 0) {
			return true;
		} else {
			return false;
		}
	}
}

function findAll(dbModel, attributes) {
	return new Promise(function (resolve, reject) {
		dbModel
			.findAll(attributes)
			.then((data) => {
				resolve(data);
			})
			.catch((err) => reject(err));
	});
}

function findOne(dbModel, attributes) {
	return new Promise(function (resolve, reject) {
		dbModel
			.findOne(attributes)
			.then((data) => {
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

function builderDog(dog) {
	return (newDog = {
		name: dog.name,
		height: dog.height,
		weight: dog.weight,
		life_span: dog.life_span,
		external_api_id: dog.id,
		image: dog.image.url,
	});
}

function findOrCreate(dbModel, where) {
	return new Promise(function (resolve, reject) {
		dbModel
			.findOrCreate({ where: where })
			.then((data) => resolve(data))
			.catch((err) => reject(err));
	});
}

function parceTemps(dog) {
	return dog.temperament.replace(/ /g, '').split(',');
}

function parceBreedGroups(dog) {
	let dogBreedGroups = dog.breed_group.split(',');
	return dogBreedGroups.map((item) => {
		if (item.indexOf(' ') === 0) item = item.substr(1);
		return item;
	});
}

module.exports = {
	findAll,
	findOne,
	create,
	builderDog,
	findOrCreate,
	parceTemps,
	parceBreedGroups,
	isInt,
};
