import {
	LOADING_DOGS,
	SET_DOGS,
	SET_TOTAL_RESULTS,
	SET_PAGE,
	SET_BREED,
	SET_ORDER,
	SET_ORDER_BY
} from './types';
import axios from 'axios';

const URL_MY_API = 'http://localhost:3001/api';

export function setBreed(payload) {
	return { type: SET_BREED, payload: payload };
}

export function setOrder(payload) {
	return { type: SET_ORDER, payload: payload };
}

export function setOrderBy(payload) {
	return { type: SET_ORDER_BY, payload: payload };
}

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

export function getDogs({ breed, page, order, orderBy }) {
	return (dispatch) => {
		let URL = `${URL_MY_API}/dogs?page=${page}&order=${order}&orderBy=${orderBy}`;
		if (breed !== '') {
			URL = `${URL_MY_API}/dogs?name=${breed}&page=${page}&order=${order}&orderBy=${orderBy}`;
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
