import React from 'react';
import configureStore from 'redux-mock-store';
import { create } from 'react-test-renderer';

import SidenavItem from '..';

jest.mock('react-router-dom', () => ({ Link: 'Link' }));

const mockStore = configureStore();

const mockComponent = (initialState = {}, props) => {
  const store = mockStore(initialState);

  return (
    <SidenavItem {...props} store={store} />
  );
};

describe('<SidenavItem />', () => {
  it('should render component with no login', () => {
    const initialState = {
      users: {},
    };
    const props = {
      item: {
        type: 'type',
        link: 'link',
        icon: 'icon',
        text: 'text',
      },
    };
    const tree = create(mockComponent(initialState, props)).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render component when no authenticated', () => {
    const initialState = {
      users: {
        login: {
          isAuth: false,
        },
      },
    };
    const props = {
      item: {
        type: 'type',
        link: 'link',
        icon: 'icon',
        text: 'text',
      },
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
      item: {
        type: 'type',
        link: 'link',
        icon: 'icon',
        text: 'text',
        restricted: true,
      },
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
      item: {
        type: 'type',
        link: 'link',
        icon: 'icon',
        text: 'text',
      },
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
      item: {
        type: 'type',
        link: 'link',
        icon: 'icon',
        text: 'text',
        exclude: true,
      },
    };
    const tree = create(mockComponent(initialState, props)).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
