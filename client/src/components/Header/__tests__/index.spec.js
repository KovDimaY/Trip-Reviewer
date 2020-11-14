import React from 'react';
import { create } from 'react-test-renderer';
import { mount } from 'enzyme';

import Header from '..';

jest.mock('../../Sidenav', () => 'SideNav');
jest.mock('../../../containers/NavigationItem', () => 'NavigationItem');
jest.mock('react-router-dom', () => ({ Link: 'Link' }));

const mockComponent = props => <Header {...props} />;

describe('<Header />', () => {
  it('should render component', () => {
    const tree = create(mockComponent()).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should remove listener and change showNav state to false when handleHideNav is triggered', () => {
    const removeEventListener = jest.fn();
    const instance = mount(mockComponent()).instance();

    window.removeEventListener = removeEventListener;
    instance.handleHideNav();

    expect(instance.state.showNav).toEqual(false);
    expect(removeEventListener).toHaveBeenCalled();
  });

  it('should add listener and change showNav state to true when handleOpenNav is triggered', () => {
    const addEventListener = jest.fn();
    const instance = mount(mockComponent()).instance();

    window.addEventListener = addEventListener;
    instance.handleOpenNav();

    expect(instance.state.showNav).toEqual(true);
    expect(addEventListener).toHaveBeenCalled();
  });
});
