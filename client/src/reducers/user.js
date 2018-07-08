import {
    USER_LOGIN
} from '../constants/action-names';

export default function(state = {}, action) {
    switch (action.type) {
        case USER_LOGIN:
            return { ...state, login: action.payload };
        default:
            return state;
    }
}