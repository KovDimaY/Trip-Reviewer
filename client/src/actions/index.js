import axios from 'axios';

import {
    GET_TRIPS
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