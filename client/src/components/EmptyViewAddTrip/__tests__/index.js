import React from 'react';
import { create } from 'react-test-renderer';

import EmptyViewAddTrip from '..';

const mockComponent = props => (
  <EmptyViewAddTrip {...props} />
);

describe('<EmptyViewAddTrip />', () => {
  it('should render component', () => {
    const tree = create(mockComponent()).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
