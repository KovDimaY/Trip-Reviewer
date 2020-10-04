import React from 'react';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';

import UserAvatar from '..';
import { firebase } from '../../../firebase';

jest.mock('./../../Loaders/PulseLoader', () => 'Loader');
jest.mock('./../../../firebase', () => ({
  firebase: {
    storage: jest.fn(() => ({
      ref: jest.fn(() => ({
        child: jest.fn(() => ({
          getDownloadURL: jest.fn(() => ({
            then: jest.fn(),
          })),
        })),
      })),
    })),
  },
}));

const mockComponent = props => <UserAvatar {...props} />;

describe('<UserAvatar />', () => {
  it('should render component with no filename', () => {
    const props = {
      filename: '',
    };
    const tree = create(mockComponent(props)).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render component with filename', () => {
    const props = {
      filename: 'filename',
    };
    const tree = create(mockComponent(props)).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should change state when handleGetUrlSuccess is called', () => {
    const instance = shallow(mockComponent({})).instance();

    instance.handleGetUrlSuccess('url');

    expect(instance.state.src).toEqual('url');
    expect(instance.state.isLoading).toEqual(false);
  });

  it('should not change state when handleGetUrlSuccess is called for unmounted', () => {
    const instance = shallow(mockComponent({})).instance();

    instance.componentWillUnmount();
    instance.handleGetUrlSuccess('url');

    expect(instance.state.src).not.toEqual('url');
  });

  it('should call updateImage when componentWillReceiveProps is called', () => {
    const updateImage = jest.fn();
    const instance = shallow(mockComponent({})).instance();

    instance.updateImage = updateImage;
    instance.componentWillReceiveProps('test');

    expect(updateImage).toHaveBeenCalledWith('test');
  });

  it('should not call firebase.storage when updateImage is called with the same filename', () => {
    const filename = 'filename';
    const instance = shallow(mockComponent({})).instance();

    instance.oldFilename = filename;
    instance.updateImage({ filename });

    expect(firebase.storage).toHaveBeenCalledTimes(1);
  });

  it('should reset this._isMounted when componentWillUnmount is called', () => {
    const instance = shallow(mockComponent({})).instance();

    instance.componentWillUnmount();

    expect(instance._isMounted).toEqual(false);
  });
});
