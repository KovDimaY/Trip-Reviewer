import * as routes from './routes';

export const home = 'HOME';
export const userProfile = 'USER_PROFILE';
export const signup = 'SIGNUP';
export const login = 'LOGIN';
export const userReviews = 'USER_REVIEWS';
export const addTrip = 'ADD_TRIP';
export const logout = 'LOGOUT';

const items = {
  [home]: {
    id: 1,
    icon: 'home',
    text: 'Home',
    link: routes.HOME,
    restricted: false,
  },
  [userProfile]: {
    id: 2,
    icon: 'user',
    text: 'Profile',
    link: routes.USER_PROFILE,
    restricted: true,
  },
  [signup]: {
    id: 3,
    icon: 'user-plus',
    text: 'Signup',
    link: routes.REGISTER,
    restricted: false,
    exclude: true,
  },
  [login]: {
    id: 4,
    icon: 'sign-in-alt',
    text: 'Login',
    link: routes.LOGIN,
    restricted: false,
    exclude: true,
  },
  [userReviews]: {
    id: 5,
    icon: 'edit',
    text: 'Edit',
    link: routes.USER_REVIEWS,
    restricted: true,
  },
  [addTrip]: {
    id: 6,
    icon: 'file-alt',
    text: 'Add',
    link: routes.ADD_TRIP,
    restricted: true,
  },
  [logout]: {
    id: 7,
    icon: 'sign-out-alt',
    text: 'Logout',
    link: routes.LOGOUT,
    restricted: true,
  },
};

export default items;
