const URL_MY_API = 'http://localhost:3001/api';

async function getDogs() {
	const requestOptions = {
		method: 'GET',
	};
	return await fetch(`${URL_MY_API}/dogs/`, requestOptions).then(
		handleResponse
	);
}

async function getDogsForBreed(breed) {
	const requestOptions = {
		method: 'GET',
	};
	return await fetch(`${URL_MY_API}/dogs?name=${breed}`, requestOptions).then(
		handleResponse
	);
}

function handleResponse(response) {
	return response.text().then((text) => {
		return text && JSON.parse(text);
	});
}

export const service = {
	getDogs,
	getDogsForBreed,
};
