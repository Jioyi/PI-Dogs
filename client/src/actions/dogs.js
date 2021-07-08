import {
	LOADING_DOGS,
	SET_DOGS,
	SET_TOTAL_RESULTS,
	SET_PAGE,
	SET_TEMPERAMENTS,
	SET_BREED_GROUPS,
} from './types';
import axios from 'axios';

const URL_MY_API = 'http://localhost:3001/api';

export function setPage(payload) {
	return { type: SET_PAGE, payload: payload };
}

export function loading(payload) {
	return { type: LOADING_DOGS, payload: payload };
}

export function setDogs(payload) {
	return {
		type: SET_DOGS,
		payload: payload,
	};
}

export function setTotalResults(payload) {
	return {
		type: SET_TOTAL_RESULTS,
		payload: payload,
	};
}

export function setTemperaments(payload) {
	return { type: SET_TEMPERAMENTS, payload: payload };
}

export function setBreedGroups(payload) {
	return { type: SET_BREED_GROUPS, payload: payload };
}

export function getDogs({ page ,breed, order, orderBy, filter, filterBy }) {
	return (dispatch) => {
		let URL = `${URL_MY_API}/dogs?page=${page}&order=${order}&orderBy=${orderBy}&filter=${filter}&filterBy=${filterBy}`;
		if (breed !== '') {
			URL = `${URL_MY_API}/dogs?name=${breed}&page=${page}&order=${order}&orderBy=${orderBy}&filter=${filter}&filterBy=${filterBy}`;
		}
		dispatch(loading(true));
		axios
			.get(URL)
			.then((response) => {
				dispatch(setTotalResults(response.data.totalResults));
				dispatch(setDogs(response.data.dogs));
				dispatch(loading(false));
			})
			.catch((error) => {
				if (error.response?.status) {
					if (error.response.status === 404) {
						dispatch(setTotalResults(0));
						dispatch(setDogs([]));
						dispatch(loading(false));
					}
				}
			});
	};
}

export function getTemperaments() {
	return (dispatch) => {
		let URL = `${URL_MY_API}/temperament`;
		axios
			.get(URL)
			.then((response) => {
				dispatch(setTemperaments(response.data));
			})
			.catch((error) => {
				if (error.response?.status) {
					if (error.response.status === 404) {
						dispatch(setTemperaments([]));
					}
				}
			});
	};
}

export function getBreedGroups() {
	return (dispatch) => {
		let URL = `${URL_MY_API}/breed_group`;
		axios
			.get(URL)
			.then((response) => {
				dispatch(setBreedGroups(response.data));
			})
			.catch((error) => {
				if (error.response?.status) {
					if (error.response.status === 404) {
						dispatch(setBreedGroups([]));
					}
				}
			});
	};
}
