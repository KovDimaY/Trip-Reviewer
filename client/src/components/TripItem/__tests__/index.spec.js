import React from 'react';
import { create } from 'react-test-renderer';

import TripItem from '..';

jest.mock('react-router-dom', () => ({ Link: 'Link ' }));

const mockComponent = props => (
  <TripItem {...props} />
);

describe('<TripItem />', () => {
  it('should render component', () => {
    const props = {
      _id: '_id',
      author: 'author',
      price: 'price',
      duration: 'duration',
      rating: 'rating',
    };
    const tree = create(mockComponent(props)).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
