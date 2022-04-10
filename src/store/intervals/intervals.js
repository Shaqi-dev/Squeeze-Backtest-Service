import { combineReducers } from "redux";

const SET_ACTIVITY = "SET_ACTIVITY";
const SET_RANGE = "SET_RANGE";
const SET_CONFIGS = "SET_CONFIGS";
const SET_MAXBARS = "SET_MAXBARS";
const GET_STATE = 'GET_STATE';

export const setActivity = (interval, value) => ({
	type: SET_ACTIVITY,
	interval,
	value,
});
export const setRange = (interval, value) => ({
	type: SET_RANGE,
	interval,
	value,
});
export const setConfigs = (interval, value) => ({
	type: SET_CONFIGS,
	interval,
	value,
});
export const setMaxBars = (interval, value) => ({
	type: SET_MAXBARS,
	interval,
	value,
});

export const getState = () => ({
	type: GET_STATE
})

const defaultIntervals = {
	"1m": {
		active: false,
		range: "last48h",
		configs: "configsHR",
		maxBars: 15,
	},
	"3m": {
		active: false,
		range: "last48h",
		configs: "configsHR",
		maxBars: 10,
	},
	"5m": {
		active: false,
		range: "last72h",
		configs: "configsMR",
		maxBars: 12,
	},
	"15m": {
		active: false,
		range: "last72h",
		configs: "configsMR",
		maxBars: 8,
	},
};

const intervals = (state = defaultIntervals, action) => {
	switch (action.type) {
		case SET_ACTIVITY:
			console.log(action.value)
			return {
				...state,
				[action.interval]: {
					...state[action.interval],
					active: action.value	
				},
			};
        case SET_RANGE:
            return {
                ...state,
                [action.interval]: {
                    ...state[action.interval],
                    range: action.value
                },
            };
		case SET_CONFIGS:
			return {
				...state,
				[action.interval]: {
					...state[action.interval],
					configs: action.value
				},
			};
		case SET_MAXBARS:
			return {
				...state,
				[action.interval]: {
					...state[action.interval],
					maxBars: +action.value
				},
			};
		case GET_STATE:
			return {
				...state
			};
		default:
			return state;
	}
};

const intervalsApp = combineReducers({
    intervals
})

export default intervalsApp;