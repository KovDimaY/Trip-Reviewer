import React from 'react';
import { create } from 'react-test-renderer';

import EmptyViewAddTrip from '..';

const mockComponent = props => <EmptyViewAddTrip {...props} />;

describe('<EmptyViewAddTrip />', () => {
  it('should render component with default props', () => {
    const tree = create(mockComponent()).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render component with custom props', () => {
    const props = {
      message: 'message',
      buttonText: 'buttonText',
    };
    const tree = create(mockComponent(props)).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
