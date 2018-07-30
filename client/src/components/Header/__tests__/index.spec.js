import React from 'react';
import { create } from 'react-test-renderer';
 
import Header from './../../Header';

jest.mock('./../../Sidenav/index', () => 'Nav');
jest.mock('react-router-dom', () => ({ Link: 'Link' }));

const mockComponent = props => {
    return (
        <Header {...props} />
    );
};
 
describe('<Header />', () => {
    it('should render component', () => {
        const tree = create(mockComponent()).toJSON();
        
        expect(tree).toMatchSnapshot();
    });
});