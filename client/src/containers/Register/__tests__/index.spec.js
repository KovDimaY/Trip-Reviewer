import React from 'react';
import { create } from 'react-test-renderer';
 
import Register from './../../Register';
import Root from './../../../hoc/root';

const mockComponent = props => {
    return (
        <Root>
            <Register {...props} />
        </Root>
    );
};
 
describe('<Register />', () => {
    it('should render component', () => {
        const props = {
            user: {}
        };
        const tree = create(mockComponent(props)).toJSON();
        
        expect(tree).toMatchSnapshot();
    });
});