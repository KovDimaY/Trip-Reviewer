import axios from 'axios';

import {
    GET_TRIPS,
    GET_TRIP_W_REVIEWER,
    CLEAR_TRIP_W_REVIEWER
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

export function clearTripWithReviewer() {
    return {
        type: CLEAR_TRIP_W_REVIEWER,
        payload: {
            trip: null,
            reviewer: null
        }
    };
}