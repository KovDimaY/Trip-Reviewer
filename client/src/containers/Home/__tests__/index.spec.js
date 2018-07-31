import React from 'react';
import { create } from 'react-test-renderer';
 
import HomeContainer from './../../Home';
import Root from './../../../hoc/root';

const mockComponent = props => {
    return (
        <Root>
            <HomeContainer {...props} />
        </Root>
    );
};
 
describe('<HomeContainer />', () => {
    it('should render component', () => {
        const props = {
            trips: {}
        };
        const tree = create(mockComponent(props)).toJSON();
        
        expect(tree).toMatchSnapshot();
    });
});