import React from 'react';
import configureStore from 'redux-mock-store';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';

import Register from '..';
import { userRegister } from '../../../actions';
import { HOME } from '../../../constants/routes';

jest.mock('../../../components/UserAvatar', () => 'UserAvatar');
jest.mock('./../../../actions', () => ({
  getUsers: jest.fn(() => ({
    type: 'getUsers',
  })),
  userRegister: jest.fn(() => ({
    type: 'userRegister',
  })),
}));

const mockStore = configureStore();

const mockComponent = (initialState = {}, props) => {
  const store = mockStore(initialState);

  return <Register {...props} store={store} />;
};

describe('<Register />', () => {
  it('should render component', () => {
    const initialState = {
      users: {},
    };
    const tree = create(mockComponent(initialState)).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render component with users', () => {
    const initialState = {
      users: {
        users: [
          {
            _id: '_id',
            name: 'name',
            lastname: 'lastname',
          },
        ],
      },
    };
    const tree = create(mockComponent(initialState)).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render component with errors', () => {
    const initialState = {
      users: {
        register: {
          error: {
            errors: {
              name: { message: 'Test name' },
              lastname: { message: 'Test lastname' },
              email: { message: 'Test email' },
              password: { message: 'Test password' },
            },
          },
        },
      },
    };
    const tree = create(mockComponent(initialState)).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should change state when handleInput is called', () => {
    const initialState = {
      users: {},
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

  it('should dispatch userRegister when submitForm is called', () => {
    const preventDefault = jest.fn();
    const state = {
      formData: {
        name: 'name',
        lastname: 'lastname',
        email: 'email',
        password: 'password',
      },
    };
    const initialState = {
      users: {},
    };
    const event = { preventDefault };

    const instance = shallow(mockComponent(initialState)).dive().instance();
    instance.setState({ ...state });

    instance.submitForm(event);

    expect(preventDefault).toHaveBeenCalled();
    expect(userRegister).toHaveBeenCalledWith(state.formData);
  });

  it('should redirect when componentWillReceiveProps is called and authenticated', () => {
    const push = jest.fn();
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
    const initialState = {
      users: {},
    };

    const instance = shallow(mockComponent(initialState, props)).dive().instance();

    instance.componentWillReceiveProps(nextProps);

    expect(push).toHaveBeenCalledWith(HOME);
  });

  it('should not redirect and should set state when componentWillReceiveProps is called and not authenticated', () => {
    const push = jest.fn();
    const state = {
      hideError: {
        name: true,
        lastname: true,
        email: true,
        password: true,
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
          isAuth: false,
        },
      },
    };
    const initialState = {
      users: {},
    };

    const instance = shallow(mockComponent(initialState, props)).dive().instance();
    instance.setState({ ...state });

    instance.componentWillReceiveProps(nextProps);

    expect(push).not.toHaveBeenCalledWith(HOME);
    expect(instance.state.hideError.name).toEqual(false);
    expect(instance.state.hideError.lastname).toEqual(false);
    expect(instance.state.hideError.email).toEqual(false);
    expect(instance.state.hideError.password).toEqual(false);
  });
});
