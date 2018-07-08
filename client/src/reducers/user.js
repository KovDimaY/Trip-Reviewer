import {
    USER_LOGIN,
    USER_AUTH
} from '../constants/action-names';

export default function(state = {}, action) {
    switch (action.type) {
        case USER_LOGIN:
        case USER_AUTH:
            return { ...state, login: action.payload };
        default:
            return state;
    }
}