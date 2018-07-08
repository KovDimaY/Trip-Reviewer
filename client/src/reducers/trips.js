import {
    GET_TRIPS
} from '../constants/action-names';

export default function(state = {}, action) {
    switch (action.type) {
        case GET_TRIPS:
            return { ...state, list: action.payload }
        default:
            return state;
    }
}