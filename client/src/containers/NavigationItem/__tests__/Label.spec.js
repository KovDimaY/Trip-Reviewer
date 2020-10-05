import React from 'react';
import { create } from 'react-test-renderer';

import Label from '../Label';

const mockComponent = props => <Label {...props} />;

describe('NavigationItem/<Label />', () => {
  it('should render regular component', () => {
    const tree = create(mockComponent()).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render sidenav component', () => {
    const props = { sidenav: true };
    const tree = create(mockComponent(props)).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
