import React from 'react';
import configureStore from 'redux-mock-store';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';

import EditUserProfile from '..';
import { UPDATE_USER } from '../../../constants/action-names';
import { updateUser } from '../../../actions';
import { USER_PROFILE } from '../../../constants/routes';

jest.mock('react-router-dom', () => ({ Link: 'Link' }));
jest.mock('./../../../components/ImageUploader', () => 'ImageUploader');
jest.mock('./../../../components/UserAvatar', () => 'UserAvatar');
jest.mock('./../../../actions', () => ({
  updateUser: jest.fn(() => ({
    type: UPDATE_USER,
    payload: {},
  })),
}));

const mockStore = configureStore();

const mockComponent = (initialState = {}, props) => {
  const store = mockStore(initialState);

  return <EditUserProfile {...props} store={store} />;
};

describe('<EditUserProfile />', () => {
  it('should render component', () => {
    const initialState = {
      users: {},
    };
    const props = {
      users: {
        login: {
          id: 'id',
        },
      },
    };
    const tree = create(mockComponent(initialState, props)).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render component with error', () => {
    const initialState = {
      users: {
        userUpdate: {
          success: false,
          error: {
            errors: {
              name: { message: 'test' },
              lastname: { message: 'test' },
              email: { message: 'test' },
              oldPassword: { message: 'test' },
              newPassword: { message: 'test' },
              repeatPassword: { message: 'test' },
            },
          },
        },
      },
    };
    const props = {
      users: {
        login: {
          id: 'id',
        },
      },
    };
    const tree = create(mockComponent(initialState, props)).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should redirect when componentWillReceiveProps is called with success true', () => {
    const push = jest.fn();
    const path = USER_PROFILE;
    const initialState = {
      users: {
        userUpdate: {},
      },
    };
    const props = {
      users: {
        login: {
          id: 'id',
        },
      },
    };
    const nextProps = {
      result: {
        success: true,
      },
      history: {
        push,
      },
    };

    const instance = shallow(mockComponent(initialState, props)).dive().instance();

    instance.componentWillReceiveProps(nextProps);

    expect(push).toHaveBeenCalledWith(path);
  });

  it('should not redirect when componentWillReceiveProps is called with success false', () => {
    const push = jest.fn();
    const path = USER_PROFILE;
    const initialState = {
      users: {
        userUpdate: {},
      },
    };
    const props = {
      users: {
        login: {
          id: 'id',
        },
      },
    };
    const nextProps = {
      result: {
        success: false,
        message: 'test',
      },
      history: {
        push,
      },
    };

    const instance = shallow(mockComponent(initialState, props)).dive().instance();

    instance.componentWillReceiveProps(nextProps);

    expect(push).not.toHaveBeenCalledWith(path);
  });

  it('should dispatch updateUser when submitForm is called', () => {
    const preventDefault = jest.fn();
    const initialState = {
      users: {
        userUpdate: {},
      },
    };
    const props = {
      users: {
        login: {
          id: 'id',
        },
      },
    };
    const state = {
      name: 'name',
      lastname: 'lastname',
      email: 'email',
    };
    const event = { preventDefault };

    const instance = shallow(mockComponent(initialState, props)).dive().instance();
    instance.setState({ formData: state });

    instance.submitForm(event);

    expect(preventDefault).toHaveBeenCalled();
    expect(updateUser).toHaveBeenCalledWith(state);
  });

  it('handleInput should change state correctly', () => {
    const initialState = {
      users: {
        userUpdate: {},
      },
    };
    const props = {
      users: {
        login: {
          id: 'id',
        },
      },
    };
    const event = {
      target: {
        value: 'test',
        name: 'title',
      },
    };

    const instance = shallow(mockComponent(initialState, props)).dive().instance();

    instance.handleInput(event);

    expect(instance.state.formData.title).toEqual('test');
  });

  it('handleDeleteAvatar should change state correctly', () => {
    const initialState = {
      users: {
        userUpdate: {},
      },
    };
    const props = {
      users: {
        login: {
          id: 'id',
          avatar: 'avatar',
        },
      },
    };

    const instance = shallow(mockComponent(initialState, props)).dive().instance();

    instance.handleDeleteAvatar();

    expect(instance.state.formData.avatar).toEqual(null);
  });

  it('onUploadSuccess should change state correctly', () => {
    const initialState = {
      users: {
        userUpdate: {},
      },
    };
    const props = {
      users: {
        login: {
          id: 'id',
          avatar: 'avatar',
        },
      },
    };

    const instance = shallow(mockComponent(initialState, props)).dive().instance();

    instance.onUploadSuccess('test');

    expect(instance.state.formData.avatar).toEqual('test');
    expect(instance.state.isUploading).toEqual(false);
    expect(instance.state.progress).toEqual(100);
  });

  it('onUploadStarts should change state correctly', () => {
    const initialState = {
      users: {
        userUpdate: {},
      },
    };
    const props = {
      users: {
        login: {
          id: 'id',
          avatar: 'avatar',
        },
      },
    };

    const instance = shallow(mockComponent(initialState, props)).dive().instance();

    instance.onUploadStarts();

    expect(instance.state.isUploading).toEqual(true);
    expect(instance.state.progress).toEqual(0);
  });

  it('onUploadProgress should change state correctly', () => {
    const initialState = {
      users: {
        userUpdate: {},
      },
    };
    const props = {
      users: {
        login: {
          id: 'id',
          avatar: 'avatar',
        },
      },
    };

    const instance = shallow(mockComponent(initialState, props)).dive().instance();

    instance.onUploadProgress('progress');

    expect(instance.state.progress).toEqual('progress');
  });

  it('onUploadError should change state correctly', () => {
    const initialState = {
      users: {
        userUpdate: {},
      },
    };
    const props = {
      users: {
        login: {
          id: 'id',
          avatar: 'avatar',
        },
      },
    };

    const instance = shallow(mockComponent(initialState, props)).dive().instance();

    instance.onUploadError('error');

    expect(instance.state.uploadError).toEqual('error');
    expect(instance.state.isUploading).toEqual(false);
  });
});
