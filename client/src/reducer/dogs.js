import { SET_DOGS, LOADING_DOGS } from '../actions/types';

const initialState = {
	list: [],
	loading: true,
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
		default:
			return state;
	}
}
