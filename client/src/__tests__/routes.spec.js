import React from 'react';
import { create } from 'react-test-renderer';

import Routes from '../routes';

jest.mock('./../hoc/layout', () => 'Layout');
jest.mock('react-router-dom', () => ({
  Switch: 'Switch',
  Route: 'Route',
}));

const mockComponent = props => <Routes {...props} />;

describe('<Routes />', () => {
  it('should render component', () => {
    const tree = create(mockComponent()).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
