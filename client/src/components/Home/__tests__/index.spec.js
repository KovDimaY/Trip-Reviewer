import React from 'react';
import { create } from 'react-test-renderer';
 
import Home from './../../Home';

jest.mock('./../../../containers/Home/index', () => 'HomeContainer');

const mockComponent = props => {
    return (
        <Home {...props} />
    );
};
 
describe('<Home />', () => {
    it('should render component', () => {
        const props = {
            user: {
                login: {
                    name: 'name',
                    lastname: 'lastname',
                    email: 'email'
                }
            }
        };
        const tree = create(mockComponent(props)).toJSON();
        
        expect(tree).toMatchSnapshot();
    });
});