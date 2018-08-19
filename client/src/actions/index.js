import axios from 'axios';

import {
    GET_TRIPS,
    GET_USERS,
    GET_TRIP_W_REVIEWER,
    CLEAR_TRIP_W_REVIEWER,
    USER_REGISTER,
    USER_LOGIN,
    RESET_PASSWORD,
    USER_AUTH,
    ADD_TRIP,
    UPDATE_TRIP,
    DELETE_TRIP,
    GET_TRIP,
    CLEAR_NEW_TRIP,
    CLEAR_TRIP,
    GET_USER_REVIEWS
} from '../constants/action-names';

export function getTrips(
    limit = 10,
    start = 0,
    order = 'asc',
    list = []
) {
    const request = axios
        .get(`/api/getManyTrips?limit=${limit}&skip=${start}&order=${order}`);

    return (dispatch) => {
        return request.then((response) => {
            dispatch({
                type: GET_TRIPS,
                payload: [...list, ...response.data]
            });
        });
    }
}

export function getTripWithReviewer(id) {
    const request = axios.get(`/api/getTrip?id=${id}`);

    return (dispatch) => {
        return request.then(({ data }) => {
            const trip = data;

            return axios
                .get(`/api/getReviewer?id=${trip.ownerId}`)
                .then(({ data }) => {
                    const response = {
                        trip,
                        reviewer: data
                    };

                    dispatch({
                        type: GET_TRIP_W_REVIEWER,
                        payload: response
                    });
                });
        });
    };
}

export function getUserReviews(userId) {
    const request = axios
        .get(`/api/getUserReviews?user=${userId}`);

    return (dispatch) => {
        return request.then((response) => {
            dispatch({
                type: GET_USER_REVIEWS,
                payload: response.data
            });
        });
    }
}

export function getTrip(id) {
    const request = axios.get(`/api/getTrip?id=${id}`);

    return (dispatch) => {
        return request.then((response) => {
            dispatch({
                type: GET_TRIP,
                payload: response.data
            });
        });
    }
}

export function updateTrip(data) {
    const request = axios.post(`/api/tripUpdate`, data);

    return (dispatch) => {
        return request.then((response) => {
            dispatch({
                type: UPDATE_TRIP,
                payload: response.data
            });
        });
    }
}

export function deleteTrip(id) {
    const request = axios
        .delete(`/api/tripDelete?id=${id}`);

    return (dispatch) => {
        return request.then((response) => {
            dispatch({
                type: DELETE_TRIP,
                payload: response.data
            });
        });
    }
}

export function clearTrip() {
    return {
        type: CLEAR_TRIP,
        payload: {
            trip: null,
            updateTrip: false,
            postDeleted: false
        }
    }
}

export function clearTripWithReviewer() {
    return {
        type: CLEAR_TRIP_W_REVIEWER,
        payload: {
            trip: null,
            reviewer: null
        }
    };
}

export function loginUser({ email, password }) {
    const request = axios
        .post('/api/login', { email, password });

    return (dispatch) => {
        return request.then((response) => {
            dispatch({
                type: USER_LOGIN,
                payload: response.data
            });
        });
    }
}

export function resetPassword({ email }) {
    const request = axios
        .post('/api/resetPassword', { email });

    return (dispatch) => {
        return request.then((response) => {
            dispatch({
                type: RESET_PASSWORD,
                payload: response.data
            });
        });
    }
}

export function auth() {
    const request = axios.get('/api/auth');

    return (dispatch) => {
        return request.then((response) => {
            dispatch({
                type: USER_AUTH,
                payload: response.data
            });
        });
    }
}

export function addTrip(trip) {
    const request = axios.post('/api/trip', trip);

    return (dispatch) => {
        return request.then((response) => {
            dispatch({
                type: ADD_TRIP,
                payload: response.data
            });
        });
    }
}

export function clearNewTrip() {
    return {
        type: CLEAR_NEW_TRIP,
        payload: null
    };
}

export function getUsers() {
    const request = axios.get(`/api/users`);

    return (dispatch) => {
        return request.then((response) => {
            dispatch({
                type: GET_USERS,
                payload: response.data
            });
        });
    }
}

export function userRegister(user) {
    const request = axios.post(`/api/register`, user);

    return (dispatch) => {
        return request.then(({ data }) => {
            const response = {
                success: data.success
            };

            dispatch({
                type: USER_REGISTER,
                payload: response
            });
        })
    }
}