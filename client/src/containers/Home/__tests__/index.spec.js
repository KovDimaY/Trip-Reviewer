import React from 'react';
import configureStore from 'redux-mock-store';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';

import EmptyView from '../../../components/Common/EmptyViewAddTrip';
import HomeContainer from '..';
import { GET_TRIPS } from '../../../constants/action-names';
import { getTrips } from '../../../actions';

jest.mock('./../../../components/TripItem', () => 'TripItem');
jest.mock('./../../../components/Common/EmptyViewAddTrip', () => 'EmptyView');
jest.mock('./../../../actions', () => ({
  getTrips: jest.fn(() => ({
    type: GET_TRIPS,
    payload: [],
  })),
}));

const mockStore = configureStore();

const mockComponent = (initialState = {}, props) => {
  const store = mockStore(initialState);

  return <HomeContainer {...props} store={store} />;
};

describe('<HomeContainer />', () => {
  it('should render component', () => {
    const initialState = {
      trips: {},
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
            rating: 'rating',
          },
        ],
      },
    };
    const tree = create(mockComponent(initialState)).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renderItems should return empty view if the list.lenght is small and initialRender - false', () => {
    const initialState = {
      trips: {},
    };
    const instance = shallow(mockComponent(initialState)).dive().instance();
    instance.state.initialRender = false;

    const result = instance.renderItems();

    expect(result).toEqual(
      <div className="empty-view-wrapper">
        <EmptyView />
      </div>
    );
  });

  it('renderLoadMoreButton should not return null if the showLoadmore is true and initialRender - false', () => {
    const initialState = {
      trips: {},
    };
    const instance = shallow(mockComponent(initialState)).dive().instance();
    instance.state.initialRender = false;

    const result = instance.renderLoadMoreButton();

    expect(result).not.toEqual(null);
  });

  it('renderLoadMoreButton should return null if the showLoadmore is false', () => {
    const initialState = {
      trips: {},
    };
    const instance = shallow(mockComponent(initialState)).dive().instance();
    instance.state.showLoadmore = false;

    const result = instance.renderLoadMoreButton();

    expect(result).toEqual(null);
  });

  it('should dispatch getTrips when loadmore is called', () => {
    const list = [];
    const newItemsToLoad = 3;
    const startingFrom = list.length;
    const order = 'desc';
    const initialState = {
      trips: {
        list,
      },
    };

    const instance = shallow(mockComponent(initialState)).dive().instance();

    instance.loadmore();

    expect(getTrips).toHaveBeenCalledWith(newItemsToLoad, startingFrom, order, list);
  });

  it('should update state if componentWillReceiveProps is called with small newTripsCount', () => {
    const setState = jest.fn();
    const nextProps = {
      trips: { newTripsCount: 1 },
    };
    const initialState = {
      trips: {
        list: [],
      },
    };

    const instance = shallow(mockComponent(initialState)).dive().instance();
    instance.setState = setState;

    instance.componentWillReceiveProps(nextProps);

    expect(setState).toHaveBeenCalledWith({ showLoadmore: false });
  });

  it('should update state if componentWillReceiveProps is called with big newTripsCount', () => {
    const setState = jest.fn();
    const nextProps = {
      trips: { newTripsCount: 5 },
    };
    const initialState = {
      trips: {
        list: [],
      },
    };

    const instance = shallow(mockComponent(initialState)).dive().instance();
    instance.setState = setState;
    instance.state.initialRender = false;

    instance.componentWillReceiveProps(nextProps);

    expect(setState).not.toHaveBeenCalled();
  });
});
