import React from 'react';
import { create } from 'react-test-renderer';
 
import EditTrip from './../../EditTrip';
import Root from './../../../hoc/root';

const mockComponent = props => {
    return (
        <Root>
            <EditTrip {...props} />
        </Root>
    );
};
 
describe('<EditTrip />', () => {
    it('should render component', () => {
        const props = {
            match: {
                params: {
                    id: 'id'
                }
            }
        };
        const tree = create(mockComponent(props)).toJSON();
        
        expect(tree).toMatchSnapshot();
    });
});