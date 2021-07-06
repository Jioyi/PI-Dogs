import { LOADING_DOGS, SET_DOGS } from './types';

import { service } from '../services';

export function loading(payload) {
	return { type: LOADING_DOGS, payload: payload };
}

export function setDogs(payload) {
	return {
		type: SET_DOGS,
		payload: payload,
	};
}

export function getDogs() {
	return (dispatch) => {
		dispatch(loading(true));
		service.getDogs().then(
			(response) => {
				if(response.message) {					
					dispatch(setDogs([]));
				} else {
					dispatch(setDogs(response));					
				}
				dispatch(loading(false));
			},
			(_error) => {
				dispatch(loading(false));
			}
		);
	};
}

export function getDogsForBreed(breed) {
	return (dispatch) => {
		dispatch(loading(true));
		service.getDogsForBreed(breed).then(
			(response) => {
				if(response.message) {					
					dispatch(setDogs([]));
				} else {
					dispatch(setDogs(response));					
				}
				dispatch(loading(false));
			},
			(_error) => {
				dispatch(loading(false));
			}
		);
	};
}
