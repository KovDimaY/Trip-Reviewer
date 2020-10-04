import React from 'react';
import { create } from 'react-test-renderer';

import TripItem from '..';

jest.mock('react-router-dom', () => ({ Link: 'Link ' }));
jest.mock('../../Common/DetailsLabel', () => 'DetailsLabel');

const mockComponent = props => <TripItem {...props} />;

describe('<TripItem />', () => {
  it('should render component with duration 1', () => {
    const props = {
      _id: '_id',
      country: 'country',
      expences: 'expences',
      duration: 1,
      rating: 'rating',
    };
    const tree = create(mockComponent(props)).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render component with duration 10', () => {
    const props = {
      _id: '_id',
      country: 'country',
      expences: 'expences',
      duration: 10,
      rating: 'rating',
    };
    const tree = create(mockComponent(props)).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
