import React from 'react';
import { create } from 'react-test-renderer';

import User from '..';

jest.mock('react-router-dom', () => ({ Link: 'Link' }));
jest.mock('../../UserAvatar', () => 'UserAvatar');

const mockComponent = props => <User {...props} />;

describe('<User />', () => {
  it('should render component', () => {
    const props = {
      users: {
        login: {
          name: 'name',
          lastname: 'lastname',
          email: 'email',
        },
      },
    };
    const tree = create(mockComponent(props)).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
