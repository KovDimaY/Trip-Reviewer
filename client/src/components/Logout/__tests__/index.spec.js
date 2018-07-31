import React from 'react';
import { create } from 'react-test-renderer';
import { mount } from 'enzyme';
import moxios from 'moxios';
 
import Logout from './../../Logout';

const mockComponent = props => {
    return (
        <Logout {...props} />
    );
};

describe('<Logout />', () => {
    it('should render component', () => {
        const tree = create(mockComponent()).toJSON();
        
        expect(tree).toMatchSnapshot();
    });

    it('should redirect to home after some time', (done) => {
        moxios.install();
        moxios.stubRequest('/api/logout', {
            status: 200,
            response: {}
        });

        const props = {
            history: {
                push: jest.fn()
            }
        };
        const instance = mount(mockComponent(props));

        setTimeout(() => {
            expect(props.history.push).toHaveBeenCalledWith('/');
            moxios.uninstall();
            done();
        }, 3000);
    });
});