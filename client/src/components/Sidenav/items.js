import * as routes from './../../constants/routes';

export const items = [
    {
        type: 'navItem',
        icon: 'home',
        text: 'Home',
        link: routes.HOME,
        restricted: false
    },
    {
        type: 'navItem',
        icon: 'user',
        text: 'My Profile',
        link: routes.USER_PROFILE,
        restricted: true
    },
    {
        type: 'navItem',
        icon: 'user-plus',
        text: 'Register',
        link: routes.REGISTER,
        restricted: false,
        exclude: true
    },
    {
        type: 'navItem',
        icon: 'sign-in-alt',
        text: 'Login',
        link: routes.LOGIN,
        restricted: false,
        exclude: true
    },
    {
        type: 'navItem',
        icon: 'file-alt',
        text: 'My reviews',
        link: routes.USER_REVIEWS,
        restricted: true
    },
    {
        type: 'navItem',
        icon: 'edit',
        text: 'Add reviews',
        link: routes.ADD_TRIP,
        restricted: true
    },
    {
        type: 'navItem',
        icon: 'sign-out-alt',
        text: 'Logout',
        link: routes.LOGOUT,
        restricted: true
    }
];