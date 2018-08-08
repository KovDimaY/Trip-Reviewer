import {
    GET_TRIPS,
    GET_TRIP,
    GET_TRIP_W_REVIEWER,
    CLEAR_TRIP_W_REVIEWER,
    ADD_TRIP,
    UPDATE_TRIP,
    DELETE_TRIP,
    CLEAR_TRIP,
    CLEAR_NEW_TRIP
} from './../../constants/action-names';
import reducer from './../trips';


describe('trips reducer', () => {
    it('handles actions of unknown type', () => {
        const action = {
            type: 'THIS IS UNKNOWN TYPE',
            payload: 'test'
        };
        const expected = {};

        const newState = reducer(undefined, action);

        expect(newState).toEqual(expected);
    });

    it('handles actions of type GET_TRIPS', () => {
        const initialState = {};
        const action = {
            type: GET_TRIPS,
            payload: 'test'
        };
        const expected = {
            list: 'test'
        };

        const newState = reducer(initialState, action);

        expect(newState).toEqual(expected);
    });

    it('handles actions of type GET_TRIP', () => {
        const initialState = {};
        const action = {
            type: GET_TRIP,
            payload: 'test'
        };
        const expected = {
            trip: 'test'
        };

        const newState = reducer(initialState, action);

        expect(newState).toEqual(expected);
    });

    it('handles actions of type UPDATE_TRIP', () => {
        const initialState = {};
        const action = {
            type: UPDATE_TRIP,
            payload: {
                success: true,
                doc: 'test'
            }
        };
        const expected = {
            updateTrip: true,
            trip: 'test'
        };

        const newState = reducer(initialState, action);

        expect(newState).toEqual(expected);
    });

    it('handles actions of type DELETE_TRIP', () => {
        const initialState = {};
        const action = {
            type: DELETE_TRIP,
            payload: 'test'
        };
        const expected = {
            postDeleted: 'test'
        };

        const newState = reducer(initialState, action);

        expect(newState).toEqual(expected);
    });

    it('handles actions of type CLEAR_TRIP', () => {
        const initialState = {};
        const action = {
            type: CLEAR_TRIP,
            payload: {
                updateTrip: 'updateTrip',
                trip: 'trip',
                postDeleted: 'postDeleted'
            }
        };
        const expected = {
            updateTrip: 'updateTrip',
            trip: 'trip',
            postDeleted: 'postDeleted'
        };

        const newState = reducer(initialState, action);

        expect(newState).toEqual(expected);
    });

    it('handles actions of type GET_TRIP_W_REVIEWER', () => {
        const initialState = {};
        const action = {
            type: GET_TRIP_W_REVIEWER,
            payload: {
                reviewer: 'reviewer',
                trip: 'trip'
            }
        };
        const expected = {
            current: 'trip',
            reviewer: 'reviewer'
        };

        const newState = reducer(initialState, action);

        expect(newState).toEqual(expected);
    });

    it('handles actions of type CLEAR_TRIP_W_REVIEWER', () => {
        const initialState = {};
        const action = {
            type: CLEAR_TRIP_W_REVIEWER,
            payload: {
                reviewer: 'reviewer',
                trip: 'trip'
            }
        };
        const expected = {
            current: 'trip',
            reviewer: 'reviewer'
        };

        const newState = reducer(initialState, action);

        expect(newState).toEqual(expected);
    });

    it('handles actions of type ADD_TRIP', () => {
        const initialState = {};
        const action = {
            type: ADD_TRIP,
            payload: 'test'
        };
        const expected = {
            newtrip: 'test'
        };

        const newState = reducer(initialState, action);

        expect(newState).toEqual(expected);
    });

    it('handles actions of type CLEAR_NEW_TRIP', () => {
        const initialState = {};
        const action = {
            type: CLEAR_NEW_TRIP,
            payload: 'test'
        };
        const expected = {
            newtrip: 'test'
        };

        const newState = reducer(initialState, action);

        expect(newState).toEqual(expected);
    });   
});