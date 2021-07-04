import { CHECK_ACCEPT } from '../action/types';

const initialState = {
	check: false,
};

export default function global(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case CHECK_ACCEPT:
			return {
				...state,
				check: payload,
			};
		default:
			return state;
	}
}