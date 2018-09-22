import {
    GET_TRIPS,
    GET_TRIP,
    GET_TRIP_W_REVIEWER,
    CLEAR_TRIP_W_REVIEWER,
    ADD_TRIP,
    UPDATE_TRIP,
    DELETE_TRIP,
    CLEAR_TRIP,
    CLEAR_NEW_TRIP
} from './../constants/action-names';

export default function(state = {}, action) {
    switch (action.type) {
        case GET_TRIPS:
            return { ...state, list: action.payload };
        case GET_TRIP:
            return { ...state, trip: action.payload };
        case UPDATE_TRIP:
            return {
                ...state,
                updateTrip: action.payload.success,
                trip: action.payload.doc
            };
        case DELETE_TRIP:
            return {
                ...state,
                postDeleted: action.payload
            };
        case CLEAR_TRIP:
            return {
                ...state,
                updateTrip: action.payload.updateTrip,
                trip: action.payload.trip,
                postDeleted: action.payload.postDeleted
            }
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