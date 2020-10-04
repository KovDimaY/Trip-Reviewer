import {
  GET_TRIPS,
  GET_TRIP,
  GET_TRIP_ERROR,
  GET_TRIP_W_REVIEWER,
  GET_TRIP_W_REVIEWER_ERROR,
  CLEAR_TRIP_W_REVIEWER,
  ADD_TRIP,
  UPDATE_TRIP,
  DELETE_TRIP,
  CLEAR_TRIP,
  CLEAR_NEW_TRIP,
} from '../../constants/action-names';
import reducer from '../trips';

describe('trips reducer', () => {
  it('handles actions of unknown type', () => {
    const action = {
      type: 'THIS IS UNKNOWN TYPE',
      payload: 'test',
    };
    const expected = {};

    const newState = reducer(undefined, action);

    expect(newState).toEqual(expected);
  });

  it('handles actions of type GET_TRIPS', () => {
    const initialState = {};
    const action = {
      type: GET_TRIPS,
      payload: {
        list: 'test',
        newTripsCount: 'newTripsCount',
      },
    };
    const expected = {
      list: 'test',
      newTripsCount: 'newTripsCount',
    };

    const newState = reducer(initialState, action);

    expect(newState).toEqual(expected);
  });

  it('handles actions of type GET_TRIP', () => {
    const initialState = {};
    const action = {
      type: GET_TRIP,
      payload: 'test',
    };
    const expected = {
      trip: 'test',
    };

    const newState = reducer(initialState, action);

    expect(newState).toEqual(expected);
  });

  it('handles actions of type GET_TRIP_ERROR', () => {
    const initialState = {};
    const action = {
      type: GET_TRIP_ERROR,
      payload: 'test',
    };
    const expected = {
      trip: { error: 'test' },
    };

    const newState = reducer(initialState, action);

    expect(newState).toEqual(expected);
  });

  it('handles actions of type UPDATE_TRIP', () => {
    const initialState = {};
    const payload = {
      success: true,
      doc: 'test',
    };
    const action = {
      type: UPDATE_TRIP,
      payload,
    };
    const expected = {
      updatedTrip: payload,
    };

    const newState = reducer(initialState, action);

    expect(newState).toEqual(expected);
  });

  it('handles actions of type DELETE_TRIP', () => {
    const initialState = {};
    const action = {
      type: DELETE_TRIP,
      payload: 'test',
    };
    const expected = {
      postDeleted: 'test',
    };

    const newState = reducer(initialState, action);

    expect(newState).toEqual(expected);
  });

  it('handles actions of type CLEAR_TRIP', () => {
    const initialState = {};
    const payload = {
      updatedTrip: 'updateTrip',
      trip: 'trip',
      postDeleted: 'postDeleted',
    };
    const action = {
      type: CLEAR_TRIP,
      payload,
    };

    const newState = reducer(initialState, action);

    expect(newState).toEqual(payload);
  });

  it('handles actions of type GET_TRIP_W_REVIEWER', () => {
    const initialState = {};
    const action = {
      type: GET_TRIP_W_REVIEWER,
      payload: {
        reviewer: 'reviewer',
        trip: 'trip',
      },
    };
    const expected = {
      current: 'trip',
      reviewer: 'reviewer',
      error: null,
    };

    const newState = reducer(initialState, action);

    expect(newState).toEqual(expected);
  });

  it('handles actions of type GET_TRIP_W_REVIEWER_ERROR', () => {
    const initialState = {};
    const action = {
      type: GET_TRIP_W_REVIEWER_ERROR,
      payload: 'test',
    };
    const expected = {
      current: null,
      error: 'test',
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
        trip: 'trip',
      },
    };
    const expected = {
      current: 'trip',
      reviewer: 'reviewer',
      error: null,
    };

    const newState = reducer(initialState, action);

    expect(newState).toEqual(expected);
  });

  it('handles actions of type ADD_TRIP', () => {
    const initialState = {};
    const action = {
      type: ADD_TRIP,
      payload: 'test',
    };
    const expected = {
      newtrip: 'test',
    };

    const newState = reducer(initialState, action);

    expect(newState).toEqual(expected);
  });

  it('handles actions of type CLEAR_NEW_TRIP', () => {
    const initialState = {};
    const action = {
      type: CLEAR_NEW_TRIP,
      payload: 'test',
    };
    const expected = {
      newtrip: 'test',
    };

    const newState = reducer(initialState, action);

    expect(newState).toEqual(expected);
  });
});
