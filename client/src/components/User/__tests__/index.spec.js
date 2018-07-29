import React from 'react';
import { create } from 'react-test-renderer';
 
import User from './../../User';

const mockComponent = props => {
    return (
        <User {...props} />
    );
};
 
describe('<User />', () => {
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