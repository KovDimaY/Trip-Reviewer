import React from 'react';
import { create } from 'react-test-renderer';
import { mount } from 'enzyme';
 
import TripView from './../../TripView';
import Root from './../../../hoc/root';

const mockComponent = props => {
    return (
        <Root>
            <TripView {...props} />
        </Root>
    );
};
 
describe('<TripView />', () => {
    it('should render component without trips', () => {
        const props = {
            trips: {},
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