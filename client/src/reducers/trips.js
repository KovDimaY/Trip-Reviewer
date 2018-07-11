import {
    GET_TRIPS,
    GET_TRIP_W_REVIEWER,
    CLEAR_TRIP_W_REVIEWER,
    ADD_TRIP,
    CLEAR_NEW_TRIP
} from '../constants/action-names';

export default function(state = {}, action) {
    switch (action.type) {
        case GET_TRIPS:
            return { ...state, list: action.payload };
        case GET_TRIP_W_REVIEWER:
        case CLEAR_TRIP_W_REVIEWER:
            return {
                ...state,
                current: action.payload.trip,
                reviewer: action.payload.reviewer
            };
        case ADD_TRIP:
        case CLEAR_NEW_TRIP:
            return { ...state, newtrip: action.payload }
        default:
            return state;
    }
}