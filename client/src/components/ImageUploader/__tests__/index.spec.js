import React from 'react';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';
 
import ImageUploader from './../../ImageUploader';
import { firebase } from './../../../firebase';

jest.mock('react-firebase-file-uploader/lib/CustomUploadButton', () => ('CustomUploadButton'));
jest.mock('./../../../firebase', () => ({
    firebase: {
        auth: jest.fn(() => ({
            signInAnonymously: jest.fn(() => ({
                catch: jest.fn(),
            })),
            signOut: jest.fn()
        })),
        storage: jest.fn(() => ({
            ref: jest.fn()
        }))
    }
}));

const mockComponent = (props) => {
    return (
        <ImageUploader {...props} />
    );
};
 
describe('<ImageUploader />', () => {
    it('should render component', () => {
        const tree = create(mockComponent({})).toJSON();
        
        expect(tree).toMatchSnapshot();
    });

    it('should change state when handleUploadStart is called', () => {
        const instance = shallow(mockComponent({})).instance();
    
        instance.handleUploadStart();
    
        expect(instance.state.isUploading).toEqual(true);
        expect(instance.state.progress).toEqual(0);
    });

    it('should change state when handleUploadError is called', () => {
        const instance = shallow(mockComponent({})).instance();
    
        instance.handleUploadError('error');
    
        expect(instance.state.isUploading).toEqual(false);
    });

    it('should change state when handleProgress is called', () => {
        const instance = shallow(mockComponent({})).instance();
    
        instance.handleProgress('progress');
    
        expect(instance.state.progress).toEqual('progress');
    });

    it('should change state when handleAuthError is called', () => {
        const instance = shallow(mockComponent({})).instance();
    
        instance.handleAuthError('error');
    
        expect(instance.state.error).toEqual('error');
    });

    it('should change state when handleUploadSuccess and call onUploadSuccess is called', () => {
        const onUploadSuccess = jest.fn();
        const props = { onUploadSuccess };
        const instance = shallow(mockComponent(props)).instance();
    
        instance.handleUploadSuccess('filename');
    
        expect(instance.state.isUploading).toEqual(false);
        expect(instance.state.progress).toEqual(100);
        expect(onUploadSuccess).toHaveBeenCalledWith('filename');
    });

    it('should call firebase.signOut() when componentWillUnmount is called', () => {
        const instance = shallow(mockComponent()).instance();
    
        instance.componentWillUnmount();

        expect(firebase.auth).toHaveBeenCalled();
    });
});