import React from 'react';
import { create } from 'react-test-renderer';

import Sidenav from '..';

jest.mock('react-simple-sidenav', () => 'ReactSideNav');
jest.mock('./../../../containers/NavigationItem', () => 'NavigationItem');

const mockComponent = props => <Sidenav {...props} />;

describe('<Sidenav />', () => {
  it('should render component', () => {
    const props = {
      onHideNav: () => {},
    };
    const tree = create(mockComponent(props)).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
