import {
    USER_LOGIN,
    USER_AUTH,
    GET_USER_REVIEWS
} from '../constants/action-names';

export default function(state = {}, action) {
    switch (action.type) {
        case USER_LOGIN:
        case USER_AUTH:
            return { ...state, login: action.payload };
        case GET_USER_REVIEWS:
            return { ...state, userPosts: action.payload };
        default:
            return state;
    }
}