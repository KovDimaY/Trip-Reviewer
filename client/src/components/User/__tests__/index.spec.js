import React from 'react';
import { create } from 'react-test-renderer';

import User from '..';

jest.mock('react-router-dom', () => ({ Link: 'Link' }));
jest.mock('../../UserAvatar', () => 'UserAvatar');

const mockComponent = props => (
  <User {...props} />
);

describe('<User />', () => {
  it('should render component without nationality', () => {
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

  it('should render component with nationality', () => {
    const props = {
      users: {
        login: {
          name: 'name',
          lastname: 'lastname',
          email: 'email',
          nationality: 'nationality',
        },
      },
    };
    const tree = create(mockComponent(props)).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
