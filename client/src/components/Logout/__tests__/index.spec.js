import React from 'react';
import { create } from 'react-test-renderer';
import { mount } from 'enzyme';

import Logout from '..';

const mockComponent = props => <Logout {...props} />;

describe('<Logout />', () => {
  jest.useFakeTimers();

  it('should render component', () => {
    const tree = create(mockComponent()).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should redirect to home after some time', () => {
    const props = {
      history: {
        push: jest.fn(),
      },
    };
    const instance = mount(mockComponent(props)).instance();

    instance.redirectToHome();

    expect(props.history.push).toHaveBeenCalledWith('/');
  });

  it('should handle request correctly', () => {
    const instance = mount(mockComponent({})).instance();

    instance.handleResponce();

    expect(setTimeout).toHaveBeenCalledWith(instance.redirectToHome, 2000);
  });
});
