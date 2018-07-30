import React from 'react';
import { create } from 'react-test-renderer';
 
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
});