import React from 'react';
import configureStore from 'redux-mock-store';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';

import Login from '..';
import { loginUser } from '../../../actions';
import { USER_PROFILE } from '../../../constants/routes';

const mockStore = configureStore();

jest.mock('./../../../actions', () => ({
  loginUser: jest.fn(() => ({
    type: 'loginUser',
  })),
}));

const mockComponent = (initialState = {}, props) => {
  const store = mockStore(initialState);

  return <Login {...props} store={store} />;
};

describe('<Login />', () => {
  it('should render component', () => {
    const initialState = {
      users: {
        login: {},
      },
    };
    const tree = create(mockComponent(initialState)).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render component with error message for email', () => {
    const initialState = {
      users: {
        login: {
          error: {
            message: 'test email',
            field: 'email',
          },
        },
      },
    };
    const tree = create(mockComponent(initialState)).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render component with error message for password', () => {
    const initialState = {
      users: {
        login: {
          error: {
            message: 'test password',
            field: 'password',
          },
        },
      },
    };
    const tree = create(mockComponent(initialState)).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should change state when handleInput is called', () => {
    const initialState = {
      users: {
        login: {},
      },
    };
    const event = {
      target: {
        value: 'test',
        name: 'email',
      },
    };

    const instance = shallow(mockComponent(initialState)).dive().instance();

    instance.handleInput(event);

    expect(instance.state.formData.email).toEqual('test');
    expect(instance.state.hideError.email).toEqual(true);
  });

  it('should dispatch loginUser when submitForm is called', () => {
    const preventDefault = jest.fn();
    const state = {
      formData: {
        email: 'test',
        password: 'test',
      },
    };
    const initialState = {
      users: {
        login: {},
      },
    };
    const event = { preventDefault };

    const instance = shallow(mockComponent(initialState)).dive().instance();
    instance.setState(state);

    instance.submitForm(event);

    expect(preventDefault).toHaveBeenCalled();
    expect(loginUser).toHaveBeenCalledWith(state.formData);
  });

  it('should redirect when componentWillReceiveProps is called and authenticated', () => {
    const push = jest.fn();
    const initialState = {
      users: {
        login: {},
      },
    };
    const props = {
      history: {
        push,
      },
    };
    const nextProps = {
      users: {
        login: {
          isAuth: true,
        },
      },
    };

    const instance = shallow(mockComponent(initialState, props)).dive().instance();

    instance.componentWillReceiveProps(nextProps);

    expect(push).toHaveBeenCalledWith(USER_PROFILE);
  });

  it('should not redirect when componentWillReceiveProps is called and not authenticated', () => {
    const push = jest.fn();
    const initialState = {
      users: {
        login: {},
      },
    };
    const props = {
      history: {
        push,
      },
    };
    const nextProps = {
      users: {
        login: {},
      },
    };

    const instance = shallow(mockComponent(initialState, props)).dive().instance();

    instance.componentWillReceiveProps(nextProps);

    expect(push).not.toHaveBeenCalledWith(USER_PROFILE);
  });
});
