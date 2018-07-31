import React from 'react';
import { create } from 'react-test-renderer';
 
import Login from './../../Login';
import Root from './../../../hoc/root';

const mockComponent = props => {
    return (
        <Root>
            <Login {...props} />
        </Root>
    );
};
 
describe('<Login />', () => {
    it('should render component', () => {
        const props = {
            user: {}
        };
        const tree = create(mockComponent(props)).toJSON();
        
        expect(tree).toMatchSnapshot();
    });
});