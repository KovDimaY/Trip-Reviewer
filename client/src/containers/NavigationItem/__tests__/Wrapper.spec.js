import React from 'react';
import { create } from 'react-test-renderer';

import Wrapper from '../Wrapper';

jest.mock('react-router-dom', () => ({ Link: 'Link' }));

const mockComponent = props => <Wrapper {...props} />;

describe('NavigationItem/<Wrapper />', () => {
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
