import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import {
    getTrips,
    getTripWithReviewer,
    getUserReviews,
    getTrip,
    updateTrip,
    deleteTrip,
    clearTrip,
    clearTripWithReviewer,
    loginUser,
    auth,
    addTrip,
    clearNewTrip,
    getUsers,
    userRegister
} from './../index';
import {
    GET_TRIPS,
    GET_USERS,
    GET_TRIP_W_REVIEWER,
    CLEAR_TRIP_W_REVIEWER,
    USER_REGISTER,
    USER_LOGIN,
    USER_AUTH,
    ADD_TRIP,
    UPDATE_TRIP,
    DELETE_TRIP,
    GET_TRIP,
    CLEAR_NEW_TRIP,
    CLEAR_TRIP,
    GET_USER_REVIEWS
} from './../../constants/action-names';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('getTrips', () => {
    it('has the correct type', () => {
        const action = getTrips();
        const expected = GET_TRIPS;

        expect(action.type).toEqual(expected);
    });

    // it('has the correct payload with the default request', (done) => {
    //     moxios.install();
    //     moxios.stubRequest('/api/getManyTrips?limit=10&skip=0&order=asc', {
    //         status: 200,
    //         response: ['test']
    //     });

    //     const action = getTrips();
    //     const expected = ['test'];

    //     moxios.wait(() => {
    //         expect(action.payload).toEqual(expected);
    //         done();
    //     });
    // });
});

// describe('getTripWithReviewer', () => {
//     it('has the correct typedasd asd asd as das das das das das das das das das das d asd as', () => {
//         moxios.install();

//         moxios.wait(() => {
//             const request = moxios.requests.mostRecent();
//             request.respondWith({
//               status: 200,
//               response: [],
//             });
//         });

//         const expectedActions = [
//             { type: GET_TRIP_W_REVIEWER, posts: ["dfdf"] },
//         ];

//         const store = mockStore({});
        
//         return store.dispatch(getTripWithReviewer()).then(() => {
//             expect(store.getActions()).toEqual(expectedActions);
//         });
//     });
// });

describe('getUserReviews', () => {
    it('has the correct type', () => {
        const userId = 'userId';
        const action = getUserReviews(userId);
        const expected = GET_USER_REVIEWS;

        expect(action.type).toEqual(expected);
    });
});

describe('getTrip', () => {
    it('has the correct type', () => {
        const id = 'id';
        const action = getTrip(id);
        const expected = GET_TRIP;

        expect(action.type).toEqual(expected);
    });
});

describe('updateTrip', () => {
    it('has the correct type', () => {
        const data = 'data';
        const action = updateTrip(data);
        const expected = UPDATE_TRIP;

        expect(action.type).toEqual(expected);
    });
});

describe('deleteTrip', () => {
    it('has the correct type', () => {
        const id = 'id';
        const action = deleteTrip(id);
        const expected = DELETE_TRIP;

        expect(action.type).toEqual(expected);
    });
});

describe('clearTrip', () => {
    it('has the correct type', () => {
        const action = clearTrip();
        const expected = CLEAR_TRIP;

        expect(action.type).toEqual(expected);
    });
});

describe('clearTripWithReviewer', () => {
    it('has the correct type', () => {
        const action = clearTripWithReviewer();
        const expected = CLEAR_TRIP_W_REVIEWER;

        expect(action.type).toEqual(expected);
    });
});

describe('loginUser', () => {
    it('has the correct type', () => {
        const input = {
            email: 'email',
            password: 'password'
        };
        const action = loginUser(input);
        const expected = USER_LOGIN;

        expect(action.type).toEqual(expected);
    });
});

describe('auth', () => {
    it('has the correct type', () => {
        const action = auth();
        const expected = USER_AUTH;

        expect(action.type).toEqual(expected);
    });
});

describe('addTrip', () => {
    it('has the correct type', () => {
        const trip = 'trip';
        const action = addTrip(trip);
        const expected = ADD_TRIP;

        expect(action.type).toEqual(expected);
    });
});

describe('clearNewTrip', () => {
    it('has the correct type', () => {
        const action = clearNewTrip();
        const expected = CLEAR_NEW_TRIP;

        expect(action.type).toEqual(expected);
    });
});

describe('getUsers', () => {
    it('has the correct type', () => {
        const action = getUsers();
        const expected = GET_USERS;

        expect(action.type).toEqual(expected);
    });
});

describe('userRegister', () => {
    it('has the correct typeand payload', () => {
        moxios.install();

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
              status: 200,
              response: { success: true },
            });
        });

        const expectedActions = [
            { type: USER_REGISTER, payload: { success: true } },
        ];

        const store = mockStore({});
        
        return store.dispatch(userRegister()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});