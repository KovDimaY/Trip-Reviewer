import React from 'react';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';
 
import UserAvatar from './../../UserAvatar';

jest.mock('./../../Loaders/PulseLoader', () => ('Loader'));
jest.mock('./../../../firebase', () => ({
    firebase: {
        storage: jest.fn(() => ({
            ref: jest.fn(() => ({
                child: jest.fn(() => ({
                    getDownloadURL: jest.fn(() => ({
                        then: jest.fn()
                    }))
                }))
            }))
        }))
    }
}));


const mockComponent = (props) => {
    return (
        <UserAvatar {...props} />
    );
};
 
describe('<UserAvatar />', () => {
    it('should render component with no filename', () => {
        const props = {
            filename: ''
        };
        const tree = create(mockComponent(props)).toJSON();
        
        expect(tree).toMatchSnapshot();
    });

    it('should render component with filename', () => {
        const props = {
            filename: 'filename'
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

    it('should call updateImage when componentWillReceiveProps is called', () => {
        const updateImage = jest.fn();
        const instance = shallow(mockComponent({})).instance();
        
        instance.updateImage = updateImage;
        instance.componentWillReceiveProps('test');
    
        expect(updateImage).toHaveBeenCalledWith('test');
    });
});