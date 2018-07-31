import React from 'react';
import { create } from 'react-test-renderer';
 
import AddTrip from './../../AddTrip';
import Root from './../../../hoc/root';

const mockComponent = props => {
    return (
        <Root>
            <AddTrip {...props} />
        </Root>
    );
};
 
describe('<AddTrip />', () => {
    it('should render component', () => {
        const tree = create(mockComponent()).toJSON();
        
        expect(tree).toMatchSnapshot();
    });
});