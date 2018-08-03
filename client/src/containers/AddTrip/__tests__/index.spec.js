import React from 'react';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';
 
import AddTrip from './../../AddTrip';
import Root from './../../../hoc/root';

const mockComponent = props => {
    return (
        <AddTrip {...props} />
    );
};
 
describe('<AddTrip />', () => {
    it('should render component', () => {
        const tree = create(mockComponent()).toJSON();
        
        expect(tree).toMatchSnapshot();
    });

    it('handleInput should change state correctly', () => {
        const instance = shallow(mockComponent()).instance();
    
        instance.handleInput();
    
        expect(instance.state.showNav).toEqual(false);
    });
});