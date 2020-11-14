import React from 'react';
import { create } from 'react-test-renderer';

import Footer from '..';

const mockComponent = props => <Footer {...props} />;

describe('<Footer />', () => {
  it('should render component', () => {
    const tree = create(mockComponent()).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
