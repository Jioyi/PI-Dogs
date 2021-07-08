import {
	SET_DOGS,
	LOADING_DOGS,
	SET_TOTAL_RESULTS,
	SET_PAGE,
	SET_BREED,
	SET_ORDER,
	SET_ORDER_BY,
} from '../actions/types';

const initialState = {
	list: [],
	loading: true,
	totalResults: 0,
	page: 1,
	breed: '',
	order: 'ASC',
	orderBy: 'name',
};

export default function dogs(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case SET_BREED:
			return {
				...state,
				breed: payload,
			};
		case SET_ORDER_BY:
			return {
				...state,
				orderBy: payload,
			};
		case SET_ORDER:
			return {
				...state,
				order: payload,
			};
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
		default:
			return state;
	}
}
