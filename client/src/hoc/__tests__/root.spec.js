import React from 'react';
import { create } from 'react-test-renderer';

import Root from '../root';

const mockComponent = props => <Root {...props} />;

describe('<Root />', () => {
  it('should render component', () => {
    const props = {
      children: <div>test</div>,
    };
    const tree = create(mockComponent(props)).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
