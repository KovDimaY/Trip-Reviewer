import React from 'react';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';

import ImageUploader from '..';
import { firebase } from '../../../firebase';

jest.mock('react-firebase-file-uploader/lib/CustomUploadButton', () => 'CustomUploadButton');
jest.mock('./../../../firebase', () => ({
  firebase: {
    auth: jest.fn(() => ({
      signInAnonymously: jest.fn(() => ({
        catch: jest.fn(),
      })),
      signOut: jest.fn(),
    })),
    storage: jest.fn(() => ({
      ref: jest.fn(),
    })),
  },
}));

const mockComponent = props => <ImageUploader {...props}>Test</ImageUploader>;

describe('<ImageUploader />', () => {
  it('should render component', () => {
    const tree = create(mockComponent({})).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should change state when handleUploadStart is called', () => {
    const onUploadStarts = jest.fn();
    const props = { onUploadStarts };
    const instance = shallow(mockComponent(props)).instance();

    instance.handleUploadStart();

    expect(onUploadStarts).toHaveBeenCalled();
  });

  it('should change state when handleUploadError is called', () => {
    const onUploadError = jest.fn();
    const props = { onUploadError };
    const instance = shallow(mockComponent(props)).instance();

    instance.handleUploadError();

    expect(onUploadError).toHaveBeenCalled();
  });

  it('should change state when handleProgress is called', () => {
    const onUploadProgress = jest.fn();
    const props = { onUploadProgress };
    const instance = shallow(mockComponent(props)).instance();

    instance.handleProgress(20);

    expect(onUploadProgress).toHaveBeenCalledWith(20);
  });

  it('should change state when handleAuthError is called', () => {
    const instance = shallow(mockComponent({})).instance();

    instance.handleAuthError('error');
    // TODO: there is nothing except the console.log there at the moment...
  });

  it('should change state when handleUploadSuccess and call onUploadSuccess is called', () => {
    const onUploadSuccess = jest.fn();
    const props = { onUploadSuccess };
    const instance = shallow(mockComponent(props)).instance();

    instance.handleUploadSuccess('filename');

    expect(onUploadSuccess).toHaveBeenCalledWith('filename');
  });

  it('should call firebase.signOut() when componentWillUnmount is called', () => {
    const instance = shallow(mockComponent()).instance();

    instance.componentWillUnmount();

    expect(firebase.auth).toHaveBeenCalled();
  });
});
