import React from 'react';
import configureStore from 'redux-mock-store';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';
 
import AddTrip from './../../AddTrip';
import { addTrip, clearNewTrip } from './../../../actions';

jest.mock('./../../../components/StarsRating', () => 'StarsRating');
jest.mock('./../../../actions', () => ({ 
    addTrip: jest.fn(() => ({
        type: 'test'
    })),
    clearNewTrip: jest.fn(() => ({
        type: 'test'
    }))
}));

const mockStore = configureStore();

const mockComponent = (initialState = {}, props) => {
    const store = mockStore(initialState);

    return (
        <AddTrip {...props} store={store} />
    );
};
 
describe('<AddTrip />', () => {
    it('should render component', () => {
        const initialState = {
            trips: {}
        };
        const tree = create(mockComponent(initialState)).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render component with newTrip and post', () => {
        const initialState = {
            trips: {
                newtrip: {
                    post: true,
                    tripId: 'test'
                }
            }
        };
        const tree = create(mockComponent(initialState)).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render component with newTrip but no post', () => {
        const initialState = {
            trips: {
                newtrip: {}
            }
        };
        const tree = create(mockComponent(initialState)).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('componentWillReceiveProps should redirect when newtrip exists', () => {
        const push = jest.fn();
        const tripId = 'test';
        const path = `/trips/${tripId}`;
        const initialState = {
            trips: {}
        };
        const props = {
            users: {
                login: {
                    id: 'id'
                }
            }
        };
        const newProps = {
            trips: {
                newtrip: {
                    tripId
                }
            },
            history: {
                push
            }
        }

        const instance = shallow(mockComponent(initialState, props)).dive().instance();

        instance.componentWillReceiveProps(newProps);

        expect(push).toHaveBeenCalledWith(path);
    });

    it('componentWillReceiveProps should not redirect when newtrip does not exists', () => {
        const push = jest.fn();
        const initialState = {
            trips: {}
        };
        const props = {
            users: {
                login: {
                    id: 'id'
                }
            }
        };
        const newProps = {
            trips: {
                newtrip: null
            },
            history: {
                push
            }
        }

        const instance = shallow(mockComponent(initialState, props)).dive().instance();

        instance.componentWillReceiveProps(newProps);

        expect(push).not.toHaveBeenCalled();
    });

    it('handleInput should change state correctly', () => {
        const initialState = {
            trips: {}
        };
        const event = {
            target: {
                value: 'test',
                name: 'title'
            }
        };

        const instance = shallow(mockComponent(initialState)).dive().instance();

        instance.handleInput(event);

        expect(instance.state.formdata.title).toEqual('test');
    });

    it('handleRating should change state correctly', () => {
        const initialState = {
            trips: {}
        };
        const rating = 3;

        const instance = shallow(mockComponent(initialState)).dive().instance();

        instance.handleRating(rating);

        expect(instance.state.formdata.rating).toEqual(rating);
    });

    it('should dispatch addTrip when submitForm is called', () => {
        const preventDefault = jest.fn();
        const props = {
            users: {
                login: {
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
        expect(addTrip).toHaveBeenCalledWith(state);
    });

    it('should dispatch clearNewTrip when componentWillUnmount is called', () => {
        const initialState = {
            trips: {}
        };

        const instance = shallow(mockComponent(initialState)).dive().instance();

        instance.componentWillUnmount();

        expect(clearNewTrip).toHaveBeenCalled();
    });
});