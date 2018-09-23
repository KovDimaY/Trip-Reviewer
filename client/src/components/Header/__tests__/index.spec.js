import React from 'react';
import { create } from 'react-test-renderer';
import { mount } from 'enzyme';

import Header from '..';

jest.mock('./../../Sidenav/index', () => 'Nav');
jest.mock('react-router-dom', () => ({ Link: 'Link' }));

const mockComponent = props => (
  <Header {...props} />
);

describe('<Header />', () => {
  it('should render component', () => {
    const tree = create(mockComponent()).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should change showNav state to false when handleHideNav is triggered', () => {
    const instance = mount(mockComponent()).instance();

    instance.handleHideNav();

    expect(instance.state.showNav).toEqual(false);
  });

  it('should change showNav state to true when handleOpenNav is triggered', () => {
    const instance = mount(mockComponent()).instance();

    instance.handleOpenNav();

    expect(instance.state.showNav).toEqual(true);
  });
});
