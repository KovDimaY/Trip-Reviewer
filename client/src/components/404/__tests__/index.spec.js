import React from 'react';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';

import NotFound from '..';

const mockComponent = props => <NotFound {...props} />;

describe('<NotFound />', () => {
  it('should render component', () => {
    const tree = create(mockComponent()).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should redirect to home after a click on the button', () => {
    const push = jest.fn();
    const props = { history: { push } };
    const node = shallow(mockComponent(props));

    node.find('.button').simulate('click');

    expect(push).toHaveBeenCalledWith('/');
  });
});
