import {
  USER_LOGIN,
  USER_AUTH,
  GET_USERS,
  UPDATE_USER,
  GET_USER_REVIEWS,
  USER_REGISTER,
  RESET_PASSWORD,
} from '../constants/action-names';

export default function (state = {}, action) {
  switch (action.type) {
    case USER_LOGIN:
    case USER_AUTH:
      return { ...state, login: action.payload };
    case RESET_PASSWORD:
      return { ...state, reset: action.payload };
    case GET_USERS:
      return { ...state, users: action.payload };
    case UPDATE_USER:
      return { ...state, userUpdate: action.payload };
    case GET_USER_REVIEWS:
      return { ...state, userPosts: action.payload };
    case USER_REGISTER:
      return {
        ...state,
        register: action.payload,
        login: { isAuth: action.payload.success },
      };
    default:
      return state;
  }
}
