import React from 'react';
import configureStore from 'redux-mock-store';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';
 
import AddTrip from './../../AddTrip';

const mockStore = configureStore();

const mockComponent = (initialState = {}, props) => {
    const store = mockStore(initialState);

    return (
        <AddTrip {...props} store={store} />
    );
};
 
describe('<AddTrip />', () => {
    it('should render component', () => {
        const initialState = {
            trips: {}
        };
        const tree = create(mockComponent(initialState)).toJSON();
        
        expect(tree).toMatchSnapshot();
    });

    it('handleInput should change state correctly', () => {
        const initialState = {
            trips: {}
        };
        const event = {
            target: {
                value: 'test',
                name: 'title'
            }
        };

        const instance = shallow(mockComponent(initialState)).dive().instance();
    
        instance.handleInput(event);
    
        expect(instance.state.formdata.title).toEqual('test');
    });
});