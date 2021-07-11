import {
	SET_DOGS,
	LOADING_DOGS,
	SET_TOTAL_RESULTS,
	SET_PAGE,
	SET_TEMPERAMENTS,
	SET_BREED_GROUPS,
	SET_DOG,
} from '../actions/types';

const initialState = {
	list: [],
	loading: true,
	totalResults: 0,
	page: 1,
	temperaments: [],
	breedGroups: [],
	dog: null,
};

export default function dogs(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case SET_DOGS:
			return {
				...state,
				list: payload,
			};
		case LOADING_DOGS:
			return {
				...state,
				loading: payload,
			};
		case SET_TOTAL_RESULTS:
			return {
				...state,
				totalResults: payload,
			};
		case SET_PAGE:
			return {
				...state,
				page: payload,
			};
		case SET_TEMPERAMENTS:
			return {
				...state,
				temperaments: payload,
			};
		case SET_BREED_GROUPS:
			return {
				...state,
				breedGroups: payload,
			};
		case SET_DOG:
			return {
				...state,
				dog: payload,
			};
		default:
			return state;
	}
}
