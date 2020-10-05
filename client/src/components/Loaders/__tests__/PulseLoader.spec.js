import React from 'react';
import { create } from 'react-test-renderer';

import PulseLoader from '../PulseLoader';

jest.mock('domkit/insertKeyframesRule', () => jest.fn(() => 'animation'));

const mockComponent = props => <PulseLoader {...props} />;

describe('<PulseLoader />', () => {
  it('should render component with default props', () => {
    const props = {};
    const tree = create(mockComponent(props)).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render component with custom props', () => {
    const props = {
      color: 'color',
      size: 'size',
      margin: 'margin',
    };
    const tree = create(mockComponent(props)).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
