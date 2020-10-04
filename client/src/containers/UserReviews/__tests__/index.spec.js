import React from 'react';
import configureStore from 'redux-mock-store';
import { create } from 'react-test-renderer';

import UserPosts from '..';

jest.mock('react-router-dom', () => ({ Link: 'Link' }));
jest.mock('./../../../components/Common/EmptyViewAddTrip', () => 'EmptyView');
jest.mock('./../../../actions', () => ({
  getUserReviews: jest.fn(() => ({
    type: 'getTripWithReviewer',
  })),
}));

const mockStore = configureStore();

const mockComponent = (initialState = {}, props) => {
  const store = mockStore(initialState);

  return <UserPosts {...props} store={store} />;
};

describe('<UserPosts />', () => {
  it('should render component with login and no posts', () => {
    const initialState = {
      users: {
        login: {
          id: 'id',
        },
        userPosts: [],
      },
    };
    const tree = create(mockComponent(initialState)).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render component with login and several posts', () => {
    const initialState = {
      users: {
        login: {
          id: 'id',
        },
        userPosts: [
          {
            _id: 'id1',
            title: 'title1',
            country: 'country1',
            createdAt: 'createdAt1',
          },
          {
            _id: 'id2',
            title: 'title2',
            country: 'country2',
            createdAt: 'createdAt2',
          },
        ],
      },
    };
    const tree = create(mockComponent(initialState)).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render component with no login', () => {
    const initialState = {
      users: {},
    };
    const tree = create(mockComponent(initialState)).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
