import React from 'react';
import configureStore from 'redux-mock-store';
import { create } from 'react-test-renderer';

import UserPosts from '..';

jest.mock('react-router-dom', () => ({ Link: 'Link' }));
jest.mock('./../../../actions', () => ({
  getUserReviews: jest.fn(() => ({
    type: 'getTripWithReviewer',
  })),
}));

const mockStore = configureStore();

const mockComponent = (initialState = {}, props) => {
  const store = mockStore(initialState);

  return (
    <UserPosts {...props} store={store} />
  );
};

describe('<UserPosts />', () => {
  it('should render component with login', () => {
    const initialState = {
      users: {
        login: {
          id: 'id',
        },
        userPosts: [{
          _id: 'id',
          title: 'title',
          author: 'author',
          createAt: 'createAt',
        }],
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
