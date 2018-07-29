export const items = [
    {
        type: 'navItem',
        icon: 'home',
        text: 'Home',
        link: '/',
        restricted: false
    },
    {
        type: 'navItem',
        icon: 'user',
        text: 'My Profile',
        link: '/user',
        restricted: true
    },
    {
        type: 'navItem',
        icon: 'user-plus',
        text: 'Register',
        link: '/user/register',
        restricted: false,
        exclude: true
    },
    {
        type: 'navItem',
        icon: 'sign-in-alt',
        text: 'Login',
        link: '/login',
        restricted: false,
        exclude: true
    },
    {
        type: 'navItem',
        icon: 'file-alt',
        text: 'My reviews',
        link: '/user/user-reviews',
        restricted: true
    },
    {
        type: 'navItem',
        icon: 'edit',
        text: 'Add reviews',
        link: '/trip/add',
        restricted: true
    },
    {
        type: 'navItem',
        icon: 'sign-out-alt',
        text: 'Logout',
        link: '/user/logout',
        restricted: true
    }
];