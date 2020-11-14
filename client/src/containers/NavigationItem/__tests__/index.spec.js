import React from 'react';
import configureStore from 'redux-mock-store';
import { create } from 'react-test-renderer';

import NavigationItem from '..';
import { home, userReviews, signup } from '../../../constants/navigation-items';

jest.mock('../Wrapper', () => 'Wrapper');
jest.mock('../Label', () => 'Label');
jest.mock('../Icon', () => 'Icon');

const mockStore = configureStore();

const mockComponent = (initialState = {}, props) => {
  const store = mockStore(initialState);

  return <NavigationItem {...props} store={store} />;
};

describe('<NavigationItem />', () => {
  it('should render component when no authenticated', () => {
    const initialState = {
      users: {
        login: {
          isAuth: false,
        },
      },
    };
    const props = {
      item: home,
    };
    const tree = create(mockComponent(initialState, props)).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render component when no authenticated and restricted', () => {
    const initialState = {
      users: {
        login: {
          isAuth: false,
        },
      },
    };
    const props = {
      item: userReviews,
    };
    const tree = create(mockComponent(initialState, props)).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render component with authentication', () => {
    const initialState = {
      users: {
        login: {
          isAuth: true,
        },
      },
    };
    const props = {
      item: home,
    };
    const tree = create(mockComponent(initialState, props)).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render component with authentication and excluded', () => {
    const initialState = {
      users: {
        login: {
          isAuth: true,
        },
      },
    };
    const props = {
      item: signup,
    };
    const tree = create(mockComponent(initialState, props)).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render component with authentication and sidenav', () => {
    const initialState = {
      users: {
        login: {
          isAuth: true,
        },
      },
    };
    const props = {
      item: home,
      sidenav: true,
    };
    const tree = create(mockComponent(initialState, props)).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
