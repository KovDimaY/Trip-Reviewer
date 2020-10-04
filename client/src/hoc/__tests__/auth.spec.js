import React from 'react';
import configureStore from 'redux-mock-store';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';

import withAuth from '../auth';
import * as routes from '../../constants/routes';

const mockStore = configureStore();

jest.mock('./../../actions', () => ({
  auth: jest.fn(() => ({
    type: 'auth',
  })),
}));

const mockComponent = (Component, reload = false, initialState = {}, props) => {
  const store = mockStore(initialState);
  const Auth = withAuth(Component, reload);

  return <Auth {...props} store={store} />;
};

describe('<Auth />', () => {
  it('should render component', () => {
    const Component = <div>test</div>;
    const tree = create(mockComponent(Component, false)).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should change state correctly when componentWillReceiveProps is called', () => {
    const Component = <div>test</div>;
    const initialState = {
      users: {},
    };
    const newProps = {
      users: {
        login: {
          isAuth: false,
        },
      },
    };

    const instance = shallow(mockComponent(Component, false, initialState)).dive().instance();

    instance.componentWillReceiveProps(newProps);

    expect(instance.state.loading).toEqual(false);
  });

  it('should not redirect when componentWillReceiveProps is called with no auth and no reload', () => {
    const push = jest.fn();
    const Component = <div>test</div>;
    const initialState = {
      users: {},
    };
    const props = {
      history: {
        push,
      },
    };
    const newProps = {
      users: {
        login: {
          isAuth: false,
        },
      },
    };

    const instance = shallow(mockComponent(Component, false, initialState, props))
      .dive()
      .instance();

    instance.componentWillReceiveProps(newProps);

    expect(push).not.toHaveBeenCalledWith(routes.LOGIN);
  });

  it('should redirect when componentWillReceiveProps is called with auth and no reload', () => {
    const push = jest.fn();
    const Component = <div>test</div>;
    const initialState = {
      users: {},
    };
    const props = {
      history: {
        push,
      },
    };
    const newProps = {
      users: {
        login: {
          isAuth: true,
        },
      },
    };

    const instance = shallow(mockComponent(Component, false, initialState, props))
      .dive()
      .instance();

    instance.componentWillReceiveProps(newProps);

    expect(push).toHaveBeenCalledWith(routes.USER_PROFILE);
  });

  it('should redirect when componentWillReceiveProps is called with no auth and reload', () => {
    const push = jest.fn();
    const Component = <div>test</div>;
    const initialState = {
      users: {},
    };
    const props = {
      history: {
        push,
      },
    };
    const newProps = {
      users: {
        login: {
          isAuth: false,
        },
      },
    };

    const instance = shallow(mockComponent(Component, true, initialState, props)).dive().instance();

    instance.componentWillReceiveProps(newProps);

    expect(push).toHaveBeenCalledWith(routes.LOGIN);
  });

  it('should not redirect when componentWillReceiveProps is called with auth and reload', () => {
    const push = jest.fn();
    const Component = <div>test</div>;
    const initialState = {
      users: {},
    };
    const props = {
      history: {
        push,
      },
    };
    const newProps = {
      users: {
        login: {
          isAuth: true,
        },
      },
    };

    const instance = shallow(mockComponent(Component, true, initialState, props)).dive().instance();

    instance.componentWillReceiveProps(newProps);

    expect(push).not.toHaveBeenCalledWith(routes.USER_PROFILE);
  });
});
