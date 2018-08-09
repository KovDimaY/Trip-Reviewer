import React from 'react';
import configureStore from 'redux-mock-store';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';
 
import HomeContainer from './../../Home';
import { GET_TRIPS } from './../../../constants/action-names';
import { getTrips } from './../../../actions';

jest.mock('./../../../components/TripItem', () => 'TripItem');
jest.mock('./../../../actions', () => ({ 
    getTrips: jest.fn(() => ({
        type: GET_TRIPS,
        payload: []
    }))
}));

const mockStore = configureStore();

const mockComponent = (initialState = {}, props) => {
    const store = mockStore(initialState);

    return (
        <HomeContainer {...props} store={store} />
    );
};
 
describe('<HomeContainer />', () => {
    it('should render component', () => {
        const initialState = {
            trips: {}
        };
        const tree = create(mockComponent(initialState)).toJSON();
        
        expect(tree).toMatchSnapshot();
    });

    it('should render component with a list of items', () => {
        const initialState = {
            trips: {
                list: [
                    {
                        _id: '_id',
                        title: 'title',
                        author: 'author',
                        price: 'price',
                        duration: 'duration',
                        rating: 'rating'
                    }
                ]
            }
        };
        const tree = create(mockComponent(initialState)).toJSON();
        
        expect(tree).toMatchSnapshot();
    });

    it('should dispatch getTrips when loadmore is called', () => {
        const list = [];
        const newItemsToLoad = 3;
        const startingFrom = list.length;
        const order = 'desc';
        const initialState = {
            trips: {
                list
            }
        };

        const instance = shallow(mockComponent(initialState)).dive().instance();
    
        instance.loadmore();

        expect(getTrips).toHaveBeenCalledWith(newItemsToLoad, startingFrom, order, list);
    });
});