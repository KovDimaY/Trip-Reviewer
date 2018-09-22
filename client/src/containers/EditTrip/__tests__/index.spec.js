import React from 'react';
import configureStore from 'redux-mock-store';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';
 
import EditTrip from './../../EditTrip';
import { GET_TRIP } from './../../../constants/action-names';
import { updateTrip, clearTrip, deleteTrip } from './../../../actions';
import * as routes from './../../../constants/routes';

jest.mock('react-router-dom', () => ({ Link: 'Link' }));
jest.mock('./../../../components/StarsRating', () => 'StarsRating');
jest.mock('./../../../actions', () => ({ 
    getTrip: jest.fn(() => ({
        type: GET_TRIP,
        payload: {}
    })),
    updateTrip: jest.fn(() => ({
        type: 'updateTrip'
    })),
    clearTrip: jest.fn(() => ({
        type: 'clearTrip'
    })),
    deleteTrip: jest.fn(() => ({
        type: 'deleteTrip'
    }))
}));

const mockStore = configureStore();

const mockComponent = (initialState = {}, props) => {
    const store = mockStore(initialState);

    return (
        <EditTrip {...props} store={store} />
    );
};
 
describe('<EditTrip />', () => {
    it('should render component', () => {
        const initialState = {
            trips: {}
        };
        const props = {
            match: {
                params: {
                    id: 'id'
                }
            }
        };
        const tree = create(mockComponent(initialState, props)).toJSON();
        
        expect(tree).toMatchSnapshot();
    });

    it('should render component with updateTrip', () => {
        const initialState = {
            trips: {
                updateTrip: true,
                trip: {
                    _id: '_id'
                }
            }
        };
        const props = {
            match: {
                params: {
                    id: 'id'
                }
            }
        };
        const tree = create(mockComponent(initialState, props)).toJSON();
        
        expect(tree).toMatchSnapshot();
    });

    it('should render component with postDeleted', () => {
        const initialState = {
            trips: {
                postDeleted: true
            }
        };
        const props = {
            match: {
                params: {
                    id: 'id'
                }
            }
        };
        const tree = create(mockComponent(initialState, props)).toJSON();
        
        expect(tree).toMatchSnapshot();
    });

    it('should change state when componentWillReceiveProps is called', () => {
        const initialState = {
            trips: {}
        };
        const props = {
            match: {
                params: {
                    id: 'id'
                }
            }
        };
        const nextProps = {
            trips: {
                trip: {
                    _id: 'trip._id',
                    title: 'trip.title',
                    author: 'trip.author',
                    review: 'trip.review',
                    duration: 'trip.duration',
                    rating: 'trip.rating',
                    price: 'trip.price'
                }
            }
        };
        
        const instance = shallow(mockComponent(initialState, props)).dive().instance();
    
        instance.componentWillReceiveProps(nextProps);
   
        expect(instance.state.formdata).toEqual(nextProps.trips.trip);
    });

    it('should redirect when componentWillReceiveProps is called with updateTrip', () => {
        const push = jest.fn();
        const tripId = 'test';
        const path = `${routes.TRIPS}/${tripId}`;
        const initialState = {
            trips: {}
        };
        const props = {
            match: {
                params: {
                    id: 'id'
                }
            }
        };
        const nextProps = {
            trips: {
                trip: {
                    _id: tripId
                },
                updateTrip: true
            },
            history: {
                push
            }
        };

        const instance = shallow(mockComponent(initialState, props)).dive().instance();

        instance.componentWillReceiveProps(nextProps);

        expect(push).toHaveBeenCalledWith(path);
    });

    it('should dispatch clearTrip when componentWillUnmount is called', () => {
        const initialState = {
            trips: {}
        };
        const props = {
            match: {
                params: {
                    id: 'id'
                }
            }
        };

        const instance = shallow(mockComponent(initialState, props)).dive().instance();
    
        instance.componentWillUnmount();

        expect(clearTrip).toHaveBeenCalled();
    });

    it('should dispatch updateTrip when submitForm is called', () => {
        const preventDefault = jest.fn();
        const props = {
            match: {
                params: {
                    id: 'id'
                }
            }
        };
        const state = {
            author: "author",
            duration: "duration",
            ownerId: "id",
            price: "price",
            rating: "rating",
            review: "review",
            title: "title"
        };
        const initialState = {
            trips: {}
        };
        const event = { preventDefault };

        const instance = shallow(mockComponent(initialState, props)).dive().instance();
        instance.setState({ formdata: state });

        instance.submitForm(event);

        expect(preventDefault).toHaveBeenCalled();    
        expect(updateTrip).toHaveBeenCalledWith(state);
    });

    it('should dispatch deleteTrip when deletePost is called', () => {
        const initialState = {
            trips: {}
        };
        const props = {
            match: {
                params: {
                    id: 'id'
                }
            }
        };

        const instance = shallow(mockComponent(initialState, props)).dive().instance();

        instance.deletePost();

        expect(deleteTrip).toHaveBeenCalledWith('id');
    });

    it('handleInput should change state correctly', () => {
        const initialState = {
            trips: {}
        };
        const props = {
            match: {
                params: {
                    id: 'id'
                }
            }
        };
        const event = {
            target: {
                value: 'test',
                name: 'title'
            }
        };

        const instance = shallow(mockComponent(initialState, props)).dive().instance();
    
        instance.handleInput(event);
    
        expect(instance.state.formdata.title).toEqual('test');
    });

    it('handleRating should change state correctly', () => {
        const initialState = {
            trips: {}
        };
        const props = {
            match: {
                params: {
                    id: 'id'
                }
            }
        };
        const rating = 3;

        const instance = shallow(mockComponent(initialState, props)).dive().instance();

        instance.handleRating(rating);

        expect(instance.state.formdata.rating).toEqual(rating);
    });

    it('goToReviews should redirect correctly', () => {
        const push = jest.fn();
        const path = routes.USER_REVIEWS;
        const initialState = {
            trips: {}
        };
        const props = {
            match: {
                params: {
                    id: 'id'
                }
            },
            history: {
                push
            }
        };

        const instance = shallow(mockComponent(initialState, props)).dive().instance();

        instance.goToReviews();

        expect(push).toHaveBeenCalledWith(path);
    });


});