import React from 'react';
import { create } from 'react-test-renderer';

import Icon from '../Icon';

const mockComponent = props => <Icon {...props} />;

describe('NavigationItem/<Icon />', () => {
  it('should render component', () => {
    const tree = create(mockComponent()).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
