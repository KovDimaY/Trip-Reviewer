import React from 'react';
import configureStore from 'redux-mock-store';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';

import ResetPass from '..';
import { resetPassword } from '../../../actions';

const mockStore = configureStore();

jest.mock('./../../../actions', () => ({
  resetPassword: jest.fn(() => ({
    type: 'resetPassword',
  })),
}));

const mockComponent = (initialState = {}, props) => {
  const store = mockStore(initialState);

  return <ResetPass {...props} store={store} />;
};

describe('<ResetPass />', () => {
  it('should render component', () => {
    const initialState = {
      users: {},
    };
    const tree = create(mockComponent(initialState)).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render component with error message', () => {
    const initialState = {
      users: {
        reset: {
          message: 'test',
        },
      },
    };
    const tree = create(mockComponent(initialState)).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should change state when handleInputEmail is called', () => {
    const initialState = {
      users: {},
    };
    const event = {
      target: {
        value: 'test',
      },
    };

    const instance = shallow(mockComponent(initialState)).dive().instance();

    instance.handleInputEmail(event);

    expect(instance.state.email).toEqual('test');
  });

  it('should dispatch resetPassword when submitForm is called', () => {
    const preventDefault = jest.fn();
    const state = {
      email: 'test',
    };
    const initialState = {
      users: {},
    };
    const event = { preventDefault };

    const instance = shallow(mockComponent(initialState)).dive().instance();
    instance.setState(state);

    instance.submitForm(event);

    expect(preventDefault).toHaveBeenCalled();
    expect(resetPassword).toHaveBeenCalledWith(state);
  });
});
