import axios from 'axios';

import {
    GET_TRIPS,
    GET_TRIP_W_REVIEWER,
    CLEAR_TRIP_W_REVIEWER,
    USER_LOGIN,
    USER_AUTH,
    ADD_TRIP,
    CLEAR_NEW_TRIP,
    GET_USER_REVIEWS
} from '../constants/action-names';

export function getTrips(
    limit = 10,
    start = 0,
    order = 'asc',
    list = []
) {
    const request = axios
        .get(`/api/getManyTrips?limit=${limit}&skip=${start}&order=${order}`)
        .then(response => [...list, ...response.data]);

    return {
        type: GET_TRIPS,
        payload: request
    };
}

export function getTripWithReviewer(id) {
    const request = axios.get(`/api/getTrip?id=${id}`);

    return (dispatch) => {
        request.then(({ data }) => {
            const trip = data;

            axios
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
        .get(`/api/getUserReviews?user=${userId}`)
        .then(response => response.data);

    return {
        type: GET_USER_REVIEWS,
        payload: request
    };
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
        .post('/api/login',{ email, password })
        .then(response => response.data);

    return {
        type: USER_LOGIN,
        payload: request
    };
}

export function auth() {
    const request = axios
        .get('/api/auth')
        .then(response => response.data);

    return {
        type: USER_AUTH,
        payload: request
    }
}

export function addTrip(trip) {
    const request = axios
        .post('/api/trip', trip)
        .then(response => response.data);

    return {
        type: ADD_TRIP,
        payload: request
    };
}

export function clearNewTrip() {
    return {
        type: CLEAR_NEW_TRIP,
        payload: null
    };
}