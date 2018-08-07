import {
    USER_LOGIN,
    USER_AUTH,
    GET_USERS,
    GET_USER_REVIEWS,
    USER_REGISTER
} from './../../constants/action-names';
import reducer from './../users';


describe('users reducer', () => {
    it('handles actions of unknown type', () => {
        const action = {
            type: 'THIS IS UNKNOWN TYPE',
            payload: 'test'
        };
        const expected = {};

        const newState = reducer(undefined, action);

        expect(newState).toEqual(expected);
    });

    it('handles actions of type USER_LOGIN', () => {
        const initialState = {};
        const action = {
            type: USER_LOGIN,
            payload: 'test'
        };
        const expected = {
            login: 'test'
        };

        const newState = reducer(initialState, action);

        expect(newState).toEqual(expected);
    });

    it('handles actions of type USER_AUTH', () => {
        const initialState = {};
        const action = {
            type: USER_AUTH,
            payload: 'test'
        };
        const expected = {
            login: 'test'
        };

        const newState = reducer(initialState, action);

        expect(newState).toEqual(expected);
    });

    it('handles actions of type GET_USERS', () => {
        const initialState = {};
        const action = {
            type: GET_USERS,
            payload: 'test'
        };
        const expected = {
            users: 'test'
        };

        const newState = reducer(initialState, action);

        expect(newState).toEqual(expected);
    });

    it('handles actions of type GET_USER_REVIEWS', () => {
        const initialState = {};
        const action = {
            type: GET_USER_REVIEWS,
            payload: 'test'
        };
        const expected = {
            userPosts: 'test'
        };

        const newState = reducer(initialState, action);

        expect(newState).toEqual(expected);
    });

    it('handles actions of type USER_REGISTER', () => {
        const initialState = {};
        const action = {
            type: USER_REGISTER,
            payload: {
                success: 'success'
            }
        };
        const expected = {
            register: 'success',
            login: { isAuth: 'success' }
        };

        const newState = reducer(initialState, action);

        expect(newState).toEqual(expected);
    });
});