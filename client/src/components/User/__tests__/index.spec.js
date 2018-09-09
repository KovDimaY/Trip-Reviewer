import React from 'react';
import { create } from 'react-test-renderer';
 
import User from './../../User';

jest.mock('react-router-dom', () => ({ Link: 'Link' }));

const mockComponent = props => {
    return (
        <User {...props} />
    );
};
 
describe('<User />', () => {
    it('should render component', () => {
        const props = {
            users: {
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